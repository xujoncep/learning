import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { isGatedSection, getSubjects } from '@/lib/content';
import { useAuth } from '@/lib/auth';

interface SubjectConfig {
  gradient: string;
  glow: string;
  pillBg: string;
  pillBorder: string;
  pillText: string;
  mono: string;
}

const CONFIGS: Record<string, SubjectConfig> = {
  dbms: {
    gradient: 'from-[#1E1B4B] via-[#312E81] to-[#4338CA]',
    glow: 'rgba(99,102,241,0.55)',
    pillBg: 'rgba(99,102,241,0.18)',
    pillBorder: 'rgba(99,102,241,0.4)',
    pillText: '#A5B4FC',
    mono: 'DB',
  },
  'operating-system': {
    gradient: 'from-[#082F49] via-[#0C4A6E] to-[#0369A1]',
    glow: 'rgba(14,165,233,0.55)',
    pillBg: 'rgba(14,165,233,0.18)',
    pillBorder: 'rgba(14,165,233,0.4)',
    pillText: '#7DD3FC',
    mono: 'OS',
  },
  'cyber-security': {
    gradient: 'from-[#1C0707] via-[#450A0A] to-[#7F1D1D]',
    glow: 'rgba(239,68,68,0.55)',
    pillBg: 'rgba(239,68,68,0.18)',
    pillBorder: 'rgba(239,68,68,0.4)',
    pillText: '#FCA5A5',
    mono: 'SEC',
  },
  'computer-networking': {
    gradient: 'from-[#022C22] via-[#064E3B] to-[#065F46]',
    glow: 'rgba(16,185,129,0.55)',
    pillBg: 'rgba(16,185,129,0.18)',
    pillBorder: 'rgba(16,185,129,0.4)',
    pillText: '#6EE7B7',
    mono: 'NET',
  },
  'c-programming': {
    gradient: 'from-[#1C0F00] via-[#451A03] to-[#78350F]',
    glow: 'rgba(245,158,11,0.55)',
    pillBg: 'rgba(245,158,11,0.18)',
    pillBorder: 'rgba(245,158,11,0.4)',
    pillText: '#FCD34D',
    mono: 'C',
  },
  'system-design': {
    gradient: 'from-[#130726] via-[#2E1065] to-[#5B21B6]',
    glow: 'rgba(139,92,246,0.55)',
    pillBg: 'rgba(139,92,246,0.18)',
    pillBorder: 'rgba(139,92,246,0.4)',
    pillText: '#C4B5FD',
    mono: 'SYS',
  },
  'gate-cse': {
    gradient: 'from-[#0A1628] via-[#1E3A8A] to-[#1E40AF]',
    glow: 'rgba(59,130,246,0.55)',
    pillBg: 'rgba(59,130,246,0.18)',
    pillBorder: 'rgba(59,130,246,0.4)',
    pillText: '#93C5FD',
    mono: 'GATE',
  },
  'bb-dsa': {
    gradient: 'from-[#052E16] via-[#14532D] to-[#166534]',
    glow: 'rgba(34,197,94,0.55)',
    pillBg: 'rgba(34,197,94,0.18)',
    pillBorder: 'rgba(34,197,94,0.4)',
    pillText: '#86EFAC',
    mono: 'DSA',
  },
};

const DEFAULT_CONFIG: SubjectConfig = {
  gradient: 'from-[#1C1917] to-[#292524]',
  glow: 'rgba(217,119,6,0.45)',
  pillBg: 'rgba(217,119,6,0.15)',
  pillBorder: 'rgba(217,119,6,0.35)',
  pillText: '#FCD34D',
  mono: '—',
};

function softenGlow(glow: string): string {
  return glow.replace('0.55)', '0.25)').replace('0.45)', '0.2)');
}

