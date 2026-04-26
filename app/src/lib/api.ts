import { API_BASE_URL } from '@/lib/config';

const TOKEN_KEY = 'porhi:token';

export interface UserRow {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
  last_seen: string;
}

export interface ProgressItem {
  slug: string;
  percent: number;
  last_section: string | null;
  updated_at: string;
}

export class ApiError extends Error {
  code?: 'unauthorized';
  status: number;
  constructor(message: string, status: number, code?: 'unauthorized') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function clearSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* noop */
  }
}

export async function authedFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers = new Headers(init?.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });

  if (res.status === 401) {
    clearSession();
    throw new ApiError('Unauthorized', 401, 'unauthorized');
  }

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      /* body wasn't JSON */
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export function apiGoogleSignInUrl(): string {
  return `${API_BASE_URL}/auth/google`;
}

export async function getMe(): Promise<UserRow> {
  const data = await authedFetch<{ user: UserRow }>('/me');
  return data.user;
}

export async function listBookmarks(): Promise<string[]> {
  const data = await authedFetch<{ slugs: string[] }>('/me/bookmarks');
  return data.slugs;
}

export async function addBookmark(slug: string): Promise<void> {
  await authedFetch<{ ok: true }>('/me/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ slug }),
  });
}

export async function removeBookmark(slug: string): Promise<void> {
  await authedFetch<{ ok: true }>(`/me/bookmarks/${encodeURIComponent(slug)}`, {
    method: 'DELETE',
  });
}

export async function listProgress(): Promise<ProgressItem[]> {
  const data = await authedFetch<{ items: ProgressItem[] }>('/me/progress');
  return data.items;
}

export async function upsertProgress(
  slug: string,
  data: { percent: number; last_section?: string }
): Promise<void> {
  await authedFetch<{ ok: true }>(`/me/progress/${encodeURIComponent(slug)}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function recordAudit(action: string, target?: string): Promise<void> {
  await authedFetch<{ ok: true }>('/audit', {
    method: 'POST',
    body: JSON.stringify({ action, target }),
  });
}
