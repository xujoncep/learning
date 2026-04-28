import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, BookOpen, Flame, Loader2, Timer } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SeoHead } from '@/components/layout/SeoHead';
import { useAuth, avatarColor, initials, getApiToken } from '@/lib/auth';
import { findDoc, getSectionMeta } from '@/lib/content';
import { getReadingSummary, type ReadingSummary } from '@/lib/api';
import { Calendar } from '@/components/dashboard/Calendar';
import { DayDetails } from '@/components/dashboard/DayDetails';

function formatActiveTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remMin = minutes - hours * 60;
  return remMin > 0 ? `${hours}h ${remMin}m` : `${hours}h`;
}

function formatRelativeTime(iso: string): string {
  const then = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'));
  const diffMs = Date.now() - then.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function DashboardPage() {
  const { displayName } = useAuth();
  const color = avatarColor(displayName);
  const avatar = initials(displayName);

  const [summary, setSummary] = useState<ReadingSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    () => new Date().toISOString().slice(0, 10),
  );

  // Tracks whether the user has a real API token (Google OAuth) vs only a
  // local-only session (the internal shared-password path used for testing).
  // Without a token there's nothing meaningful to fetch.
  const hasApiToken = getApiToken() !== null;

  useEffect(() => {
    if (!hasApiToken) {
      setSummaryLoading(false);
      return;
    }
    let cancelled = false;
    setSummaryLoading(true);
    setSummaryError(null);
    getReadingSummary()
      .then((s) => {
        if (cancelled) return;
        setSummary(s);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setSummaryError(err.message ?? 'Failed to load');
      })
      .finally(() => {
        if (!cancelled) setSummaryLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hasApiToken]);

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const recent = summary?.recent ?? [];
  const resumeTarget = recent[0];
  const resumePath =
    resumeTarget && findDoc(resumeTarget.doc_slug)?.path
      ? findDoc(resumeTarget.doc_slug)!.path
      : resumeTarget
        ? `/docs/${resumeTarget.doc_slug}`
        : '/courses';

  // Stat tile values — show "—" while loading or if there's no data yet,
  // otherwise the real backend numbers.
  const statValue = (n: number | undefined | null): string => {
    if (summaryLoading) return '—';
    if (n === undefined || n === null) return '—';
    return String(n);
  };

  const activeTimeValue =
    summaryLoading || summary?.total_seconds_30 == null
      ? '—'
      : formatActiveTime(summary.total_seconds_30);

  return (
    <Layout showSearch>
      <SeoHead
        title={`Dashboard · ${displayName ?? 'Welcome'} · Porhi`}
        description="Your reading activity, calendar, and day-by-day summary."
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 md:mb-10">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 min-w-0">
            <div
              aria-hidden
              className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-full text-surface font-serif text-base sm:text-xl font-semibold flex items-center justify-center shadow-soft-2"
              style={{ background: color }}
            >
              {avatar}
            </div>
            <div className="min-w-0">
              <div className="meta">{dateStr}</div>
              <h1 className="font-serif text-[26px] sm:text-3xl md:text-[42px] leading-[1.1] md:leading-[1.05] tracking-tight text-ink mt-1 break-words">
                Welcome back, <em className="italic text-amber-700">{displayName || 'friend'}</em>.
              </h1>
              <p className="text-[13px] sm:text-[14px] text-ink-3 mt-2">
                {recent.length > 0
                  ? 'নিচে তোমার activity আর সবশেষ পড়া chapter গুলো।'
                  : 'একটা course বেছে নাও — তোমার reading activity এখানে track হবে।'}
              </p>
            </div>
          </div>

          <Link
            to={resumePath}
            className="btn btn-lg btn-amber shrink-0 self-start md:self-auto"
          >
            {resumeTarget ? (
              <>
                Resume reading <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Start a course <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Link>
        </div>

        {!hasApiToken && (
          <div className="mb-6 p-4 rounded-md border border-amber/40 bg-amber-50 text-[13.5px] text-ink-2 leading-relaxed">
            <span className="font-medium text-amber-700">Activity tracking off.</span>{' '}
            Calendar আর reading history দেখতে Google দিয়ে sign in করো —{' '}
            <Link to="/login" className="text-amber-700 underline hover:no-underline">
              Sign in
            </Link>
            .
          </div>
        )}

        {hasApiToken && summaryError && (
          <div className="mb-6 p-3 rounded-md bg-clay/10 text-clay text-[13px]">
            Failed to load activity: {summaryError}
          </div>
        )}

        {/* Stats row — real values from /me/summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            {
              icon: <Flame className="h-4 w-4" />,
              tone: 'text-amber-700',
              label: 'Current streak',
              value: statValue(summary?.current_streak),
              sub: 'days in a row',
            },
            {
              icon: <Timer className="h-4 w-4" />,
              tone: 'text-ink-blue',
              label: 'Active time',
              value: activeTimeValue,
              sub: 'last 30 days',
            },
            {
              icon: <BookOpen className="h-4 w-4" />,
              tone: 'text-sage',
              label: 'Chapters read',
              value: statValue(summary?.distinct_chapters),
              sub: 'unique',
            },
            {
              icon: <Bookmark className="h-4 w-4" />,
              tone: 'text-clay',
              label: 'Active days',
              value: statValue(summary?.active_days_30),
              sub: 'last 30 days',
            },
          ].map((s) => (
            <div key={s.label} className="card-surface bg-surface-2 p-3 md:p-[18px]">
              <div className={`inline-flex items-center gap-2 ${s.tone}`}>
                {s.icon}
                <span className="meta text-ink-4 text-[10.5px] sm:text-[11px]">{s.label}</span>
              </div>
              <div className="font-serif text-[24px] sm:text-[28px] text-ink mt-2 tracking-tight leading-none">
                {s.value}
              </div>
              <div className="meta text-[11px] sm:text-[11.5px] mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Calendar + DayDetails + Recent reads */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 mb-8">
          {/* MAIN — calendar */}
          <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

          {/* RIGHT — day details */}
          <DayDetails date={selectedDate} />
        </div>

        {/* Recent reads — replaces the old hardcoded "Continue learning" */}
        <div className="card-surface bg-surface-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="meta text-[11px] uppercase tracking-[0.04em]">Recent</div>
              <h2 className="font-serif text-[20px] text-ink mt-0.5 tracking-tight">
                Recently opened chapters
              </h2>
            </div>
            <Link to="/courses" className="text-[12.5px] text-ink-3 hover:text-ink">
              All courses →
            </Link>
          </div>

          {summaryLoading && (
            <div className="flex items-center gap-2 text-[13px] text-ink-3 py-6 justify-center">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
            </div>
          )}

          {!summaryLoading && recent.length === 0 && (
            <div className="text-[13px] text-ink-3 py-6 text-center">
              এখনো কোনো chapter read হয়নি — কোনো একটা course থেকে শুরু করো।
            </div>
          )}

          {!summaryLoading && recent.length > 0 && (
            <ul className="grid md:grid-cols-2 gap-2">
              {recent.map((r) => {
                const doc = findDoc(r.doc_slug);
                const meta = getSectionMeta(r.section_id);
                const path = doc?.path ?? `/docs/${r.doc_slug}`;
                return (
                  <li key={`${r.doc_slug}-${r.created_at}`}>
                    <Link
                      to={path}
                      className="group flex items-start gap-3 p-3 rounded-md hover:bg-sand-2 transition-colors"
                    >
                      <div className="h-9 w-9 shrink-0 rounded-md bg-amber-50 flex items-center justify-center text-[15px]">
                        {meta?.icon ?? '📄'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] text-ink leading-snug font-medium truncate group-hover:text-amber-700 transition-colors">
                          {r.doc_title}
                        </div>
                        <div className="text-[11.5px] text-ink-4 mt-0.5 flex items-center gap-1.5">
                          <span>{meta?.title ?? r.section_id}</span>
                          <span>·</span>
                          <span>{formatRelativeTime(r.created_at)}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-ink-4 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
