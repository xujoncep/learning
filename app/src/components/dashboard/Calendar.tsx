import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getCalendarMonth, type DayCount } from '@/lib/api';
import { getApiToken } from '@/lib/auth';
import { cn } from '@/lib/utils';

interface Props {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function startOfMonth(year: number, month: number): Date {
  return new Date(Date.UTC(year, month, 1));
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Count → palette bucket (none / light / medium / strong / heavy).
// Tailwind palette only has amber-50/100/600/700, so we lean on opacity
// modifiers to get the in-between steps without yak-shaving the design tokens.
function intensityClass(count: number): string {
  if (count === 0) return 'bg-sand-2 text-ink-3';
  if (count === 1) return 'bg-amber-50 text-ink';
  if (count <= 2) return 'bg-amber-100 text-ink';
  if (count <= 4) return 'bg-amber/70 text-ink';
  return 'bg-amber-700 text-white';
}

export function Calendar({ selectedDate, onSelectDate }: Props) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState<{ year: number; month: number }>({
    year: today.getUTCFullYear(),
    month: today.getUTCMonth(),
  });
  const [data, setData] = useState<Record<string, { count: number; seconds: number }>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The grid renders 6 weeks (42 cells) starting on the Sunday of the week
  // containing the 1st — covers every layout including February in a
  // common year so `cells.length` is constant.
  const grid = useMemo(() => {
    const first = startOfMonth(cursor.year, cursor.month);
    const startDay = first.getUTCDay(); // 0..6, Sun=0
    const start = new Date(first);
    start.setUTCDate(start.getUTCDate() - startDay);
    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setUTCDate(d.getUTCDate() + i);
      cells.push(d);
    }
    return cells;
  }, [cursor.year, cursor.month]);

  useEffect(() => {
    // Skip fetch when the user has no API token (internal shared-password
    // session). The dashboard shows a separate "sign in for tracking" CTA.
    if (!getApiToken()) {
      setData({});
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const from = isoDate(grid[0]);
    const lastCell = grid[grid.length - 1];
    const exclusiveTo = new Date(lastCell);
    exclusiveTo.setUTCDate(exclusiveTo.getUTCDate() + 1);
    const to = isoDate(exclusiveTo);

    getCalendarMonth(from, to)
      .then((days: DayCount[]) => {
        if (cancelled) return;
        const map: Record<string, { count: number; seconds: number }> = {};
        for (const d of days) map[d.date] = { count: d.count, seconds: d.total_seconds };
        setData(map);
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
  }, [grid]);

  const monthLabel = new Date(Date.UTC(cursor.year, cursor.month, 1))
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

  const todayIso = isoDate(today);

  return (
    <div className="card-surface bg-surface-2 p-3 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="meta text-[11px] uppercase tracking-[0.04em]">Activity</div>
          <h3 className="font-serif text-[20px] text-ink mt-0.5 tracking-tight">{monthLabel}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() =>
              setCursor((c) =>
                c.month === 0
                  ? { year: c.year - 1, month: 11 }
                  : { year: c.year, month: c.month - 1 },
              )
            }
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-3 hover:bg-sand-2 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() =>
              setCursor((c) =>
                c.month === 11
                  ? { year: c.year + 1, month: 0 }
                  : { year: c.year, month: c.month + 1 },
              )
            }
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-3 hover:bg-sand-2 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[10.5px] text-ink-4 mb-1.5">
        {DAY_LABELS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {grid.map((d) => {
          const iso = isoDate(d);
          const entry = data[iso];
          const count = entry?.count ?? 0;
          const seconds = entry?.seconds ?? 0;
          const inMonth = d.getUTCMonth() === cursor.month;
          const isToday = iso === todayIso;
          const isSelected = iso === selectedDate;

          const minutes = Math.round(seconds / 60);
          const tooltip =
            count === 0
              ? 'No reads'
              : `${count} visit${count === 1 ? '' : 's'}${minutes > 0 ? ` · ${minutes} min` : ''}`;

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelectDate(iso)}
              className={cn(
                'aspect-square rounded-md text-[11px] sm:text-[12px] font-medium flex flex-col items-center justify-center transition-all',
                'hover:ring-2 hover:ring-amber/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber',
                intensityClass(count),
                !inMonth && 'opacity-35',
                isToday && 'ring-2 ring-ink/70',
                isSelected && 'ring-2 ring-amber-700',
              )}
              title={tooltip}
            >
              <span className="leading-none">{d.getUTCDate()}</span>
              {count > 0 && (
                <span className="text-[9px] sm:text-[9.5px] mt-0.5 leading-none opacity-80">
                  {minutes > 0 ? `${minutes}m` : count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-ink-4">
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <span className="h-3 w-3 rounded-sm bg-sand-2 border border-line" />
          <span className="h-3 w-3 rounded-sm bg-amber-50" />
          <span className="h-3 w-3 rounded-sm bg-amber-100" />
          <span className="h-3 w-3 rounded-sm bg-amber/70" />
          <span className="h-3 w-3 rounded-sm bg-amber-700" />
          <span>More</span>
        </div>
        {loading && (
          <span className="inline-flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> loading
          </span>
        )}
        {error && <span className="text-clay">{error}</span>}
      </div>
    </div>
  );
}
