import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookmarkIcon,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Search,
  Shield,
  ShieldOff,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { avatarColor, initials } from '@/lib/auth';
import {
  banUser,
  createAnnouncement,
  deleteAnnouncement,
  deleteUser,
  getAdminAuditLog,
  getAdminStatsRange,
  getAdminUserDetail,
  getAdminUsers,
  getDailyAnalytics,
  getMe,
  listAdminAnnouncements,
  unbanUser,
  updateAnnouncement,
  type AdminStats,
  type AdminUserDetail,
  type AdminUserRow,
  type AnnouncementAdminRow,
  type AuditEntry,
  type DailyAnalyticsPoint,
} from '@/lib/api';
import { cn } from '@/lib/utils';
import { DailyChart } from '@/components/admin/DailyChart';

type View = 'overview' | 'users' | 'user-detail' | 'audit-log' | 'announcements';

// ── Helpers ────────────────────────────────────────────────────────────────

function nDaysAgo(n: number): string {
  return new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);
}
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  const then = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'));
  const diffMs = Date.now() - then.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 1) return '< 1 min';
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remMin = minutes - hours * 60;
  return remMin > 0 ? `${hours}h ${remMin}m` : `${hours}h`;
}

// ── Shared UI atoms ────────────────────────────────────────────────────────

function Avatar({ name, src, size = 36 }: { name: string; src?: string | null; size?: number }) {
  const px = `${size}px`;
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="rounded-full object-cover border border-line"
        style={{ width: px, height: px }}
      />
    );
  }
  return (
    <span
      className="rounded-full inline-flex items-center justify-center font-medium text-white"
      style={{ width: px, height: px, background: avatarColor(name), fontSize: Math.round(size * 0.4) }}
    >
      {initials(name)}
    </span>
  );
}

function StatCard({
  label, value, icon, big = false,
}: {
  label: string; value: number | string; icon?: React.ReactNode; big?: boolean;
}) {
  return (
    <div className="card-surface p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="meta uppercase tracking-wide">{label}</span>
        {icon ? <span className="text-ink-4">{icon}</span> : null}
      </div>
      <div className={cn('font-serif text-ink', big ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl')}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  );
}

function PulseSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 rounded-lg bg-sand-2" />
      ))}
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="card-surface p-5 border-clay/30 bg-clay/5">
      <p className="text-sm text-ink-2">
        <span className="font-medium text-clay">Error: </span>
        {message}
      </p>
    </div>
  );
}

const DATE_INPUT_CLASS =
  'h-9 rounded-[8px] bg-surface border border-line-2 text-sm text-ink-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber';

// ── Audit action chip colors ───────────────────────────────────────────────

const ACTION_CHIPS: Record<string, string> = {
  'auth.login':                  'chip chip-outline',
  'admin.ban':                   'chip bg-clay/15 text-clay border border-clay/30',
  'admin.unban':                 'chip bg-ink-blue/10 text-ink-blue border border-ink-blue/30',
  'admin.delete_user':           'chip bg-clay/25 text-clay border border-clay/40 font-medium',
  'admin.announce':              'chip chip-amber',
  'admin.update_announcement':   'chip chip-amber',
  'admin.delete_announcement':   'chip bg-clay/15 text-clay border border-clay/30',
};

function ActionChip({ action }: { action: string }) {
  const cls = ACTION_CHIPS[action] ?? 'chip chip-ink';
  return <span className={cls}>{action}</span>;
}

// ── Overview ──────────────────────────────────────────────────────────────

