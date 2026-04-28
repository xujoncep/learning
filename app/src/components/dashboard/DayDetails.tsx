import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { getDayEvents, type DayEvent } from '@/lib/api';
import { getApiToken } from '@/lib/auth';
import { findDoc, getSectionMeta } from '@/lib/content';

interface Props {
  date: string | null;
}

function formatDateLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso + (iso.endsWith('Z') ? '' : 'Z'));
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function DayDetails({ date }: Props) {
  const [events, setEvents] = useState<DayEvent[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) {
      setEvents(null);
      return;
    }
    if (!getApiToken()) {
      setEvents([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getDayEvents(date)
      .then((items) => {
        if (cancelled) return;
        setEvents(items);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message ?? 'Failed to load');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date]);

  if (!date) {
    return (
      <div className="card-surface bg-surface-2 p-5">
        <div className="meta text-[11px] uppercase tracking-[0.04em]">Day summary</div>
        <p className="text-[13px] text-ink-3 mt-3 leading-relaxed">
          Calendar-এ একটা day select করো — সেদিন কোন chapter পড়েছিলে দেখা যাবে।
        </p>
      </div>
    );
  }

  return (
    <div className="card-surface bg-surface-2 p-5">
      <div className="meta text-[11px] uppercase tracking-[0.04em]">Day summary</div>
      <h3 className="font-serif text-[18px] text-ink mt-0.5 tracking-tight">
        {formatDateLabel(date)}
      </h3>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-[13px] text-ink-3">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
        </div>
      )}

      {error && <div className="mt-4 text-[13px] text-clay">{error}</div>}

      {!loading && !error && events && events.length === 0 && (
        <p className="text-[13px] text-ink-3 mt-3 leading-relaxed">
          এই day-তে কোনো chapter read করা হয়নি।
        </p>
      )}

      {!loading && !error && events && events.length > 0 && (
        <>
          <div className="mt-2 text-[12px] text-ink-4">
            {events.length} chapter{events.length === 1 ? '' : 's'} ·{' '}
            {events.reduce((sum, e) => sum + e.visits, 0)} total visit
            {events.reduce((sum, e) => sum + e.visits, 0) === 1 ? '' : 's'}
          </div>
          <ul className="mt-4 space-y-2.5">
            {events.map((e) => {
              const doc = findDoc(e.doc_slug);
              const sectionMeta = getSectionMeta(e.section_id);
              const path = doc?.path ?? `/docs/${e.doc_slug}`;
              return (
                <li key={`${e.doc_slug}-${e.first_seen}`}>
                  <Link
                    to={path}
                    className="group flex items-start gap-3 px-3 py-2.5 -mx-3 rounded-md hover:bg-sand-2 transition-colors"
                  >
                    <div className="h-7 w-7 shrink-0 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center text-[13px]">
                      {sectionMeta?.icon ?? '📄'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] text-ink leading-snug font-medium group-hover:text-amber-700 transition-colors">
                        {e.doc_title}
                      </div>
                      <div className="text-[11.5px] text-ink-4 mt-0.5 flex items-center gap-1.5">
                        <span>{sectionMeta?.title ?? e.section_id}</span>
                        <span>·</span>
                        <span>{formatTime(e.last_seen)}</span>
                        {e.visits > 1 && (
                          <>
                            <span>·</span>
                            <span>{e.visits} visits</span>
                          </>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-ink-4 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 pt-3 border-t border-line border-dashed text-[11.5px] text-ink-4 inline-flex items-center gap-1.5">
            <BookOpen className="h-3 w-3" /> Click any item to reopen it
          </div>
        </>
      )}
    </div>
  );
}
