-- Active reading time per event row, only counts seconds when the tab is
-- actually visible (driven by Page Visibility API on the frontend).
-- Initial /me/events POST inserts duration=0; heartbeat events append rows
-- with seconds accumulated since the last heartbeat.
ALTER TABLE reading_events ADD COLUMN duration_seconds INTEGER NOT NULL DEFAULT 0;
