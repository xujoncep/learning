import { useMemo } from 'react';
import type { DailyAnalyticsPoint } from '@/lib/api';

interface DailyChartProps {
  data: DailyAnalyticsPoint[];
  height?: number;
}

const LEGEND: Array<{
  key: keyof Pick<DailyAnalyticsPoint, 'events' | 'distinct_users' | 'new_users'>;
  label: string;
  color: string;
}> = [
  { key: 'events', label: 'Events', color: 'hsl(var(--amber-700))' },
  { key: 'distinct_users', label: 'Active users', color: 'hsl(var(--ink-blue))' },
  { key: 'new_users', label: 'New users', color: 'hsl(var(--sage))' },
];

function formatDayLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function DailyChart({ data, height = 220 }: DailyChartProps) {
  const { maxValue, barWidth, gap, contentWidth } = useMemo(() => {
    const localMax = Math.max(
      1,
      ...data.flatMap((d) => [d.events, d.distinct_users, d.new_users]),
    );
    const innerGap = 6;
    const groupWidth = 28;
    return {
      maxValue: localMax,
      barWidth: (groupWidth - innerGap * 2) / 3,
      gap: innerGap,
      contentWidth: data.length * groupWidth,
    };
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="card-surface p-6 text-center text-ink-4 text-sm">
        No analytics data for this range.
      </div>
    );
  }

  const padTop = 12;
  const padBottom = 28;
  const chartHeight = height - padTop - padBottom;
  const groupWidth = 28;

  // Show every Nth label so things stay readable across long ranges
  const labelStride = Math.max(1, Math.ceil(data.length / 12));

  return (
    <div className="card-surface p-5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
        {LEGEND.map((l) => (
          <div key={l.key} className="flex items-center gap-2 meta">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: l.color }}
            />
            <span>{l.label}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          width={Math.max(contentWidth, 320)}
          height={height}
          role="img"
          aria-label="Daily analytics chart"
          className="block"
        >
          {/* Horizontal gridlines (4 quarter ticks). */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = padTop + chartHeight * (1 - t);
            return (
              <g key={t}>
                <line
                  x1={0}
                  x2={Math.max(contentWidth, 320)}
                  y1={y}
                  y2={y}
                  stroke="hsl(var(--line))"
                  strokeDasharray={t === 0 ? undefined : '2 3'}
                />
                <text
                  x={4}
                  y={y - 2}
                  fontSize={10}
                  fill="hsl(var(--ink-4))"
                  fontFamily="ui-monospace, monospace"
                >
                  {Math.round(maxValue * t).toLocaleString()}
                </text>
              </g>
            );
          })}

          {data.map((d, i) => {
            const groupX = i * groupWidth;
            const values: Array<{ key: string; v: number; color: string }> = [
              { key: 'events', v: d.events, color: LEGEND[0].color },
              { key: 'distinct_users', v: d.distinct_users, color: LEGEND[1].color },
              { key: 'new_users', v: d.new_users, color: LEGEND[2].color },
            ];

            const showLabel = i % labelStride === 0 || i === data.length - 1;

            return (
              <g key={d.date}>
                {values.map((val, j) => {
                  const h = (val.v / maxValue) * chartHeight;
                  const x = groupX + gap + j * barWidth;
                  const y = padTop + chartHeight - h;
                  return (
                    <rect
                      key={val.key}
                      x={x}
                      y={y}
                      width={Math.max(1, barWidth - 0.5)}
                      height={Math.max(0, h)}
                      fill={val.color}
                      rx={1}
                    >
                      <title>{`${d.date} · ${val.key.replace('_', ' ')}: ${val.v.toLocaleString()}`}</title>
                    </rect>
                  );
                })}
                {showLabel ? (
                  <text
                    x={groupX + groupWidth / 2}
                    y={padTop + chartHeight + 16}
                    fontSize={10}
                    textAnchor="middle"
                    fill="hsl(var(--ink-4))"
                    fontFamily="ui-monospace, monospace"
                  >
                    {formatDayLabel(d.date)}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
