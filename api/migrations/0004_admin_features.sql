-- Admin features:
--   1. Soft-ban support on users (banned_at NULL = active, non-NULL = banned).
--   2. Announcements (admin-authored in-app banners) with per-user dismissals.

ALTER TABLE users ADD COLUMN banned_at TEXT;

CREATE TABLE announcements (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  title        TEXT    NOT NULL,
  body         TEXT    NOT NULL,
  level        TEXT    NOT NULL DEFAULT 'info',
  starts_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  ends_at      TEXT,
  is_active    INTEGER NOT NULL DEFAULT 1,
  created_by   INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE announcement_dismissals (
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  announcement_id INTEGER NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  dismissed_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, announcement_id)
);

CREATE INDEX idx_announcements_active ON announcements(is_active, starts_at, ends_at);