function OverviewView() {
  const [from, setFrom] = useState(() => nDaysAgo(29));
  const [to, setTo] = useState(() => today());
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [chartData, setChartData] = useState<DailyAnalyticsPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAdminStatsRange(from, to)
      .then((s) => { if (!cancelled) setStats(s); })
      .catch((err: Error) => { if (!cancelled) setError(err.message ?? 'Failed to load stats'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [from, to]);

  useEffect(() => {
    let cancelled = false;
    setChartLoading(true);
    getDailyAnalytics(from, to)
      .then((res) => { if (!cancelled) setChartData(res.series); })
      .catch(() => { if (!cancelled) setChartData([]); })
      .finally(() => { if (!cancelled) setChartLoading(false); });
    return () => { cancelled = true; };
  }, [from, to]);

  return (
    <div className="space-y-8">
      {/* Date range */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-ink-3">Range:</span>
        <input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} className={DATE_INPUT_CLASS} />
        <span className="text-ink-4">—</span>
        <input type="date" value={to} min={from} max={today()} onChange={(e) => setTo(e.target.value)} className={DATE_INPUT_CLASS} />
        <button
          type="button"
          onClick={() => { setFrom(nDaysAgo(29)); setTo(today()); }}
          className="btn btn-ghost btn-sm"
        >
          Last 30d
        </button>
        <button
          type="button"
          onClick={() => { setFrom(nDaysAgo(6)); setTo(today()); }}
          className="btn btn-ghost btn-sm"
        >
          Last 7d
        </button>
      </div>

      {error && <ErrorCard message={error} />}

      {loading ? (
        <PulseSkeleton rows={2} />
      ) : stats ? (
        <>
          <section>
            <h2 className="font-serif text-xl text-ink mb-4">Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={stats.total_users} icon={<Users size={16} />} big />
              <StatCard label="Active today" value={stats.active_today} icon={<TrendingUp size={16} />} big />
              <StatCard
                label="Active in range"
                value={stats.active_window ?? stats.active_7d ?? 0}
                icon={<TrendingUp size={16} />}
                big
              />
              <StatCard
                label="New in range"
                value={stats.new_users_window ?? stats.new_users_7d ?? 0}
                icon={<Users size={16} />}
                big
              />
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard label="Total Reads" value={stats.total_events} icon={<BookOpen size={16} />} />
              <StatCard label="Total Bookmarks" value={stats.total_bookmarks} icon={<BookmarkIcon size={16} />} />
            </div>
          </section>
        </>
      ) : null}

      {/* Daily chart */}
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">Daily activity</h2>
        {chartLoading ? <PulseSkeleton rows={1} /> : <DailyChart data={chartData} />}
      </section>

      {/* Top chapters */}
      {!loading && stats && (
        <section>
          <h2 className="font-serif text-xl text-ink mb-4">Top 10 Most-Read Chapters</h2>
          <div className="card-surface overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sand-2 text-ink-3">
                  <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">#</th>
                  <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">Chapter</th>
                  <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide hidden md:table-cell">Slug</th>
                  <th className="text-right px-4 py-3 font-medium meta uppercase tracking-wide">Visits</th>
                </tr>
              </thead>
              <tbody>
                {stats.top_docs.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-4">No reads recorded yet</td></tr>
                ) : (
                  stats.top_docs.map((d, i) => (
                    <tr key={d.doc_slug} className="border-t border-line hover:bg-sand-2/40 transition-colors">
                      <td className="px-4 py-3 text-ink-4 font-mono text-xs">{i + 1}</td>
                      <td className="px-4 py-3 text-ink-2">{d.doc_title || d.doc_slug}</td>
                      <td className="px-4 py-3 text-ink-4 font-mono text-xs hidden md:table-cell">
                        <span className="truncate inline-block max-w-[280px] align-middle">{d.doc_slug}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="chip chip-amber">{d.visit_count.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

// ── Users ─────────────────────────────────────────────────────────────────

const USERS_PER_PAGE = 20;

function UsersView({
  onSelect,
  refreshKey,
}: {
  onSelect: (id: number) => void;
  refreshKey: number;
}) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search.trim()); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAdminUsers({ page, limit: USERS_PER_PAGE, search: debouncedSearch || undefined })
      .then((res) => {
        if (cancelled) return;
        setUsers(res.users);
        setTotal(res.total);
      })
      .catch((err: Error) => { if (!cancelled) setError(err.message ?? 'Failed to load users'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page, debouncedSearch, refreshKey]);

  const totalPages = Math.max(1, Math.ceil(total / USERS_PER_PAGE));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-serif text-xl text-ink">
          Users <span className="text-ink-4 text-base">({total.toLocaleString()})</span>
        </h2>
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full pl-9 pr-3 h-10 rounded-[8px] bg-surface border border-line-2 text-sm text-ink-2 placeholder:text-ink-5 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber"
          />
        </div>
      </div>

      {error ? <ErrorCard message={error} /> : null}

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand-2 text-ink-3">
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">Last Seen</th>
                <th className="text-right px-4 py-3 font-medium meta uppercase tracking-wide">Reads</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-4">লোড হচ্ছে…</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-4">No users found</td></tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => onSelect(u.id)}
                    className="border-t border-line hover:bg-sand-2/60 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={u.name} src={u.avatar_url} size={32} />
                        <span className="text-ink-2 font-medium truncate">{u.name}</span>
                        {u.banned_at && (
                          <span className="chip bg-clay/15 text-clay border border-clay/30 text-[10px] shrink-0">
                            Banned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-3 hidden md:table-cell">
                      <span className="truncate inline-block max-w-[240px] align-middle">{u.email}</span>
                    </td>
                    <td className="px-4 py-3 text-ink-4">{formatRelativeTime(u.last_seen)}</td>
                    <td className="px-4 py-3 text-right text-ink-2 font-mono text-xs">
                      {u.event_count.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="meta">Page {page} of {totalPages}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || loading} className="btn btn-ghost btn-sm disabled:opacity-40">
            <ChevronLeft size={14} /> Prev
          </button>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages || loading} className="btn btn-ghost btn-sm disabled:opacity-40">
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── User Detail ───────────────────────────────────────────────────────────

function UserDetailView({
  userId,
  adminId,
  onBack,
  onUserDeleted,
}: {
  userId: number;
  adminId: number;
  onBack: () => void;
  onUserDeleted: () => void;
}) {
  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAdminUserDetail(userId)
      .then((d) => { if (!cancelled) setDetail(d); })
      .catch((err: Error) => { if (!cancelled) setError(err.message ?? 'Failed to load user'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [userId]);

  useEffect(() => { const cleanup = load(); return cleanup; }, [load]);

  const handleBan = async () => {
    if (!detail) return;
    const isBanned = !!detail.user.banned_at;
    const action = isBanned ? 'unban' : 'ban';
    if (!window.confirm(`Are you sure you want to ${action} "${detail.user.name}"?`)) return;
    setActionLoading(true);
    try {
      if (isBanned) await unbanUser(userId);
      else await banUser(userId);
      load();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!detail) return;
    if (!window.confirm(`Permanently delete "${detail.user.name}" and all their data? This cannot be undone.`)) return;
    setActionLoading(true);
    try {
      await deleteUser(userId);
      onUserDeleted();
    } catch (e) {
      alert((e as Error).message);
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="btn btn-ghost btn-sm" type="button">
        <ArrowLeft size={14} /> Back to users
      </button>

      {loading ? <PulseSkeleton rows={4} /> : error ? <ErrorCard message={error} /> : !detail ? <ErrorCard message="User not found" /> : (
        <UserDetailContent
          detail={detail}
          isSelf={detail.user.id === adminId}
          actionLoading={actionLoading}
          onBan={handleBan}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

function UserDetailContent({
  detail,
  isSelf,
  actionLoading,
  onBan,
  onDelete,
}: {
  detail: AdminUserDetail;
  isSelf: boolean;
  actionLoading: boolean;
  onBan: () => void;
  onDelete: () => void;
}) {
  const { user, bookmarks, recent_events, progress } = detail;
  const isBanned = !!user.banned_at;

  return (
    <>
      <div className="card-surface p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <Avatar name={user.name} src={user.avatar_url} size={64} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-serif text-2xl text-ink">{user.name}</h2>
                  {isBanned && <span className="chip bg-clay/15 text-clay border border-clay/30">Banned</span>}
                </div>
                <p className="text-ink-3 text-sm mt-0.5 truncate">{user.email}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 meta">
                  <span>Joined {formatDate(user.created_at)}</span>
                  <span>Last seen {formatRelativeTime(user.last_seen)}</span>
                </div>
              </div>

              {!isSelf && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onBan}
                    disabled={actionLoading}
                    className={cn(
                      'btn btn-sm gap-1.5 disabled:opacity-50',
                      isBanned
                        ? 'btn-ghost text-ink-blue border border-ink-blue/30 hover:bg-ink-blue/10'
                        : 'btn-ghost text-clay border border-clay/30 hover:bg-clay/10',
                    )}
                  >
                    {isBanned ? <ShieldOff size={13} /> : <Shield size={13} />}
                    {isBanned ? 'Unban' : 'Ban'}
                  </button>
                  <button
                    type="button"
                    onClick={onDelete}
                    disabled={actionLoading}
                    className="btn btn-sm btn-ghost text-clay border border-clay/30 hover:bg-clay/10 gap-1.5 disabled:opacity-50"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Reads" value={user.event_count} icon={<BookOpen size={16} />} />
        <StatCard label="Bookmarks" value={user.bookmark_count} icon={<BookmarkIcon size={16} />} />
        <StatCard label="In Progress" value={progress.length} icon={<TrendingUp size={16} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="card-surface p-5">
          <h3 className="font-serif text-lg text-ink mb-4">Recent Activity</h3>
          {recent_events.length === 0 ? (
            <p className="text-ink-4 text-sm">No reading events yet</p>
          ) : (
            <ul className="divide-y divide-line">
              {recent_events.slice(0, 20).map((ev, i) => (
                <li key={`${ev.doc_slug}-${ev.created_at}-${i}`} className="py-3 first:pt-0 last:pb-0">
                  <div className="text-sm text-ink-2 font-medium truncate">{ev.doc_title || ev.doc_slug}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="meta">{formatRelativeTime(ev.created_at)}</span>
                    <span className="meta font-mono">{formatDuration(ev.duration_seconds)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card-surface p-5">
          <h3 className="font-serif text-lg text-ink mb-4">Bookmarks</h3>
          {bookmarks.length === 0 ? (
            <p className="text-ink-4 text-sm">No bookmarks</p>
          ) : (
            <ul className="divide-y divide-line">
              {bookmarks.map((b) => (
                <li key={b.doc_slug} className="py-3 first:pt-0 last:pb-0">
                  <div className="text-sm text-ink-2 font-mono truncate">{b.doc_slug}</div>
                  <div className="meta mt-1">{formatRelativeTime(b.created_at)}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {progress.length > 0 && (
        <section>
          <h3 className="font-serif text-xl text-ink mb-4">Reading Progress</h3>
          <div className="card-surface p-5 space-y-4">
            {progress.map((p) => (
              <div key={p.doc_slug}>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-sm text-ink-2 font-mono truncate min-w-0">{p.doc_slug}</span>
                  <span className="text-xs text-ink-3 font-mono shrink-0">{p.percent}%</span>
                </div>
                <div className="h-2 rounded-full bg-sand-2 overflow-hidden">
                  <div
                    className="h-full bg-amber transition-[width]"
                    style={{ width: `${Math.min(100, Math.max(0, p.percent))}%` }}
                  />
                </div>
                <div className="meta mt-1">Updated {formatRelativeTime(p.updated_at)}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

// ── Audit Log ─────────────────────────────────────────────────────────────

const AUDIT_PER_PAGE = 50;

function AuditLogView() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAdminAuditLog({ page, limit: AUDIT_PER_PAGE })
      .then((res) => {
        if (cancelled) return;
        setEntries(res.entries);
        setTotal(res.total);
      })
      .catch((err: Error) => { if (!cancelled) setError(err.message ?? 'Failed to load'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / AUDIT_PER_PAGE));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl text-ink">
          Audit Log <span className="text-ink-4 text-base">({total.toLocaleString()})</span>
        </h2>
      </div>

      {error && <ErrorCard message={error} />}

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand-2 text-ink-3">
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">Time</th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">Actor</th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">Action</th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide hidden sm:table-cell">Target</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-4">লোড হচ্ছে…</td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-4">No audit entries yet</td></tr>
              ) : (
                entries.map((e) => (
                  <tr key={e.id} className="border-t border-line hover:bg-sand-2/40 transition-colors">
                    <td className="px-4 py-3 text-ink-4 text-xs font-mono whitespace-nowrap">
                      {formatRelativeTime(e.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-ink-2 text-[13px] font-medium">{e.actor_name ?? '—'}</div>
                      <div className="text-ink-4 text-xs font-mono">{e.actor_email ?? 'deleted'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <ActionChip action={e.action} />
                    </td>
                    <td className="px-4 py-3 text-ink-4 text-xs font-mono hidden sm:table-cell">
                      <span className="truncate inline-block max-w-[200px] align-middle">
                        {e.target ?? '—'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="meta">Page {page} of {totalPages}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || loading} className="btn btn-ghost btn-sm disabled:opacity-40">
            <ChevronLeft size={14} /> Prev
          </button>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages || loading} className="btn btn-ghost btn-sm disabled:opacity-40">
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Announcements ─────────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, string> = { info: 'Info', warn: 'Warning', success: 'Success' };
const LEVEL_CHIP: Record<string, string> = {
  info: 'chip chip-amber',
  warn: 'chip bg-clay/15 text-clay border border-clay/30',
  success: 'chip bg-sage/15 text-sage border border-sage/30',
};

function AnnouncementsView() {
  const [items, setItems] = useState<AnnouncementAdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newLevel, setNewLevel] = useState<'info' | 'warn' | 'success'>('info');
  const [newEndsAt, setNewEndsAt] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listAdminAnnouncements()
      .then((rows) => { if (!cancelled) setItems(rows); })
      .catch((err: Error) => { if (!cancelled) setError(err.message ?? 'Failed to load'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => { const cleanup = load(); return cleanup; }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await createAnnouncement({
        title: newTitle,
        body: newBody,
        level: newLevel,
        ...(newEndsAt ? { ends_at: newEndsAt } : {}),
      });
      setNewTitle(''); setNewBody(''); setNewLevel('info'); setNewEndsAt('');
      setShowForm(false);
      load();
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (row: AnnouncementAdminRow) => {
    const newActive = row.is_active === 0;
    try {
      await updateAnnouncement(row.id, { is_active: newActive });
      load();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (row: AnnouncementAdminRow) => {
    if (!window.confirm(`Delete announcement "${row.title}"?`)) return;
    try {
      await deleteAnnouncement(row.id);
      load();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl text-ink">Announcements</h2>
        <button type="button" onClick={() => setShowForm((v) => !v)} className="btn btn-sm btn-amber gap-1.5">
          <Megaphone size={13} />
          {showForm ? 'Cancel' : 'New announcement'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card-surface p-5 space-y-4">
          <h3 className="font-serif text-lg text-ink">New announcement</h3>

          {formError && <p className="text-sm text-clay">{formError}</p>}

          <div>
            <label className="meta block mb-1.5">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              maxLength={200}
              required
              placeholder="Short headline…"
              className="w-full h-9 px-3 rounded-[8px] bg-surface border border-line-2 text-sm text-ink-2 placeholder:text-ink-5 focus:outline-none focus:ring-2 focus:ring-amber/40"
            />
          </div>

          <div>
            <label className="meta block mb-1.5">Body</label>
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              maxLength={2000}
              required
              rows={3}
              placeholder="Full announcement message…"
              className="w-full px-3 py-2 rounded-[8px] bg-surface border border-line-2 text-sm text-ink-2 placeholder:text-ink-5 focus:outline-none focus:ring-2 focus:ring-amber/40 resize-y"
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <label className="meta block mb-1.5">Level</label>
              <div className="flex gap-3">
                {(['info', 'warn', 'success'] as const).map((lvl) => (
                  <label key={lvl} className="flex items-center gap-1.5 text-sm text-ink-2 cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      value={lvl}
                      checked={newLevel === lvl}
                      onChange={() => setNewLevel(lvl)}
                      className="accent-amber-700"
                    />
                    {LEVEL_LABELS[lvl]}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="meta block mb-1.5">Expires (optional)</label>
              <input
                type="date"
                value={newEndsAt}
                min={today()}
                onChange={(e) => setNewEndsAt(e.target.value)}
                className={DATE_INPUT_CLASS}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={submitting} className="btn btn-sm btn-amber disabled:opacity-50">
              {submitting ? 'Creating…' : 'Create'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-sm btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && <ErrorCard message={error} />}

      {loading ? (
        <PulseSkeleton rows={3} />
      ) : items.length === 0 ? (
        <div className="card-surface p-8 text-center text-ink-4 text-sm">
          No announcements yet. Create one to show a banner to all users.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((row) => (
            <li key={row.id} className="card-surface bg-surface-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={LEVEL_CHIP[row.level]}>{LEVEL_LABELS[row.level]}</span>
                    <span className={cn('chip', row.is_active ? 'chip-outline text-sage' : 'chip-outline text-ink-4')}>
                      {row.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="meta text-[11px]">by {row.creator_name ?? 'deleted user'}</span>
                  </div>
                  <div className="font-medium text-ink text-[14px]">{row.title}</div>
                  <p className="text-[13px] text-ink-3 mt-1 line-clamp-2">{row.body}</p>
                  <div className="meta text-[11px] mt-2">
                    From {formatDate(row.starts_at)}
                    {row.ends_at ? ` → ${formatDate(row.ends_at)}` : ' (no expiry)'}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(row)}
                    className={cn(
                      'btn btn-sm btn-ghost text-[12px]',
                      row.is_active
                        ? 'text-ink-3 border border-line hover:bg-sand-2'
                        : 'text-sage border border-sage/30 hover:bg-sage/10',
                    )}
                  >
                    {row.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(row)}
                    className="btn btn-sm btn-ghost text-clay border border-clay/30 hover:bg-clay/10"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Top-level page ────────────────────────────────────────────────────────

export function AdminPage() {
  const [view, setView] = useState<View>('overview');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [adminId, setAdminId] = useState<number>(0);
  const [usersRefreshKey, setUsersRefreshKey] = useState(0);

  useEffect(() => {
    getMe().then((u) => setAdminId(Number(u.id))).catch(() => {});
  }, []);

  const handleSelectUser = useCallback((id: number) => {
    setSelectedUserId(id);
    setView('user-detail');
  }, []);

  const handleBackToUsers = useCallback(() => {
    setSelectedUserId(null);
    setView('users');
  }, []);

  const handleUserDeleted = useCallback(() => {
    setSelectedUserId(null);
    setUsersRefreshKey((k) => k + 1);
    setView('users');
  }, []);

  const tabs = useMemo(
    () => [
      { id: 'overview' as const, label: 'Overview' },
      { id: 'users' as const, label: 'Users' },
      { id: 'audit-log' as const, label: 'Audit Log' },
      { id: 'announcements' as const, label: 'Announcements' },
    ],
    [],
  );

  return (
    <div className="min-h-screen">
      <div className="bg-ink text-[hsl(var(--bg))] border-b border-line-2">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="chip chip-amber uppercase tracking-wide">Admin</span>
            <h1 className="font-serif text-2xl"><span className="italic">Porhi</span> Console</h1>
          </div>
          <nav className="flex items-center gap-1 flex-wrap">
            {tabs.map((t) => {
              const active = view === t.id || (t.id === 'users' && view === 'user-detail');
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setView(t.id);
                    if (t.id !== 'users') setSelectedUserId(null);
                  }}
                  className={cn(
                    'px-4 h-9 rounded-[8px] text-sm transition-colors',
                    active
                      ? 'bg-[hsl(var(--bg))]/10 text-[hsl(var(--bg))]'
                      : 'text-[hsl(var(--bg))]/70 hover:text-[hsl(var(--bg))] hover:bg-[hsl(var(--bg))]/5',
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {view === 'overview' && <OverviewView />}
        {view === 'users' && (
          <UsersView onSelect={handleSelectUser} refreshKey={usersRefreshKey} />
        )}
        {view === 'user-detail' && selectedUserId !== null && (
          <UserDetailView
            userId={selectedUserId}
            adminId={adminId}
            onBack={handleBackToUsers}
            onUserDeleted={handleUserDeleted}
          />
        )}
        {view === 'audit-log' && <AuditLogView />}
        {view === 'announcements' && <AnnouncementsView />}
      </div>
    </div>
  );
}
