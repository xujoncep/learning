import type { Env } from '../env';

export function buildGoogleAuthUrl(env: Env, state: string): string {
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'online',
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function exchangeCodeForTokens(
  env: Env,
  code: string,
): Promise<{ idToken: string } | null> {
  const body = new URLSearchParams({
    code,
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    redirect_uri: env.GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  });
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { id_token?: string };
  if (!json.id_token) return null;
  return { idToken: json.id_token };
}

// V1: trust the TLS channel to oauth2.googleapis.com; do not verify Google's signature.
// Production hardening would fetch JWKS and verify the signature.
export function decodeIdToken(
  idToken: string,
): { sub: string; email: string; name: string; picture?: string } | null {
  const parts = idToken.split('.');
  if (parts.length !== 3) return null;
  try {
    const payloadJson = atob(parts[1]!.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson) as {
      sub?: string;
      email?: string;
      name?: string;
      picture?: string;
    };
    if (!payload.sub || !payload.email || !payload.name) return null;
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  } catch {
    return null;
  }
}
