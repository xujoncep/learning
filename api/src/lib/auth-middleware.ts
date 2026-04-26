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
  c.set('userId', payload.sub);
  await next();
  return;
};
