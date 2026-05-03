import { Hono } from 'hono';
import type { MiddlewareHandler } from 'hono';
import type { Env } from '../env';
import { verifyJwt } from '../lib/jwt';
import type { AnnouncementLevel, UserRow } from '../schema';
import {
  banUser,
  createAnnouncement,
  deleteAnnouncement,
  deleteUser,
  getAnnouncementById,
  getDailyAnalytics,
  listAllAnnouncements,
  listAuditLog,
  recordAudit,
  unbanUser,
  updateAnnouncement,
} from '../lib/db';

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

  const row = await c.env.DB.prepare(
    'SELECT email, banned_at FROM users WHERE id = ?1',
  )
    .bind(payload.sub)
    .first<{ email: string; banned_at: string | null }>();
  if (!row) return c.json({ error: 'unauthorized' }, 401);
  // A banned admin loses admin rights too — defence in depth.
  if (row.banned_at) return c.json({ error: 'banned' }, 403);

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

// Validate "YYYY-MM-DD" — same shape as the /me/calendar validator.
function isValidDate(s: string | undefined): s is string {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function daysBetween(from: string, to: string): number {
  const a = new Date(`${from}T00:00:00Z`).getTime();
  const b = new Date(`${to}T00:00:00Z`).getTime();
  return Math.round((b - a) / 86_400_000);
}

// -------------------------------------------------------------------------
// /admin/stats — supports optional from/to (YYYY-MM-DD). When omitted the
// historical 7d/30d windows are preserved. When supplied we recompute every
// "active in window" aggregate against the caller-provided range.
// -------------------------------------------------------------------------
adminRoutes.get('/stats', async (c) => {
  const db = c.env.DB;
  const from = c.req.query('from');
  const to = c.req.query('to');

  // If either bound is provided, both must be valid YYYY-MM-DD.
  const hasRange = from !== undefined || to !== undefined;
  if (hasRange) {
    if (!isValidDate(from) || !isValidDate(to)) {
      return c.json({ error: 'from/to must be YYYY-MM-DD' }, 400);
    }
    if (from > to) {
      return c.json({ error: 'from must be <= to' }, 400);
    }
  }

  // Build the predicate fragment and the bound timestamps for active-window
  // queries. `to` is treated as exclusive at the day boundary.
  const fromTs = hasRange ? `${from} 00:00:00` : null;
  const toTs = hasRange ? `${to} 00:00:00` : null;

  const activeWindowSql = hasRange
    ? 'WHERE created_at >= ?1 AND created_at < ?2'
    : '';
  const activeBinds: unknown[] = hasRange ? [fromTs, toTs] : [];

  const newUsersWindowSql = hasRange
    ? 'WHERE created_at >= ?1 AND created_at < ?2'
    : "WHERE created_at >= datetime('now', '-7 days')";

  const [
    totalUsers,
    activeToday,
    activeWindow,
    activeWindowAlt,
    newUsersWindow,
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
    hasRange
      ? db
          .prepare(
            `SELECT count(DISTINCT user_id) AS n FROM reading_events ${activeWindowSql}`,
          )
          .bind(...activeBinds)
          .first<CountRow>()
      : db
          .prepare(
            "SELECT count(DISTINCT user_id) AS n FROM reading_events WHERE created_at >= datetime('now', '-7 days')",
          )
          .first<CountRow>(),
    hasRange
      ? Promise.resolve<CountRow | null>(null)
      : db
          .prepare(
            "SELECT count(DISTINCT user_id) AS n FROM reading_events WHERE created_at >= datetime('now', '-30 days')",
          )
          .first<CountRow>(),
    hasRange
      ? db
          .prepare(`SELECT count(*) AS n FROM users ${newUsersWindowSql}`)
          .bind(...activeBinds)
          .first<CountRow>()
      : db.prepare(`SELECT count(*) AS n FROM users ${newUsersWindowSql}`).first<CountRow>(),
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

  if (hasRange) {
    return c.json({
      from,
      to,
      total_users: totalUsers?.n ?? 0,
      active_today: activeToday?.n ?? 0,
      active_window: activeWindow?.n ?? 0,
      new_users_window: newUsersWindow?.n ?? 0,
      total_events: totalEvents?.n ?? 0,
      total_bookmarks: totalBookmarks?.n ?? 0,
      top_docs: topDocsRes.results ?? [],
    });
  }

  return c.json({
    total_users: totalUsers?.n ?? 0,
    active_today: activeToday?.n ?? 0,
    active_7d: activeWindow?.n ?? 0,
    active_30d: activeWindowAlt?.n ?? 0,
    new_users_7d: newUsersWindow?.n ?? 0,
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
  banned_at: string | null;
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
      `SELECT u.id, u.name, u.email, u.avatar_url, u.created_at, u.last_seen, u.banned_at,
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
      `SELECT u.id, u.google_sub, u.name, u.email, u.avatar_url, u.created_at, u.last_seen, u.banned_at,
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

// -------------------------------------------------------------------------
// Ban / unban / delete
// -------------------------------------------------------------------------

function parseUserId(raw: string | undefined): number | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) return null;
  return n;
}

adminRoutes.post('/users/:id/ban', async (c) => {
  const adminId = c.get('userId');
  const targetId = parseUserId(c.req.param('id'));
  if (targetId === null) return c.json({ error: 'invalid id' }, 400);
  if (targetId === adminId) return c.json({ error: 'cannot ban self' }, 400);

  const target = await c.env.DB.prepare('SELECT id FROM users WHERE id = ?1')
    .bind(targetId)
    .first<{ id: number }>();
  if (!target) return c.json({ error: 'not found' }, 404);

  await banUser(c.env.DB, targetId);
  await recordAudit(c.env.DB, adminId, 'admin.ban', String(targetId));
  return c.json({ ok: true });
});

adminRoutes.post('/users/:id/unban', async (c) => {
  const adminId = c.get('userId');
  const targetId = parseUserId(c.req.param('id'));
  if (targetId === null) return c.json({ error: 'invalid id' }, 400);

  const target = await c.env.DB.prepare('SELECT id FROM users WHERE id = ?1')
    .bind(targetId)
    .first<{ id: number }>();
  if (!target) return c.json({ error: 'not found' }, 404);

  await unbanUser(c.env.DB, targetId);
  await recordAudit(c.env.DB, adminId, 'admin.unban', String(targetId));
  return c.json({ ok: true });
});

adminRoutes.delete('/users/:id', async (c) => {
  const adminId = c.get('userId');
  const targetId = parseUserId(c.req.param('id'));
  if (targetId === null) return c.json({ error: 'invalid id' }, 400);
  if (targetId === adminId) return c.json({ error: 'cannot delete self' }, 400);

  // Snapshot identifying info BEFORE the delete so the audit trail survives
  // the cascade (audit_log rows for the deleted user are wiped too).
  const target = await c.env.DB.prepare(
    'SELECT id, email FROM users WHERE id = ?1',
  )
    .bind(targetId)
    .first<{ id: number; email: string }>();
  if (!target) return c.json({ error: 'not found' }, 404);

  await deleteUser(c.env.DB, targetId);
  await recordAudit(
    c.env.DB,
    adminId,
    'admin.delete_user',
    `${target.email}#${target.id}`,
  );
  return c.json({ ok: true });
});

// -------------------------------------------------------------------------
// Audit log
// -------------------------------------------------------------------------

adminRoutes.get('/audit-log', async (c) => {
  const pageRaw = Number(c.req.query('page') ?? '1');
  const limitRaw = Number(c.req.query('limit') ?? '50');

  const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : 1;
  let limit = Number.isFinite(limitRaw) && limitRaw >= 1 ? Math.floor(limitRaw) : 50;
  if (limit > 200) limit = 200;

  const { entries, total } = await listAuditLog(c.env.DB, page, limit);
  return c.json({ entries, total, page, limit });
});

// -------------------------------------------------------------------------
// Announcements (admin CRUD)
// -------------------------------------------------------------------------

const ANNOUNCEMENT_LEVELS: ReadonlySet<AnnouncementLevel> = new Set([
  'info',
  'warn',
  'success',
]);

function isValidLevel(s: unknown): s is AnnouncementLevel {
  return typeof s === 'string' && ANNOUNCEMENT_LEVELS.has(s as AnnouncementLevel);
}

function isValidIsoTimestamp(s: unknown): s is string {
  // Accept either YYYY-MM-DD or YYYY-MM-DD HH:MM:SS / YYYY-MM-DDTHH:MM:SSZ.
  // Looser than the calendar validator on purpose — admin-authored timestamps.
  if (typeof s !== 'string') return false;
  return /^\d{4}-\d{2}-\d{2}([ T]\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:?\d{2})?)?$/.test(
    s,
  );
}

adminRoutes.get('/announcements', async (c) => {
  const items = await listAllAnnouncements(c.env.DB);
  return c.json({ announcements: items });
});

adminRoutes.post('/announcements', async (c) => {
  const adminId = c.get('userId');
  const body = (await c.req.json().catch(() => null)) as
    | {
        title?: unknown;
        body?: unknown;
        level?: unknown;
        starts_at?: unknown;
        ends_at?: unknown;
      }
    | null;
  if (!body) return c.json({ error: 'invalid body' }, 400);

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (title.length < 1 || title.length > 200) {
    return c.json({ error: 'title must be 1..200 chars' }, 400);
  }

  const text = typeof body.body === 'string' ? body.body.trim() : '';
  if (text.length < 1 || text.length > 2000) {
    return c.json({ error: 'body must be 1..2000 chars' }, 400);
  }

  let level: AnnouncementLevel = 'info';
  if (body.level !== undefined && body.level !== null) {
    if (!isValidLevel(body.level)) {
      return c.json({ error: 'level must be info|warn|success' }, 400);
    }
    level = body.level;
  }

  let startsAt: string | undefined;
  if (body.starts_at !== undefined && body.starts_at !== null) {
    if (!isValidIsoTimestamp(body.starts_at)) {
      return c.json({ error: 'invalid starts_at' }, 400);
    }
    startsAt = body.starts_at;
  }

  let endsAt: string | null | undefined;
  if (body.ends_at !== undefined) {
    if (body.ends_at === null) {
      endsAt = null;
    } else if (isValidIsoTimestamp(body.ends_at)) {
      endsAt = body.ends_at;
    } else {
      return c.json({ error: 'invalid ends_at' }, 400);
    }
  }

  const row = await createAnnouncement(c.env.DB, {
    title,
    body: text,
    level,
    ...(startsAt !== undefined ? { starts_at: startsAt } : {}),
    ...(endsAt !== undefined ? { ends_at: endsAt } : {}),
    created_by: adminId,
  });

  await recordAudit(c.env.DB, adminId, 'admin.announce', String(row.id));
  return c.json({ announcement: row });
});

adminRoutes.patch('/announcements/:id', async (c) => {
  const adminId = c.get('userId');
  const id = parseUserId(c.req.param('id'));
  if (id === null) return c.json({ error: 'invalid id' }, 400);

  const existing = await getAnnouncementById(c.env.DB, id);
  if (!existing) return c.json({ error: 'not found' }, 404);

  const body = (await c.req.json().catch(() => null)) as
    | {
        is_active?: unknown;
        title?: unknown;
        body?: unknown;
        level?: unknown;
        ends_at?: unknown;
      }
    | null;
  if (!body) return c.json({ error: 'invalid body' }, 400);

  const patch: {
    is_active?: boolean;
    title?: string;
    body?: string;
    level?: AnnouncementLevel;
    ends_at?: string | null;
  } = {};

  if (body.is_active !== undefined) {
    if (typeof body.is_active !== 'boolean') {
      return c.json({ error: 'is_active must be boolean' }, 400);
    }
    patch.is_active = body.is_active;
  }
  if (body.title !== undefined) {
    if (typeof body.title !== 'string') return c.json({ error: 'invalid title' }, 400);
    const t = body.title.trim();
    if (t.length < 1 || t.length > 200) {
      return c.json({ error: 'title must be 1..200 chars' }, 400);
    }
    patch.title = t;
  }
  if (body.body !== undefined) {
    if (typeof body.body !== 'string') return c.json({ error: 'invalid body' }, 400);
    const t = body.body.trim();
    if (t.length < 1 || t.length > 2000) {
      return c.json({ error: 'body must be 1..2000 chars' }, 400);
    }
    patch.body = t;
  }
  if (body.level !== undefined) {
    if (!isValidLevel(body.level)) {
      return c.json({ error: 'level must be info|warn|success' }, 400);
    }
    patch.level = body.level;
  }
  if (body.ends_at !== undefined) {
    if (body.ends_at === null) {
      patch.ends_at = null;
    } else if (isValidIsoTimestamp(body.ends_at)) {
      patch.ends_at = body.ends_at;
    } else {
      return c.json({ error: 'invalid ends_at' }, 400);
    }
  }

  const updated = await updateAnnouncement(c.env.DB, id, patch);
  if (!updated) return c.json({ error: 'not found' }, 404);

  await recordAudit(
    c.env.DB,
    adminId,
    'admin.update_announcement',
    String(id),
  );
  return c.json({ announcement: updated });
});

adminRoutes.delete('/announcements/:id', async (c) => {
  const adminId = c.get('userId');
  const id = parseUserId(c.req.param('id'));
  if (id === null) return c.json({ error: 'invalid id' }, 400);

  const ok = await deleteAnnouncement(c.env.DB, id);
  if (!ok) return c.json({ error: 'not found' }, 404);

  await recordAudit(
    c.env.DB,
    adminId,
    'admin.delete_announcement',
    String(id),
  );
  return c.json({ ok: true });
});

// -------------------------------------------------------------------------
// Daily analytics chart data
// -------------------------------------------------------------------------

adminRoutes.get('/analytics/daily', async (c) => {
  const fromQ = c.req.query('from');
  const toQ = c.req.query('to');

  // Default: last 30 days inclusive on both ends.
  let from: string;
  let to: string;
  if (fromQ === undefined && toQ === undefined) {
    const today = new Date();
    const start = new Date(today.getTime() - 29 * 86_400_000);
    from = start.toISOString().slice(0, 10);
    to = today.toISOString().slice(0, 10);
  } else {
    if (!isValidDate(fromQ) || !isValidDate(toQ)) {
      return c.json({ error: 'from/to must be YYYY-MM-DD' }, 400);
    }
    from = fromQ;
    to = toQ;
  }

  if (from > to) return c.json({ error: 'from must be <= to' }, 400);
  if (daysBetween(from, to) > 90) {
    return c.json({ error: 'range cannot exceed 90 days' }, 400);
  }

  const series = await getDailyAnalytics(c.env.DB, from, to);
  return c.json({ from, to, series });
});
