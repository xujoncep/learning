import type {
  AnnouncementLevel,
  AnnouncementRow,
  ReadingProgressRow,
  UserRow,
} from '../schema';

export async function upsertGoogleUser(
  db: D1Database,
  info: { sub: string; email: string; name: string; picture?: string },
): Promise<UserRow> {
  const row = await db
    .prepare(
      `INSERT INTO users (google_sub, email, name, avatar_url)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(google_sub) DO UPDATE SET
         email      = excluded.email,
         name       = excluded.name,
         avatar_url = excluded.avatar_url,
         last_seen  = datetime('now')
       RETURNING *`,
    )
    .bind(info.sub, info.email, info.name, info.picture ?? null)
    .first<UserRow>();
  if (!row) throw new Error('upsertGoogleUser: no row returned');
  return row;
}

export async function getUserById(db: D1Database, id: number): Promise<UserRow | null> {
  const row = await db
    .prepare('SELECT * FROM users WHERE id = ?1')
    .bind(id)
    .first<UserRow>();
  return row ?? null;
}

export async function listBookmarks(db: D1Database, userId: number): Promise<string[]> {
  const res = await db
    .prepare(
      'SELECT doc_slug FROM bookmarks WHERE user_id = ?1 ORDER BY created_at DESC',
    )
    .bind(userId)
    .all<{ doc_slug: string }>();
  return (res.results ?? []).map((r) => r.doc_slug);
}

export async function addBookmark(
  db: D1Database,
  userId: number,
  slug: string,
): Promise<void> {
  await db
    .prepare(
      'INSERT OR IGNORE INTO bookmarks (user_id, doc_slug) VALUES (?1, ?2)',
    )
    .bind(userId, slug)
    .run();
}

export async function removeBookmark(
  db: D1Database,
  userId: number,
  slug: string,
): Promise<void> {
  await db
    .prepare('DELETE FROM bookmarks WHERE user_id = ?1 AND doc_slug = ?2')
    .bind(userId, slug)
    .run();
}

export async function listProgress(
  db: D1Database,
  userId: number,
): Promise<ReadingProgressRow[]> {
  const res = await db
    .prepare(
      'SELECT * FROM reading_progress WHERE user_id = ?1 ORDER BY updated_at DESC',
    )
    .bind(userId)
    .all<ReadingProgressRow>();
  return res.results ?? [];
}

export async function upsertProgress(
  db: D1Database,
  userId: number,
  slug: string,
  data: { percent: number; last_section?: string },
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO reading_progress (user_id, doc_slug, percent, last_section)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(user_id, doc_slug) DO UPDATE SET
         percent      = excluded.percent,
         last_section = excluded.last_section,
         updated_at   = datetime('now')`,
    )
    .bind(userId, slug, data.percent, data.last_section ?? null)
    .run();
}

export async function recordAudit(
  db: D1Database,
  userId: number,
  action: string,
  target: string | null,
): Promise<void> {
  await db
    .prepare('INSERT INTO audit_log (user_id, action, target) VALUES (?1, ?2, ?3)')
    .bind(userId, action, target)
    .run();
}

export async function recordReadingEvent(
  db: D1Database,
  userId: number,
  data: { slug: string; title: string; sectionId: string; seconds?: number },
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO reading_events (user_id, doc_slug, doc_title, section_id, duration_seconds)
       VALUES (?1, ?2, ?3, ?4, ?5)`,
    )
    .bind(userId, data.slug, data.title, data.sectionId, Math.max(0, Math.floor(data.seconds ?? 0)))
    .run();
}

export interface DayCount {
  date: string;
  count: number;
  total_seconds: number;
}

// Daily counts + total active reading time for the calendar heat map.
// `from` and `to` are ISO datetime strings, inclusive on `from`, exclusive on `to`.
export async function getCalendarMonth(
  db: D1Database,
  userId: number,
  from: string,
  to: string,
): Promise<DayCount[]> {
  const res = await db
    .prepare(
      `SELECT date(created_at) AS date,
              count(*) AS count,
              COALESCE(sum(duration_seconds), 0) AS total_seconds
       FROM reading_events
       WHERE user_id = ?1 AND created_at >= ?2 AND created_at < ?3
       GROUP BY date(created_at)
       ORDER BY date(created_at)`,
    )
    .bind(userId, from, to)
    .all<DayCount>();
  return res.results ?? [];
}

