import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getMe, type UserRow } from '@/lib/api';

/**
 * Shared-credential auth (client-side only, no backend).
 * Anyone with the password + a display name gets in. Progress data is
 * per-browser in localStorage; this is a UX gate, not real security.
 *
 * To change the password: edit SHARED_PASSWORD below and redeploy.
 *
 * In parallel, an OAuth-aware path exists: when the Porhi API issues a
 * JWT it is stored under K_TOKEN and used by lib/api.ts. Either path
 * marks the session as authenticated.
 */
export const SHARED_PASSWORD = 'admin';

const K_AUTH = 'learning:auth';
const K_NAME = 'learning:display-name';
const K_SINCE = 'learning:logged-in-at';
const K_TOKEN = 'porhi:token';

export interface AuthState {
  isAuthenticated: boolean;
  displayName: string | null;
  loggedInAt: string | null;
  apiUser: UserRow | null;
  login: (password: string, name: string) => { ok: true } | { ok: false; reason: string };
  logout: () => void;
  setOAuthSession: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

function read<K extends string>(key: K): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function getApiToken(): string | null {
  try {
    return localStorage.getItem(K_TOKEN);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthed] = useState<boolean>(() => read(K_AUTH) === 'true');
  const [displayName, setDisplayName] = useState<string | null>(() => read(K_NAME));
  const [loggedInAt, setLoggedInAt] = useState<string | null>(() => read(K_SINCE));
  const [apiUser, setApiUser] = useState<UserRow | null>(null);

  // Keep tabs in sync when storage changes elsewhere.
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === K_AUTH) setAuthed(e.newValue === 'true');
      if (e.key === K_NAME) setDisplayName(e.newValue);
      if (e.key === K_SINCE) setLoggedInAt(e.newValue);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Hydrate apiUser from existing token on mount; drop token silently on 401.
  useEffect(() => {
    let cancelled = false;
    const token = getApiToken();
    if (!token) return;
    getMe()
      .then((user) => {
        if (cancelled) return;
        setApiUser(user);
      })
      .catch(() => {
        // authedFetch already cleared the token on 401; mirror state.
        if (cancelled) return;
        setApiUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback<AuthState['login']>((password, name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return { ok: false, reason: 'Name is required' };
    if (password !== SHARED_PASSWORD) return { ok: false, reason: 'Invalid password' };

    const now = new Date().toISOString();
    try {
      localStorage.setItem(K_AUTH, 'true');
      localStorage.setItem(K_NAME, trimmedName);
      localStorage.setItem(K_SINCE, now);
    } catch {
      return { ok: false, reason: 'Unable to save session (storage disabled?)' };
    }
    setAuthed(true);
    setDisplayName(trimmedName);
    setLoggedInAt(now);
    return { ok: true };
  }, []);

  const setOAuthSession = useCallback<AuthState['setOAuthSession']>(async (token) => {
    try {
      localStorage.setItem(K_TOKEN, token);
    } catch {
      throw new Error('Unable to save session (storage disabled?)');
    }

    // Validate token by fetching the user. If this throws, surface it
    // so the callback page can route to /login?error=oauth_invalid.
    const user = await getMe();
    const now = new Date().toISOString();

    try {
      localStorage.setItem(K_AUTH, 'true');
      localStorage.setItem(K_NAME, user.name);
      localStorage.setItem(K_SINCE, now);
    } catch {
      /* best effort — token is the canonical session */
    }

    setApiUser(user);
    setAuthed(true);
    setDisplayName(user.name);
    setLoggedInAt(now);
  }, []);

  const logout = useCallback<AuthState['logout']>(() => {
    try {
      localStorage.removeItem(K_AUTH);
      localStorage.removeItem(K_NAME);
      localStorage.removeItem(K_SINCE);
      localStorage.removeItem(K_TOKEN);
    } catch {
      /* noop */
    }
    setAuthed(false);
    setDisplayName(null);
    setLoggedInAt(null);
    setApiUser(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated,
      displayName,
      loggedInAt,
      apiUser,
      login,
      logout,
      setOAuthSession,
    }),
    [isAuthenticated, displayName, loggedInAt, apiUser, login, logout, setOAuthSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Redirect to /login?next=<current path> if not authenticated. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return <>{children}</>;
}

/** Pick a deterministic warm accent for an avatar based on the name. */
export function avatarColor(name: string | null | undefined): string {
  if (!name) return 'hsl(var(--amber))';
  const palette = [
    'hsl(var(--amber))',
    'hsl(var(--clay))',
    'hsl(var(--ink-blue))',
    'hsl(var(--sage))',
    'hsl(var(--amber-700))',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return palette[hash % palette.length];
}

export function initials(name: string | null | undefined): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
