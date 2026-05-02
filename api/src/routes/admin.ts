import { Hono } from 'hono';
import type { MiddlewareHandler } from 'hono';
import type { Env } from '../env';
import { verifyJwt } from '../lib/jwt';
import type { UserRow } from '../schema';

type Variables = { userId: number };

export const adminRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

function parseAdminEmails(raw: string | undefined): Set<string> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0),
  );
}

const adminRequired: MiddlewareHandler<{
  Bindings: Env;
  Variables: Variables;
}> = async (c, next) => {
  const header = c.req.header('Authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return c.json({ error: 'unauthorized' }, 401);

  const payload = await verifyJwt(token, c.env.JWT_SECRET);
  if (!payload) return c.json({ error: 'unauthorized' }, 401);

  const row = await c.env.DB.prepare('SELECT email FROM users WHERE id = ?1')
    .bind(payload.sub)
    .first<{ email: string }>();
  if (!row) return c.json({ error: 'unauthorized' }, 401);

  const admins = parseAdminEmails(c.env.ADMIN_EMAILS);
  if (!admins.has(row.email.toLowerCase())) {
    return c.json({ error: 'forbidden' }, 403);
  }

  c.set('userId', payload.sub);
  await next();
  return;
};

adminRoutes.use('*', adminRequired);

interface CountRow {
  n: number;
}

interface TopDocRow {
  doc_slug: string;
  doc_title: string;
  visit_count: number;
}

adminRoutes.get('/stats', async (c) => {
  const db = c.env.DB;

  const [
    totalUsers,
    activeToday,
    active7d,
    active30d,
    newUsers7d,
    totalEvents,
    totalBookmarks,
    topDocsRes,
  ] = await Promise.all([
    db.prepare('SELECT count(*) AS n FROM users').first<CountRow>(),
    db
      .prepare(
        "SELECT count(DISTINCT user_id) AS n FROM reading_events WHERE date(created_at) = date('now')",
      )
      .first<CountRow>(),
    db
      .prepare(
        "SELECT count(DISTINCT user_id) AS n FROM reading_events WHERE created_at >= datetime('now', '-7 days')",
      )
      .first<CountRow>(),
    db
      .prepare(
        "SELECT count(DISTINCT user_id) AS n FROM reading_events WHERE created_at >= datetime('now', '-30 days')",
      )
      .first<CountRow>(),
    db
      .prepare(
        "SELECT count(*) AS n FROM users WHERE created_at >= datetime('now', '-7 days')",
      )
      .first<CountRow>(),
    db.prepare('SELECT count(*) AS n FROM reading_events').first<CountRow>(),
    db.prepare('SELECT count(*) AS n FROM bookmarks').first<CountRow>(),
    db
      .prepare(
        `SELECT doc_slug, doc_title, count(*) AS visit_count
         FROM reading_events
         GROUP BY doc_slug, doc_title
         ORDER BY visit_count DESC
         LIMIT 10`,
      )
      .all<TopDocRow>(),
  ]);

  return c.json({
    total_users: totalUsers?.n ?? 0,
    active_today: activeToday?.n ?? 0,
    active_7d: active7d?.n ?? 0,
    active_30d: active30d?.n ?? 0,
    new_users_7d: newUsers7d?.n ?? 0,
    total_events: totalEvents?.n ?? 0,
    total_bookmarks: totalBookmarks?.n ?? 0,
    top_docs: topDocsRes.results ?? [],
  });
});

interface AdminUserListRow {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  last_seen: string;
  bookmark_count: number;
  event_count: number;
  progress_count: number;
}

adminRoutes.get('/users', async (c) => {
  const db = c.env.DB;

  const pageRaw = Number(c.req.query('page') ?? '1');
  const limitRaw = Number(c.req.query('limit') ?? '20');
  const search = (c.req.query('search') ?? '').trim();

  const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : 1;
  let limit = Number.isFinite(limitRaw) && limitRaw >= 1 ? Math.floor(limitRaw) : 20;
  if (limit > 50) limit = 50;
  const offset = (page - 1) * limit;

  const usersRes = await db
    .prepare(
      `SELECT u.id, u.name, u.email, u.avatar_url, u.created_at, u.last_seen,
        (SELECT count(*) FROM bookmarks WHERE user_id = u.id) AS bookmark_count,
        (SELECT count(*) FROM reading_events WHERE user_id = u.id) AS event_count,
        (SELECT count(*) FROM reading_progress WHERE user_id = u.id) AS progress_count
       FROM users u
       WHERE (?1 = '' OR u.name LIKE '%' || ?1 || '%' OR u.email LIKE '%' || ?1 || '%')
       ORDER BY u.last_seen DESC
       LIMIT ?2 OFFSET ?3`,
    )
    .bind(search, limit, offset)
    .all<AdminUserListRow>();

  const totalRow = await db
    .prepare(
      `SELECT count(*) AS n FROM users u
       WHERE (?1 = '' OR u.name LIKE '%' || ?1 || '%' OR u.email LIKE '%' || ?1 || '%')`,
    )
    .bind(search)
    .first<CountRow>();

  return c.json({
    users: usersRes.results ?? [],
    total: totalRow?.n ?? 0,
    page,
    limit,
  });
});

interface BookmarkSummaryRow {
  doc_slug: string;
  created_at: string;
}

interface RecentEventRow {
  doc_slug: string;
  doc_title: string;
  section_id: string;
  created_at: string;
  duration_seconds: number;
}

interface ProgressSummaryRow {
  doc_slug: string;
  percent: number;
  last_section: string | null;
  updated_at: string;
}

adminRoutes.get('/users/:id', async (c) => {
  const db = c.env.DB;
  const idParam = c.req.param('id');
  const userId = Number(idParam);
  if (!Number.isFinite(userId) || !Number.isInteger(userId) || userId <= 0) {
    return c.json({ error: 'invalid id' }, 400);
  }

  const user = await db
    .prepare(
      `SELECT u.id, u.google_sub, u.name, u.email, u.avatar_url, u.created_at, u.last_seen,
        (SELECT count(*) FROM bookmarks WHERE user_id = u.id) AS bookmark_count,
        (SELECT count(*) FROM reading_events WHERE user_id = u.id) AS event_count
       FROM users u WHERE u.id = ?1`,
    )
    .bind(userId)
    .first<UserRow & { bookmark_count: number; event_count: number }>();

  if (!user) return c.json({ error: 'not found' }, 404);

  const [bookmarksRes, eventsRes, progressRes] = await Promise.all([
    db
      .prepare(
        'SELECT doc_slug, created_at FROM bookmarks WHERE user_id = ?1 ORDER BY created_at DESC',
      )
      .bind(userId)
      .all<BookmarkSummaryRow>(),
    db
      .prepare(
        `SELECT doc_slug, doc_title, section_id, created_at, duration_seconds
         FROM reading_events
         WHERE user_id = ?1
         ORDER BY created_at DESC
         LIMIT 50`,
      )
      .bind(userId)
      .all<RecentEventRow>(),
    db
      .prepare(
        `SELECT doc_slug, percent, last_section, updated_at
         FROM reading_progress
         WHERE user_id = ?1
         ORDER BY updated_at DESC`,
      )
      .bind(userId)
      .all<ProgressSummaryRow>(),
  ]);

  return c.json({
    user,
    bookmarks: bookmarksRes.results ?? [],
    recent_events: eventsRes.results ?? [],
    progress: progressRes.results ?? [],
  });
});
