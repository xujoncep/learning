import type { UserRow, ReadingProgressRow } from '../schema';

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

