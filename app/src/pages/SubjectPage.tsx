import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, PenLine, ListChecks, GraduationCap, type LucideIcon } from 'lucide-react';
import { sections, isGatedSection, getSubjectMeta } from '@/lib/content';
import { useAuth } from '@/lib/auth';

interface SubjectConfig {
  gradient: string;
  glow: string;
  glowColor: string;
  pillBg: string;
  pillBorder: string;
  mono: string;
}

const CONFIGS: Record<string, SubjectConfig> = {
  dbms: {
    gradient: 'from-[#1E1B4B] via-[#312E81] to-[#4338CA]',
    glow: 'rgba(99,102,241,0.55)',
    glowColor: '#6366F1',
    pillBg: 'rgba(99,102,241,0.12)',
    pillBorder: 'rgba(99,102,241,0.3)',
    mono: 'DB',
  },
  'operating-system': {
    gradient: 'from-[#082F49] via-[#0C4A6E] to-[#0369A1]',
    glow: 'rgba(14,165,233,0.55)',
    glowColor: '#0EA5E9',
    pillBg: 'rgba(14,165,233,0.12)',
    pillBorder: 'rgba(14,165,233,0.3)',
    mono: 'OS',
  },
  'cyber-security': {
    gradient: 'from-[#1C0707] via-[#450A0A] to-[#7F1D1D]',
    glow: 'rgba(239,68,68,0.55)',
    glowColor: '#EF4444',
    pillBg: 'rgba(239,68,68,0.12)',
    pillBorder: 'rgba(239,68,68,0.3)',
    mono: 'SEC',
  },
  'computer-networking': {
    gradient: 'from-[#022C22] via-[#064E3B] to-[#065F46]',
    glow: 'rgba(16,185,129,0.55)',
    glowColor: '#10B981',
    pillBg: 'rgba(16,185,129,0.12)',
    pillBorder: 'rgba(16,185,129,0.3)',
    mono: 'NET',
  },
  'c-programming': {
    gradient: 'from-[#1C0F00] via-[#451A03] to-[#78350F]',
    glow: 'rgba(245,158,11,0.55)',
    glowColor: '#F59E0B',
    pillBg: 'rgba(245,158,11,0.12)',
    pillBorder: 'rgba(245,158,11,0.3)',
    mono: 'C',
  },
  'system-design': {
    gradient: 'from-[#130726] via-[#2E1065] to-[#5B21B6]',
    glow: 'rgba(139,92,246,0.55)',
    glowColor: '#8B5CF6',
    pillBg: 'rgba(139,92,246,0.12)',
    pillBorder: 'rgba(139,92,246,0.3)',
    mono: 'SYS',
  },
  'gate-cse': {
    gradient: 'from-[#0A1628] via-[#1E3A8A] to-[#1E40AF]',
    glow: 'rgba(59,130,246,0.55)',
    glowColor: '#3B82F6',
    pillBg: 'rgba(59,130,246,0.12)',
    pillBorder: 'rgba(59,130,246,0.3)',
    mono: 'GATE',
  },
};

const DEFAULT_CONFIG: SubjectConfig = {
  gradient: 'from-[#1C1917] to-[#292524]',
  glow: 'rgba(217,119,6,0.45)',
  glowColor: '#D97706',
  pillBg: 'rgba(217,119,6,0.12)',
  pillBorder: 'rgba(217,119,6,0.3)',
  mono: '—',
};

const LABEL_DESCRIPTIONS: Record<string, string> = {
  Concepts: 'Core theory, diagrams, deep-dive explanations — পুরো syllabus একসাথে।',
  'Written Questions': 'Short ও broad written questions with model answers — exam-এ directly কাজে লাগবে।',
  'MCQ Practice': 'Option-based practice with Bangla explanation ও exam tips — fast revision।',
  Course: 'Complete course material — theory থেকে practice পর্যন্ত।',
};

const LABEL_ICONS: Record<string, LucideIcon> = {
  Concepts: BookOpen,
  'Written Questions': PenLine,
  'MCQ Practice': ListChecks,
  Course: GraduationCap,
};

