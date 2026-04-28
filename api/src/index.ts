import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './env';
import { authRoutes } from './routes/auth';
import { meRoutes } from './routes/me';
import { auditRoutes } from './routes/audit';

type Variables = { userId: number };

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return undefined;
      if (
        /^https?:\/\/(localhost(:\d+)?|.*\.pages\.dev|learning-hub-3gw\.pages\.dev)$/.test(
          origin,
        )
      ) {
        return origin;
      }
      return undefined;
    },
    credentials: false,
    allowHeaders: ['Authorization', 'Content-Type'],
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  }),
);

app.get('/', (c) => c.json({ ok: true, service: 'porhi-api' }));

app.route('/auth', authRoutes);
app.route('/me', meRoutes);
app.route('/audit', auditRoutes);

app.notFound((c) => c.json({ error: 'not found' }, 404));
app.onError((err, c) => {
  console.error('unhandled error', err);
  return c.json({ error: 'internal error' }, 500);
});

export default app;
