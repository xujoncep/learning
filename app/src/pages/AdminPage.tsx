import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookmarkIcon,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';
import { avatarColor, initials } from '@/lib/auth';
import {
  getAdminStats,
  getAdminUserDetail,
  getAdminUsers,
  type AdminStats,
  type AdminUserDetail,
  type AdminUserRow,
} from '@/lib/api';
import { cn } from '@/lib/utils';

type View = 'overview' | 'users' | 'user-detail';

function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  const then = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'));
  const diffMs = Date.now() - then.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  const diffWk = Math.floor(diffDay / 7);
  if (diffWk < 4) return `${diffWk} week${diffWk === 1 ? '' : 's'} ago`;
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
      style={{
        width: px,
        height: px,
        background: avatarColor(name),
        fontSize: Math.round(size * 0.4),
      }}
    >
      {initials(name)}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon,
  big = false,
}: {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  big?: boolean;
}) {
  return (
    <div className="card-surface p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="meta uppercase tracking-wide">{label}</span>
        {icon ? <span className="text-ink-4">{icon}</span> : null}
      </div>
      <div
        className={cn(
          'font-serif text-ink',
          big ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl',
        )}
      >
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
    <div className="card-surface p-5 border-danger/30 bg-danger/5">
      <div className="text-sm text-ink-2">
        <span className="font-medium text-[hsl(var(--danger))]">Error: </span>
        {message}
      </div>
    </div>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────

function OverviewView() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAdminStats()
      .then((s) => {
        if (!cancelled) setStats(s);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message ?? 'Failed to load stats');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <PulseSkeleton rows={2} />
        <PulseSkeleton rows={3} />
      </div>
    );
  }

  if (error) return <ErrorCard message={error} />;
  if (!stats) return <ErrorCard message="No data" />;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Users"
            value={stats.total_users}
            icon={<Users size={16} />}
            big
          />
          <StatCard
            label="Active 7d"
            value={stats.active_7d}
            icon={<TrendingUp size={16} />}
            big
          />
          <StatCard
            label="Total Reads"
            value={stats.total_events}
            icon={<BookOpen size={16} />}
            big
          />
          <StatCard
            label="Total Bookmarks"
            value={stats.total_bookmarks}
            icon={<BookmarkIcon size={16} />}
            big
          />
        </div>
      </section>

      <section>
        <h3 className="font-serif text-base text-ink-3 mb-3">Engagement</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Active Today" value={stats.active_today} />
          <StatCard label="Active 30d" value={stats.active_30d} />
          <StatCard label="New This Week" value={stats.new_users_7d} />
        </div>
      </section>

      <section>
        <h3 className="font-serif text-xl text-ink mb-4">Top 10 Most-Read Chapters</h3>
        <div className="card-surface overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand-2 text-ink-3">
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">#</th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">
                  Chapter
                </th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide hidden md:table-cell">
                  Slug
                </th>
                <th className="text-right px-4 py-3 font-medium meta uppercase tracking-wide">
                  Visits
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.top_docs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-ink-4">
                    No reads recorded yet
                  </td>
                </tr>
              ) : (
                stats.top_docs.map((d, i) => (
                  <tr
                    key={d.doc_slug}
                    className="border-t border-line hover:bg-sand-2/40 transition-colors"
                  >
                    <td className="px-4 py-3 text-ink-4 font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-3 text-ink-2">{d.doc_title || d.doc_slug}</td>
                    <td className="px-4 py-3 text-ink-4 font-mono text-xs hidden md:table-cell">
                      <span className="truncate inline-block max-w-[280px] align-middle">
                        {d.doc_slug}
                      </span>
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
    </div>
  );
}

// ── Users ─────────────────────────────────────────────────────────────────

const USERS_PER_PAGE = 20;

function UsersView({ onSelect }: { onSelect: (id: number) => void }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const fetchUsers = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAdminUsers({ page, limit: USERS_PER_PAGE, search: debouncedSearch || undefined })
      .then((res) => {
        if (cancelled) return;
        setUsers(res.users);
        setTotal(res.total);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message ?? 'Failed to load users');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch]);

  useEffect(() => {
    const cleanup = fetchUsers();
    return cleanup;
  }, [fetchUsers]);

  const totalPages = Math.max(1, Math.ceil(total / USERS_PER_PAGE));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-serif text-xl text-ink">
          Users <span className="text-ink-4 text-base">({total.toLocaleString()})</span>
        </h2>
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-4 pointer-events-none"
          />
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
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide hidden lg:table-cell">
                  Joined
                </th>
                <th className="text-left px-4 py-3 font-medium meta uppercase tracking-wide">
                  Last Seen
                </th>
                <th className="text-right px-4 py-3 font-medium meta uppercase tracking-wide">
                  Reads
                </th>
                <th className="text-right px-4 py-3 font-medium meta uppercase tracking-wide hidden sm:table-cell">
                  Bookmarks
                </th>
                <th className="text-right px-4 py-3 font-medium meta uppercase tracking-wide hidden sm:table-cell">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-ink-4">
                    লোড হচ্ছে…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-ink-4">
                    No users found
                  </td>
                </tr>
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
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-3 hidden md:table-cell">
                      <span className="truncate inline-block max-w-[240px] align-middle">
                        {u.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-4 hidden lg:table-cell">
                      {formatDate(u.created_at)}
                    </td>
                    <td className="px-4 py-3 text-ink-4">{formatRelativeTime(u.last_seen)}</td>
                    <td className="px-4 py-3 text-right text-ink-2 font-mono text-xs">
                      {u.event_count.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-ink-2 font-mono text-xs hidden sm:table-cell">
                      {u.bookmark_count.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-ink-2 font-mono text-xs hidden sm:table-cell">
                      {u.progress_count.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="meta">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="btn btn-ghost btn-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
            className="btn btn-ghost btn-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── User Detail ───────────────────────────────────────────────────────────

function UserDetailView({ userId, onBack }: { userId: number; onBack: () => void }) {
  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAdminUserDetail(userId)
      .then((d) => {
        if (!cancelled) setDetail(d);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message ?? 'Failed to load user');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="btn btn-ghost btn-sm"
        type="button"
      >
        <ArrowLeft size={14} /> Back to users
      </button>

      {loading ? (
        <PulseSkeleton rows={4} />
      ) : error ? (
        <ErrorCard message={error} />
      ) : !detail ? (
        <ErrorCard message="User not found" />
      ) : (
        <UserDetailContent detail={detail} />
      )}
    </div>
  );
}

function UserDetailContent({ detail }: { detail: AdminUserDetail }) {
  const { user, bookmarks, recent_events, progress } = detail;

  return (
    <>
      <div className="card-surface p-6">
        <div className="flex items-start gap-4">
          <Avatar name={user.name} src={user.avatar_url} size={64} />
          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-2xl text-ink">{user.name}</h2>
            <p className="text-ink-3 text-sm mt-0.5 truncate">{user.email}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 meta">
              <span>Joined {formatDate(user.created_at)}</span>
              <span>Last seen {formatRelativeTime(user.last_seen)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Reads"
          value={user.event_count}
          icon={<BookOpen size={16} />}
        />
        <StatCard
          label="Bookmarks"
          value={user.bookmark_count}
          icon={<BookmarkIcon size={16} />}
        />
        <StatCard
          label="In Progress"
          value={user.progress_count}
          icon={<TrendingUp size={16} />}
        />
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
                  <div className="text-sm text-ink-2 font-medium truncate">
                    {ev.doc_title || ev.doc_slug}
                  </div>
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

      <section>
        <h3 className="font-serif text-xl text-ink mb-4">Reading Progress</h3>
        {progress.length === 0 ? (
          <div className="card-surface p-5">
            <p className="text-ink-4 text-sm">No chapters in progress yet</p>
          </div>
        ) : (
          <div className="card-surface p-5 space-y-4">
            {progress.map((p) => (
              <div key={p.doc_slug}>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-sm text-ink-2 font-mono truncate min-w-0">
                    {p.doc_slug}
                  </span>
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
        )}
      </section>
    </>
  );
}

// ── Top-level page ────────────────────────────────────────────────────────

export function AdminPage() {
  const [view, setView] = useState<View>('overview');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleSelectUser = useCallback((id: number) => {
    setSelectedUserId(id);
    setView('user-detail');
  }, []);

  const handleBackToUsers = useCallback(() => {
    setSelectedUserId(null);
    setView('users');
  }, []);

  const tabs = useMemo(
    () => [
      { id: 'overview' as const, label: 'Overview' },
      { id: 'users' as const, label: 'Users' },
    ],
    [],
  );

  return (
    <div className="min-h-screen">
      <div className="bg-ink text-[hsl(var(--bg))] border-b border-line-2">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="chip chip-amber uppercase tracking-wide">Admin</span>
            <h1 className="font-serif text-2xl">
              <span className="italic">Porhi</span> Console
            </h1>
          </div>
          <nav className="flex items-center gap-1">
            {tabs.map((t) => {
              const active =
                view === t.id || (t.id === 'users' && view === 'user-detail');
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setView(t.id);
                    if (t.id === 'users') setSelectedUserId(null);
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
        {view === 'users' && <UsersView onSelect={handleSelectUser} />}
        {view === 'user-detail' && selectedUserId !== null && (
          <UserDetailView userId={selectedUserId} onBack={handleBackToUsers} />
        )}
      </div>
    </div>
  );
}
