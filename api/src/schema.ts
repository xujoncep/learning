export interface UserRow {
  id: number;
  google_sub: string;
  email: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
  last_seen: string;
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
