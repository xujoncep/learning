import type { MiddlewareHandler } from 'hono';
import type { Env } from '../env';
import { verifyJwt } from './jwt';

export const authRequired: MiddlewareHandler<{
  Bindings: Env;
  Variables: { userId: number };
}> = async (c, next) => {
  const header = c.req.header('Authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return c.json({ error: 'unauthorized' }, 401);
  const payload = await verifyJwt(token, c.env.JWT_SECRET);
  if (!payload) return c.json({ error: 'unauthorized' }, 401);

  // Block banned users before letting any handler run. This keeps every
  // protected endpoint (including /me/*, /audit, /admin/*) consistently gated.
  const row = await c.env.DB.prepare(
    'SELECT banned_at FROM users WHERE id = ?1',
  )
    .bind(payload.sub)
    .first<{ banned_at: string | null }>();
  if (!row) return c.json({ error: 'unauthorized' }, 401);
  if (row.banned_at) return c.json({ error: 'banned' }, 403);

  c.set('userId', payload.sub);
  await next();
  return;
};
