import { Hono } from 'hono';
import type { Env } from '../env';
import { authRequired } from '../lib/auth-middleware';
import { recordAudit } from '../lib/db';

type Variables = { userId: number };

export const auditRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

auditRoutes.use('*', authRequired);

auditRoutes.post('/', async (c) => {
  const userId = c.get('userId');
  const body = (await c.req.json().catch(() => null)) as
    | { action?: unknown; target?: unknown }
    | null;
  if (!body) return c.json({ error: 'invalid body' }, 400);

  const rawAction = body.action;
  if (typeof rawAction !== 'string') {
    return c.json({ error: 'invalid action' }, 400);
  }
  const action = rawAction.trim();
  if (action.length === 0 || action.length >= 50) {
    return c.json({ error: 'invalid action' }, 400);
  }

  let target: string | null = null;
  if (body.target !== undefined && body.target !== null) {
    if (typeof body.target !== 'string' || body.target.length >= 200) {
      return c.json({ error: 'invalid target' }, 400);
    }
    target = body.target;
  }

  await recordAudit(c.env.DB, userId, action, target);
  return c.json({ ok: true });
});
