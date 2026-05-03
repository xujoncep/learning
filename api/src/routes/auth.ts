import { Hono } from 'hono';
import type { Env } from '../env';
import { buildGoogleAuthUrl, decodeIdToken, exchangeCodeForTokens } from '../lib/google';
import { signJwt } from '../lib/jwt';
import { recordAudit, upsertGoogleUser } from '../lib/db';

type Variables = { userId: number };

export const authRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

function randomStateHex(): string {
  const bytes = new Uint8Array(16); // 16 bytes -> 32 hex chars
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i]!.toString(16).padStart(2, '0');
  }
  return out;
}

// GET /auth/google — kick off OAuth.
authRoutes.get('/google', (c) => {
  const state = randomStateHex();
  // V1: state is not persisted server-side. It's a CSRF-light measure;
  // production would store state in KV with a TTL and validate on callback.
  return c.redirect(buildGoogleAuthUrl(c.env, state));
});

// GET /auth/google/callback — handle redirect from Google.
authRoutes.get('/google/callback', async (c) => {
  const code = c.req.query('code');
  if (!code) return c.json({ error: 'missing code' }, 400);

  try {
    const tokens = await exchangeCodeForTokens(c.env, code);
    if (!tokens) {
      return c.redirect(`${c.env.FRONTEND_URL}/login?error=oauth_exchange_failed`);
    }

    const decoded = decodeIdToken(tokens.idToken);
    if (!decoded) {
      return c.redirect(`${c.env.FRONTEND_URL}/login?error=oauth_decode_failed`);
    }

    const user = await upsertGoogleUser(c.env.DB, decoded);
    await recordAudit(c.env.DB, user.id, 'auth.login', user.email);

    const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
    const token = await signJwt({ sub: user.id, exp }, c.env.JWT_SECRET);

    return c.redirect(
      `${c.env.FRONTEND_URL}/auth/callback?token=${encodeURIComponent(token)}`,
    );
  } catch (err) {
    console.error('oauth callback failed', err);
    return c.redirect(`${c.env.FRONTEND_URL}/login?error=oauth_unexpected`);
  }
});

// POST /auth/logout — stateless. Client just drops the token.
authRoutes.post('/logout', (c) => c.json({ ok: true }));
