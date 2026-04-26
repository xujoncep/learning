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