function softenGlow(glow: string): string {
  return glow.replace('0.55)', '0.2)').replace('0.45)', '0.18)');
}

export function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const subject = getSubjectMeta(subjectId ?? '');

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <h1 className="font-serif text-[44px] text-ink mb-3">Subject not found</h1>
        <p className="text-ink-3 mb-6">We couldn't find the subject you're looking for.</p>
        <Link to="/courses" className="btn btn-primary">
          Back to Courses
        </Link>
      </div>
    );
  }

  const allGated = subject.sections.every((s) => isGatedSection(s.id));
  if (allGated && !isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  const config = CONFIGS[subjectId ?? ''] ?? DEFAULT_CONFIG;

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-14">
      {/* Hero banner — full-bleed gradient */}
      <div
        className={`-mx-6 md:-mx-10 -mt-10 md:-mt-14 mb-10 px-6 md:px-10 pt-12 pb-10 relative overflow-hidden bg-gradient-to-br ${config.gradient}`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Glow bloom */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 30% 50%, ${softenGlow(config.glow)}, transparent)`,
          }}
        />

        {/* Monogram watermark */}
        <div
          aria-hidden
          className="absolute bottom-0 right-0 font-serif italic leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(100px, 22vw, 160px)',
            color: 'rgba(255,255,255,0.045)',
            transform: 'translate(10%, 25%)',
            letterSpacing: '-0.04em',
          }}
        >
          {config.mono}
        </div>

        <div className="relative max-w-[1280px] mx-auto">
          {/* Breadcrumb */}
          <div className="text-[12.5px] mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <Link
              to="/"
              className="hover:text-white transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Home
            </Link>
            {' / '}
            <Link
              to="/courses"
              className="hover:text-white transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Courses
            </Link>
            {' / '}
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>{subject.title}</span>
          </div>

          <h1 className="font-serif text-[36px] md:text-[52px] text-white leading-[1.05] tracking-[-0.025em]">
            {subject.title}
          </h1>
          <p
            className="mt-3 text-[15px] max-w-[560px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.52)' }}
          >
            {subject.description}
          </p>

          <div className="mt-4 text-[11.5px] tracking-wide" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {subject.sections.length} tracks available
          </div>
        </div>
      </div>

      {/* Sub-section Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subject.sections.map((subSection) => {
          const sectionData = sections.find((s) => s.id === subSection.id);
          const gated = isGatedSection(subSection.id);
          const to =
            gated && !isAuthenticated
              ? `/login?next=/sections/${subSection.id}`
              : `/sections/${subSection.id}`;

          const TrackIcon = LABEL_ICONS[subSection.label] ?? BookOpen;

          return (
            <Link
              key={subSection.id}
              to={to}
              className="group card-surface bg-surface-2 overflow-hidden hover:shadow-soft-2 transition-all duration-200 flex flex-col hover:-translate-y-1"
              style={{ borderTop: `3px solid ${config.glowColor}` }}
            >
              <div className="p-6 flex-1 flex flex-col">
                {/* Lucide icon in styled container */}
                <div
                  className="h-11 w-11 rounded-[10px] flex items-center justify-center mb-5"
                  style={{
                    background: config.pillBg,
                    border: `1px solid ${config.pillBorder}`,
                  }}
                >
                  <TrackIcon className="h-5 w-5" style={{ color: config.glowColor }} />
                </div>

                <div className="text-ink-4 text-[11.5px] mb-1">
                  {sectionData ? `${sectionData.docs.length} chapters` : 'Course material'}
                </div>

                <h3 className="font-serif text-[22px] text-ink leading-[1.2] tracking-[-0.015em] group-hover:text-amber-700 transition-colors">
                  {subSection.label}
                </h3>

                <p className="text-[13px] text-ink-3 mt-2 leading-[1.55] flex-1">
                  {LABEL_DESCRIPTIONS[subSection.label] ?? `Explore ${subSection.label} materials.`}
                </p>

                <div className="border-t border-line border-dashed mt-4 pt-3 flex items-center justify-between">
                  <span className="text-[11.5px] text-ink-4">
                    {gated && !isAuthenticated ? 'Sign in to start' : 'Open'}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-ink-4 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
