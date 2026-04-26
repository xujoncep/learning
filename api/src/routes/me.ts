import { Hono } from 'hono';
import type { Env } from '../env';
import { authRequired } from '../lib/auth-middleware';
import {
  addBookmark,
  getUserById,
  listBookmarks,
  listProgress,
  removeBookmark,
  upsertProgress,
} from '../lib/db';

type Variables = { userId: number };

export const meRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

meRoutes.use('*', authRequired);

function isValidSlug(s: unknown): s is string {
  if (typeof s !== 'string') return false;
  const trimmed = s.trim();
  if (trimmed.length === 0 || trimmed.length >= 200) return false;
  if (/\s/.test(trimmed)) return false;
  return true;
}

meRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const user = await getUserById(c.env.DB, userId);
  if (!user) return c.json({ error: 'not found' }, 404);
  return c.json({ user });
});

meRoutes.get('/bookmarks', async (c) => {
  const userId = c.get('userId');
  const slugs = await listBookmarks(c.env.DB, userId);
  return c.json({ slugs });
});

meRoutes.post('/bookmarks', async (c) => {
  const userId = c.get('userId');
  const body = (await c.req.json().catch(() => null)) as { slug?: unknown } | null;
  const raw = body?.slug;
  if (!isValidSlug(raw)) return c.json({ error: 'invalid slug' }, 400);
  const slug = (raw as string).trim();
  await addBookmark(c.env.DB, userId, slug);
  return c.json({ ok: true });
});

meRoutes.delete('/bookmarks/:slug', async (c) => {
  const userId = c.get('userId');
  const slugParam = c.req.param('slug');
  if (!isValidSlug(slugParam)) return c.json({ error: 'invalid slug' }, 400);
  const slug = slugParam.trim();
  await removeBookmark(c.env.DB, userId, slug);
  return c.json({ ok: true });
});

meRoutes.get('/progress', async (c) => {
  const userId = c.get('userId');
  const items = await listProgress(c.env.DB, userId);
  return c.json({ items });
});

meRoutes.post('/progress/:slug', async (c) => {
  const userId = c.get('userId');
  const slugParam = c.req.param('slug');
  if (!isValidSlug(slugParam)) return c.json({ error: 'invalid slug' }, 400);
  const slug = slugParam.trim();

  const body = (await c.req.json().catch(() => null)) as
    | { percent?: unknown; last_section?: unknown }
    | null;
  if (!body) return c.json({ error: 'invalid body' }, 400);

  const percent = body.percent;
  if (
    typeof percent !== 'number' ||
    !Number.isInteger(percent) ||
    percent < 0 ||
    percent > 100
  ) {
    return c.json({ error: 'percent must be integer 0..100' }, 400);
  }

  let lastSection: string | undefined;
  if (body.last_section !== undefined && body.last_section !== null) {
    if (typeof body.last_section !== 'string' || body.last_section.length >= 200) {
      return c.json({ error: 'invalid last_section' }, 400);
    }
    lastSection = body.last_section;
  }

  await upsertProgress(c.env.DB, userId, slug, {
    percent,
    ...(lastSection !== undefined ? { last_section: lastSection } : {}),
  });
  return c.json({ ok: true });
});
