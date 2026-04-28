-- Append-only log of chapter reads. Powers calendar heat map, day detail
-- panel, streak counter, and per-section progress on the dashboard.
CREATE TABLE reading_events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doc_slug   TEXT    NOT NULL,
  doc_title  TEXT    NOT NULL,
  section_id TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Calendar query is `WHERE user_id = ? AND created_at BETWEEN ? AND ?`
-- grouped by date(created_at). The composite index covers both filters
-- and keeps day-detail lookups cheap.
CREATE INDEX idx_reading_events_user_day ON reading_events(user_id, created_at);