export function CoursesIndexPage() {
  const { isAuthenticated } = useAuth();
  const subjects = getSubjects();

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-14">
      {/* Breadcrumb */}
      <div className="text-[12.5px] text-ink-4 mb-4">
        <Link to="/" className="hover:text-ink transition-colors">
          Home
        </Link>{' '}
        / <span className="text-ink-2">Courses</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-8 border-b border-line">
        <div>
          <div className="meta text-[12px] uppercase tracking-[0.04em]">Catalog</div>
          <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.02] tracking-[-0.025em] text-ink mt-2">
            Courses — <em className="italic text-amber-700">pick a track</em>.
          </h1>
          <p className="text-[15px] text-ink-3 mt-4 max-w-[640px] leading-relaxed">
            প্রতিটা subject-এ Concepts, Written Prep ও MCQ Practice আলাদাভাবে সাজানো। যেকোনো একটায় click করো।
          </p>
        </div>
        <div className="meta shrink-0">{subjects.length} subjects · curated learning paths</div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {subjects.map(({ id, title, description, sections: subSections, url: customUrl }) => {
          const hasMultiple = subSections.length > 1;
          const isGated = subSections.some((s) => isGatedSection(s.id));
          const config = CONFIGS[id] ?? DEFAULT_CONFIG;

          const to = customUrl
            ? customUrl
            : hasMultiple
              ? `/subjects/${id}`
              : isGated && !isAuthenticated
                ? `/login?next=/sections/${subSections[0].id}`
                : `/sections/${subSections[0].id}`;

          return (
            <Link
              key={id}
              to={to}
              className={`group relative overflow-hidden rounded-[16px] flex flex-col transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-br ${config.gradient}`}
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px -12px ${config.glow}, 0 4px 24px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
              }}
            >
              {/* Radial glow bloom */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 55% at 50% -10%, ${softenGlow(config.glow)}, transparent)`,
                }}
              />

              {/* Large monogram watermark — top right decorative */}
              <div
                aria-hidden
                className="absolute top-0 right-0 font-serif italic leading-none select-none pointer-events-none"
                style={{
                  fontSize: 'clamp(72px, 18vw, 110px)',
                  color: 'rgba(255,255,255,0.055)',
                  transform: 'translate(12%, -8%)',
                  letterSpacing: '-0.04em',
                }}
              >
                {config.mono}
              </div>

              {/* Main content */}
              <div className="relative p-6 pt-5 pb-5 flex-1 flex flex-col">
                {/* Top row: badge + lock */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-[10.5px] px-2.5 py-1 rounded-full font-medium tracking-wide"
                    style={{
                      background: 'rgba(255,255,255,0.09)',
                      color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.11)',
                    }}
                  >
                    {hasMultiple ? `${subSections.length} tracks` : 'Course'}
                  </span>
                  {isGated && !isAuthenticated && (
                    <Lock className="h-3.5 w-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-[23px] text-white leading-[1.2] tracking-[-0.02em]">
                  {title}
                </h3>

                {/* Description */}
                <p
                  className="text-[13px] mt-2.5 leading-[1.65] line-clamp-2 flex-1"
                  style={{ color: 'rgba(255,255,255,0.48)' }}
                >
                  {description}
                </p>

                {/* Track pills */}
                {hasMultiple && (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {subSections.map((s) => (
                      <span
                        key={s.id}
                        className="text-[10.5px] px-2.5 py-1 rounded-full tracking-wide"
                        style={{
                          background: config.pillBg,
                          border: `1px solid ${config.pillBorder}`,
                          color: config.pillText,
                        }}
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="relative px-6 py-4 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span
                  className="text-[11.5px] tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.38)' }}
                >
                  {isGated && !isAuthenticated
                    ? 'Sign in to start'
                    : hasMultiple
                      ? 'Choose track'
                      : 'Open course'}
                </span>
                <div
                  className="h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.09)',
                    border: '1px solid rgba(255,255,255,0.14)',
                  }}
                >
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-all group-hover:translate-x-0.5"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-12 pt-6 border-t border-line flex items-center justify-center gap-2 text-[12px] text-ink-4">
        <Lock className="h-3 w-3" /> Course content — accessible to signed-in readers
      </div>
    </div>
  );
}
