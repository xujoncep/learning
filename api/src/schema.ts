export interface UserRow {
  id: number;
  google_sub: string;
  email: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
  last_seen: string;
  banned_at: string | null;
}

export interface BookmarkRow {
  user_id: number;
  doc_slug: string;
  created_at: string;
}

export interface ReadingProgressRow {
  user_id: number;
  doc_slug: string;
  percent: number;
  last_section: string | null;
  updated_at: string;
}

export interface AuditLogRow {
  id: number;
  user_id: number;
  action: string;
  target: string | null;
  created_at: string;
}

export interface ReadingEventRow {
  id: number;
  user_id: number;
  doc_slug: string;
  doc_title: string;
  section_id: string;
  duration_seconds: number;
  created_at: string;
}

export type AnnouncementLevel = 'info' | 'warn' | 'success';

export interface AnnouncementRow {
  id: number;
  title: string;
  body: string;
  level: AnnouncementLevel;
  starts_at: string;
  ends_at: string | null;
  is_active: number;
  created_by: number | null;
  created_at: string;
}