export interface DayEvent {
  doc_slug: string;
  doc_title: string;
  section_id: string;
  visits: number;
  total_seconds: number;
  first_seen: string;
  last_seen: string;
}

// All chapters read on a single calendar day, deduped per chapter with
// visit count, total active seconds, and first/last timestamps so the
// day-detail panel can show a clean list rather than every page-load row.
export async function getDayEvents(
  db: D1Database,
  userId: number,
  date: string,
): Promise<DayEvent[]> {
  const res = await db
    .prepare(
      `SELECT doc_slug, doc_title, section_id,
              count(*) AS visits,
              COALESCE(sum(duration_seconds), 0) AS total_seconds,
              min(created_at) AS first_seen,
              max(created_at) AS last_seen
       FROM reading_events
       WHERE user_id = ?1 AND date(created_at) = ?2
       GROUP BY doc_slug, doc_title, section_id
       ORDER BY last_seen DESC`,
    )
    .bind(userId, date)
    .all<DayEvent>();
  return res.results ?? [];
}

export interface ReadingSummary {
  total_events: number;
  distinct_chapters: number;
  current_streak: number;
  active_days_30: number;
  total_seconds_30: number;
  recent: Array<{ doc_slug: string; doc_title: string; section_id: string; created_at: string }>;
}

export async function getReadingSummary(
  db: D1Database,
  userId: number,
): Promise<ReadingSummary> {
  const totals = await db
    .prepare(
      `SELECT count(*) AS total_events, count(DISTINCT doc_slug) AS distinct_chapters
       FROM reading_events WHERE user_id = ?1`,
    )
    .bind(userId)
    .first<{ total_events: number; distinct_chapters: number }>();

  // Distinct active days in the last 30 days, ordered desc — used for both
  // the streak count and the "this month" tile.
  const days = await db
    .prepare(
      `SELECT DISTINCT date(created_at) AS date
       FROM reading_events
       WHERE user_id = ?1 AND created_at >= datetime('now', '-30 days')
       ORDER BY date DESC`,
    )
    .bind(userId)
    .all<{ date: string }>();

  const activeDays = (days.results ?? []).map((d) => d.date);

  // Streak: consecutive days ending today (or yesterday — keep streak alive
  // until the day rolls over so an early-morning visit still counts yesterday).
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  let streak = 0;
  if (activeDays.length > 0 && (activeDays[0] === today || activeDays[0] === yesterday)) {
    streak = 1;
    let cursor = new Date(activeDays[0]);
    for (let i = 1; i < activeDays.length; i++) {
      cursor.setUTCDate(cursor.getUTCDate() - 1);
      const expected = cursor.toISOString().slice(0, 10);
      if (activeDays[i] === expected) {
        streak++;
      } else {
        break;
      }
    }
  }

  // Total active reading time over the last 30 days, in seconds.
  const seconds30 = await db
    .prepare(
      `SELECT COALESCE(sum(duration_seconds), 0) AS total_seconds_30
       FROM reading_events
       WHERE user_id = ?1 AND created_at >= datetime('now', '-30 days')`,
    )
    .bind(userId)
    .first<{ total_seconds_30: number }>();

  const recentRes = await db
    .prepare(
      `SELECT doc_slug, doc_title, section_id, created_at
       FROM reading_events
       WHERE user_id = ?1
       ORDER BY created_at DESC
       LIMIT 8`,
    )
    .bind(userId)
    .all<{ doc_slug: string; doc_title: string; section_id: string; created_at: string }>();

  return {
    total_events: totals?.total_events ?? 0,
    distinct_chapters: totals?.distinct_chapters ?? 0,
    current_streak: streak,
    active_days_30: activeDays.length,
    total_seconds_30: seconds30?.total_seconds_30 ?? 0,
    recent: recentRes.results ?? [],
  };
}

// ---------------------------------------------------------------------------
// Admin: ban / unban / delete user
// ---------------------------------------------------------------------------

export async function banUser(db: D1Database, userId: number): Promise<void> {
  await db
    .prepare("UPDATE users SET banned_at = datetime('now') WHERE id = ?1")
    .bind(userId)
    .run();
}

export async function unbanUser(db: D1Database, userId: number): Promise<void> {
  await db
    .prepare('UPDATE users SET banned_at = NULL WHERE id = ?1')
    .bind(userId)
    .run();
}

// reading_events has no FK back to users (legacy), so we wipe it manually
// before deleting the user row. Bookmarks / progress / audit_log cascade.
export async function deleteUser(db: D1Database, userId: number): Promise<void> {
  await db
    .prepare('DELETE FROM reading_events WHERE user_id = ?1')
    .bind(userId)
    .run();
  await db
    .prepare('DELETE FROM announcement_dismissals WHERE user_id = ?1')
    .bind(userId)
    .run();
  await db.prepare('DELETE FROM users WHERE id = ?1').bind(userId).run();
}

// ---------------------------------------------------------------------------
// Admin: audit log listing (joins with users for a friendly actor label)
// ---------------------------------------------------------------------------

export interface AuditEntry {
  id: number;
  user_id: number | null;
  action: string;
  target: string | null;
  created_at: string;
  actor_name: string | null;
  actor_email: string | null;
}

export async function listAuditLog(
  db: D1Database,
  page: number,
  limit: number,
): Promise<{ entries: AuditEntry[]; total: number }> {
  const offset = (page - 1) * limit;
  const entriesRes = await db
    .prepare(
      `SELECT a.id, a.user_id, a.action, a.target, a.created_at,
              u.name  AS actor_name,
              u.email AS actor_email
       FROM audit_log a
       LEFT JOIN users u ON u.id = a.user_id
       ORDER BY a.created_at DESC
       LIMIT ?1 OFFSET ?2`,
    )
    .bind(limit, offset)
    .all<AuditEntry>();
  const totalRow = await db
    .prepare('SELECT count(*) AS n FROM audit_log')
    .first<{ n: number }>();
  return {
    entries: entriesRes.results ?? [],
    total: totalRow?.n ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Announcements
// ---------------------------------------------------------------------------

export interface AdminAnnouncementRow extends AnnouncementRow {
  creator_name: string | null;
}

export async function listAllAnnouncements(
  db: D1Database,
): Promise<AdminAnnouncementRow[]> {
  const res = await db
    .prepare(
      `SELECT a.id, a.title, a.body, a.level, a.starts_at, a.ends_at,
              a.is_active, a.created_by, a.created_at,
              u.name AS creator_name
       FROM announcements a
       LEFT JOIN users u ON u.id = a.created_by
       ORDER BY a.created_at DESC`,
    )
    .all<AdminAnnouncementRow>();
  return res.results ?? [];
}

export async function createAnnouncement(
  db: D1Database,
  data: {
    title: string;
    body: string;
    level: AnnouncementLevel;
    starts_at?: string;
    ends_at?: string | null;
    created_by: number;
  },
): Promise<AnnouncementRow> {
  const row = await db
    .prepare(
      `INSERT INTO announcements (title, body, level, starts_at, ends_at, created_by)
       VALUES (?1, ?2, ?3, COALESCE(?4, datetime('now')), ?5, ?6)
       RETURNING *`,
    )
    .bind(
      data.title,
      data.body,
      data.level,
      data.starts_at ?? null,
      data.ends_at ?? null,
      data.created_by,
    )
    .first<AnnouncementRow>();
  if (!row) throw new Error('createAnnouncement: no row returned');
  return row;
}

export interface AnnouncementPatch {
  is_active?: boolean;
  title?: string;
  body?: string;
  level?: AnnouncementLevel;
  ends_at?: string | null;
}

export async function updateAnnouncement(
  db: D1Database,
  id: number,
  patch: AnnouncementPatch,
): Promise<AnnouncementRow | null> {
  // Build a dynamic UPDATE so we only touch columns the caller actually sent.
  const sets: string[] = [];
  const binds: unknown[] = [];
  let i = 1;

  if (patch.is_active !== undefined) {
    sets.push(`is_active = ?${i++}`);
    binds.push(patch.is_active ? 1 : 0);
  }
  if (patch.title !== undefined) {
    sets.push(`title = ?${i++}`);
    binds.push(patch.title);
  }
  if (patch.body !== undefined) {
    sets.push(`body = ?${i++}`);
    binds.push(patch.body);
  }
  if (patch.level !== undefined) {
    sets.push(`level = ?${i++}`);
    binds.push(patch.level);
  }
  if (patch.ends_at !== undefined) {
    sets.push(`ends_at = ?${i++}`);
    binds.push(patch.ends_at);
  }

  if (sets.length === 0) {
    const existing = await db
      .prepare('SELECT * FROM announcements WHERE id = ?1')
      .bind(id)
      .first<AnnouncementRow>();
    return existing ?? null;
  }

  binds.push(id);
  const sql = `UPDATE announcements SET ${sets.join(', ')} WHERE id = ?${i} RETURNING *`;
  const row = await db
    .prepare(sql)
    .bind(...binds)
    .first<AnnouncementRow>();
  return row ?? null;
}

export async function deleteAnnouncement(
  db: D1Database,
  id: number,
): Promise<boolean> {
  const res = await db
    .prepare('DELETE FROM announcements WHERE id = ?1')
    .bind(id)
    .run();
  // D1 returns meta.changes — if any row was deleted we report success.
  const changes = (res.meta as { changes?: number } | undefined)?.changes ?? 0;
  return changes > 0;
}

export async function getAnnouncementById(
  db: D1Database,
  id: number,
): Promise<AnnouncementRow | null> {
  const row = await db
    .prepare('SELECT * FROM announcements WHERE id = ?1')
    .bind(id)
    .first<AnnouncementRow>();
  return row ?? null;
}

export async function listActiveAnnouncementsForUser(
  db: D1Database,
  userId: number,
): Promise<AnnouncementRow[]> {
  const res = await db
    .prepare(
      `SELECT a.*
       FROM announcements a
       LEFT JOIN announcement_dismissals d
         ON d.announcement_id = a.id AND d.user_id = ?1
       WHERE a.is_active = 1
         AND a.starts_at <= datetime('now')
         AND (a.ends_at IS NULL OR a.ends_at > datetime('now'))
         AND d.user_id IS NULL
       ORDER BY a.created_at DESC`,
    )
    .bind(userId)
    .all<AnnouncementRow>();
  return res.results ?? [];
}

export async function dismissAnnouncement(
  db: D1Database,
  userId: number,
  announcementId: number,
): Promise<void> {
  await db
    .prepare(
      `INSERT OR IGNORE INTO announcement_dismissals (user_id, announcement_id)
       VALUES (?1, ?2)`,
    )
    .bind(userId, announcementId)
    .run();
}

// ---------------------------------------------------------------------------
// Admin: daily analytics
// ---------------------------------------------------------------------------

export interface DailyAnalyticsPoint {
  date: string;
  events: number;
  distinct_users: number;
  new_users: number;
}

// Two grouped queries (one over reading_events, one over users) merged in JS
// so missing days fill with zeros. Range is inclusive on both ends.
export async function getDailyAnalytics(
  db: D1Database,
  from: string,
  to: string,
): Promise<DailyAnalyticsPoint[]> {
  // We compare to a half-open window [from, to+1day) on the underlying
  // datetime column to keep index usage clean and avoid timezone footguns.
  const toExclusive = addOneDay(to);

  const eventsRes = await db
    .prepare(
      `SELECT date(created_at) AS date,
              count(*) AS events,
              count(DISTINCT user_id) AS distinct_users
       FROM reading_events
       WHERE created_at >= ?1 AND created_at < ?2
       GROUP BY date(created_at)`,
    )
    .bind(from, toExclusive)
    .all<{ date: string; events: number; distinct_users: number }>();

  const newUsersRes = await db
    .prepare(
      `SELECT date(created_at) AS date, count(*) AS new_users
       FROM users
       WHERE created_at >= ?1 AND created_at < ?2
       GROUP BY date(created_at)`,
    )
    .bind(from, toExclusive)
    .all<{ date: string; new_users: number }>();

  const byDate = new Map<string, DailyAnalyticsPoint>();
  for (const d of enumerateDates(from, to)) {
    byDate.set(d, { date: d, events: 0, distinct_users: 0, new_users: 0 });
  }
  for (const r of eventsRes.results ?? []) {
    const slot = byDate.get(r.date);
    if (slot) {
      slot.events = r.events;
      slot.distinct_users = r.distinct_users;
    }
  }
  for (const r of newUsersRes.results ?? []) {
    const slot = byDate.get(r.date);
    if (slot) slot.new_users = r.new_users;
  }
  return Array.from(byDate.values());
}

function addOneDay(date: string): string {
  // date is YYYY-MM-DD. Treat as UTC midnight, advance one day.
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function enumerateDates(from: string, to: string): string[] {
  const out: string[] = [];
  const cursor = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  while (cursor.getTime() <= end.getTime()) {
    out.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}
