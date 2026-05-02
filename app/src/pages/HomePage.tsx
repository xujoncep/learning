import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ArrowUpRight,
  Bookmark as BookmarkIcon,
  Share2,
} from 'lucide-react';
import {
  docs,
  sections,
  cleanChapterTitle,
  getSubjects,
  isGatedSection,
  type DocEntry,
} from '@/lib/content';
import { useAuth } from '@/lib/auth';

// ── Per-subject carousel card configs ───────────────────────────────────────

interface CarouselConfig {
  gradient: string;
  glow: string;
  mono: string;
  pillBg: string;
  pillBorder: string;
  pillText: string;
}

const CAROUSEL_CONFIGS: Record<string, CarouselConfig> = {
  dbms: {
    gradient: 'from-[#1E1B4B] via-[#312E81] to-[#4338CA]',
    glow: 'rgba(99,102,241,0.5)',
    mono: 'DB',
    pillBg: 'rgba(99,102,241,0.18)',
    pillBorder: 'rgba(99,102,241,0.4)',
    pillText: '#A5B4FC',
  },
  'operating-system': {
    gradient: 'from-[#082F49] via-[#0C4A6E] to-[#0369A1]',
    glow: 'rgba(14,165,233,0.5)',
    mono: 'OS',
    pillBg: 'rgba(14,165,233,0.18)',
    pillBorder: 'rgba(14,165,233,0.4)',
    pillText: '#7DD3FC',
  },
  'cyber-security': {
    gradient: 'from-[#1C0707] via-[#450A0A] to-[#7F1D1D]',
    glow: 'rgba(239,68,68,0.5)',
    mono: 'SEC',
    pillBg: 'rgba(239,68,68,0.18)',
    pillBorder: 'rgba(239,68,68,0.4)',
    pillText: '#FCA5A5',
  },
  'computer-networking': {
    gradient: 'from-[#022C22] via-[#064E3B] to-[#065F46]',
    glow: 'rgba(16,185,129,0.5)',
    mono: 'NET',
    pillBg: 'rgba(16,185,129,0.18)',
    pillBorder: 'rgba(16,185,129,0.4)',
    pillText: '#6EE7B7',
  },
  'c-programming': {
    gradient: 'from-[#1C0F00] via-[#451A03] to-[#78350F]',
    glow: 'rgba(245,158,11,0.5)',
    mono: 'C',
    pillBg: 'rgba(245,158,11,0.18)',
    pillBorder: 'rgba(245,158,11,0.4)',
    pillText: '#FCD34D',
  },
  'system-design': {
    gradient: 'from-[#130726] via-[#2E1065] to-[#5B21B6]',
    glow: 'rgba(139,92,246,0.5)',
    mono: 'SYS',
    pillBg: 'rgba(139,92,246,0.18)',
    pillBorder: 'rgba(139,92,246,0.4)',
    pillText: '#C4B5FD',
  },
  'gate-cse': {
    gradient: 'from-[#0A1628] via-[#1E3A8A] to-[#1E40AF]',
    glow: 'rgba(59,130,246,0.5)',
    mono: 'GATE',
    pillBg: 'rgba(59,130,246,0.18)',
    pillBorder: 'rgba(59,130,246,0.4)',
    pillText: '#93C5FD',
  },
};

const DEFAULT_CAROUSEL_CONFIG: CarouselConfig = CAROUSEL_CONFIGS['gate-cse'];

// ── HomePage ─────────────────────────────────────────────────────────────────

export function HomePage() {
  const { isAuthenticated } = useAuth();
  const gateSection = sections.find((s) => s.id === 'gate-cse');
  const rootDocs = docs.filter((d) => d.section === 'root');
  const subjects = getSubjects();

  const totalChapters = gateSection?.docs.length ?? 0;
  const totalHandbooks = rootDocs.length;

  return (
    <div className="animate-fade-in">
      {/* ════════════════════════════════════════════════════════════════
          HERO — 2-column editorial
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-16 md:pb-24 grid md:grid-cols-[1.12fr_1fr] gap-10 md:gap-16 items-center">
          {/* LEFT */}
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="chip chip-outline">
                {totalChapters} chapters · {totalHandbooks} handbooks · {subjects.length} courses
              </span>
            </div>

            <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[68px] leading-[1.05] md:leading-[1.02] tracking-[-0.025em] md:tracking-[-0.03em] text-ink break-words">
              বাংলায় CS শেখো,<br />
              <em className="italic text-amber-700">
                সহজে বুঝে
              </em>—<br />
              নিজের গতিতে।
            </h1>

            <p className="mt-6 text-[16px] md:text-[17px] text-ink-3 leading-[1.55] max-w-[540px]">
              Porhi একটা focused study site — GATE CSE-র জন্য প্রতিটা subject
              depth-এ cover করা, সাথে SSH, SSL/TLS, Networking, C programming-এর
              standalone handbook। ছোট ছোট পাঠ, বড় অগ্রগতি।
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mt-8">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-lg btn-primary justify-center w-full sm:w-auto">
                  Go to dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link to="/login" className="btn btn-lg btn-primary justify-center w-full sm:w-auto">
                  Start learning free <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link to="/handbooks" className="btn btn-lg btn-ghost justify-center w-full sm:w-auto">
                <BookOpen className="h-3.5 w-3.5" /> Browse handbooks
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-10 sm:flex sm:items-center sm:gap-7">
              <Stat value={totalChapters.toString()} label="GATE chapters" />
              <Divider />
              <Stat value={totalHandbooks.toString()} label="handbooks" />
              <Divider />
              <Stat value="500+" label="PYQs solved" />
              <Divider />
              <Stat
                value={
                  <>
                    4.8
                    <span className="text-amber text-[16px]">★</span>
                  </>
                }
                label="reader rating"
              />
            </div>
          </div>

          {/* RIGHT — lesson preview card */}
          <div className="relative h-[480px] md:h-[540px] hidden md:block">
            {/* Back card */}
            <div
              aria-hidden
              className="absolute card-surface shadow-soft-2"
              style={{
                inset: '40px -20px 40px 40px',
                background: 'hsl(var(--bg-3))',
                borderColor: 'hsl(var(--amber-100))',
                transform: 'rotate(2deg)',
                zIndex: 0,
              }}
            />
            {/* Main card */}
            <div
              className="absolute card-surface bg-surface-2 shadow-soft-3 overflow-hidden flex flex-col"
              style={{ inset: '0 20px 0 0', zIndex: 1 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <span className="chip chip-amber text-[10.5px] h-[22px]">
                    Chapter 08 · Reading 4
                  </span>
                  <span className="meta">18 min read · 6 exercises</span>
                </div>
                <div className="flex items-center gap-2 text-ink-4">
                  <BookmarkIcon className="h-4 w-4" />
                  <Share2 className="h-4 w-4" />
                </div>
              </div>

              <div className="px-7 py-6 flex-1">
                <div className="meta">Operating System · GATE CSE</div>
                <h3 className="font-serif text-[26px] mt-1 leading-[1.2] tracking-tight text-ink">
                  <em className="italic text-amber-700">Deadlock</em> — চারটা শর্ত,
                  একটা এড়িয়ে যাও।
                </h3>
                <p className="text-[13.5px] text-ink-3 mt-2.5 leading-relaxed">
                  Mutual exclusion, Hold &amp; Wait, No Preemption, Circular Wait — এই
                  চারটা একসাথে হলেই system আটকে যায়। একটা ভাঙলেই deadlock এড়ানো যায়।
                </p>

                <div
                  className="mt-4 rounded-[10px] p-3.5 font-mono text-[12px] leading-[1.65]"
                  style={{ background: '#1C1917', color: '#E7DFD1' }}
                >
                  <div style={{ color: '#A39584' }}>{'// deadlock.c'}</div>
                  <div>
                    <span style={{ color: '#D97706' }}>if</span> (mutex &amp;&amp; hold_wait &amp;&amp;
                  </div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;no_preempt &amp;&amp; circular) {'{'}</div>
                  <div>&nbsp;&nbsp;<span style={{ color: '#A39584' }}>{'// deadlock possible'}</span></div>
                  <div>&nbsp;&nbsp;system.deadlock = <span style={{ color: '#D97706' }}>true</span>;</div>
                  <div>{'}'}</div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-[11.5px] text-ink-4 mb-1.5">
                    <span>Chapter progress</span>
                    <span>4 / 8 readings</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-sand-2 overflow-hidden">
                    <div className="h-full bg-amber rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-[8px] flex items-center justify-center text-white font-serif text-[11px] bg-ink-blue">
                      P
                    </div>
                    <div className="leading-tight">
                      <div className="text-[12px] text-ink">Porhi</div>
                      <div className="meta text-[11px]">Bilingual study material</div>
                    </div>
                  </div>
                  <Link
                    to={isAuthenticated ? '/docs/gate-cse/08-operating-system' : '/login?next=/docs/gate-cse/08-operating-system'}
                    className="btn btn-sm btn-amber"
                  >
                    Resume <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TRACKS — two auto-play carousels
          ════════════════════════════════════════════════════════════════ */}
      <div className="dots mx-6 md:mx-10" />

      <section className="py-16 md:py-20 overflow-hidden">
        {/* Section header */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="meta text-[12px] uppercase tracking-[0.04em]">Two tracks, one calm pace</div>
            <h2 className="font-serif text-[36px] md:text-[44px] mt-2 tracking-[-0.02em] text-ink">
              কী শিখতে চাও?
            </h2>
          </div>
          <Link
            to="/handbooks"
            className="text-[13.5px] text-ink border-b border-line-2 hover:border-ink transition-colors pb-[2px]"
          >
            Browse handbooks →
          </Link>
        </div>

        {/* Courses carousel */}
        <div className="mb-8">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-3 flex items-center justify-between">
            <span className="meta text-[11px] uppercase tracking-[0.08em]">Courses</span>
            <Link to="/courses" className="text-[12px] text-ink-4 hover:text-ink transition-colors">
              View all →
            </Link>
          </div>
          <Marquee
            items={subjects}
            renderItem={(s, i) => (
              <CourseCard key={i} subject={s} isAuthenticated={isAuthenticated} />
            )}
            speed={40}
          />
        </div>

        {/* Handbooks carousel */}
        <div>
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-3 flex items-center justify-between">
            <span className="meta text-[11px] uppercase tracking-[0.08em]">Handbooks</span>
            <Link to="/handbooks" className="text-[12px] text-ink-4 hover:text-ink transition-colors">
              View all →
            </Link>
          </div>
          <Marquee
            items={rootDocs}
            renderItem={(d, i) => <HandbookCard key={i} doc={d} />}
            speed={50}
            reverse
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          WHY — 6 features
          ════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-line bg-sand-2 py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="max-w-[720px] mb-10">
            <div className="meta text-[12px] uppercase tracking-[0.04em]">Why Porhi</div>
            <h2 className="font-serif text-[32px] md:text-[42px] mt-2 leading-[1.1] tracking-[-0.02em] text-ink">
              ব্যস্ত পেশাজীবীদের জন্য —<br />
              <em className="italic text-amber-700">বিশ মিনিট</em>-এর পাঠ।
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            <Feature n="01" title="Bite-sized readings" desc="প্রতিটা reading 8–20 মিনিটের। Commute-এ পড়ো, stoplight-এ বন্ধ করো।" />
            <Feature n="02" title="PYQ-heavy" desc="প্রতিটা chapter-এ 20-30 solved PYQ, practice problems সহ — exam pattern internalize হবে।" />
            <Feature n="03" title="Bilingual by design" desc="Concept বাংলায়, technical keywords English-এ — দুটোরই intuition গড়ে ওঠে।" />
            <Feature n="04" title="Mermaid diagrams" desc="Complex topics flowchart, sequence, mindmap দিয়ে visual — শুধু text না।" />
            <Feature n="05" title="Offline-ready PWA" desc="Install করো, offline-ও পড়ো। Internet ছাড়াও study চলবে।" />
            <Feature n="06" title="No ads, no tracking" desc="Pure learning experience — কোনো ad, কোনো upsell, কোনো dark pattern নেই।" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CTA — dark card
          ════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div
          className="rounded-[16px] border p-10 md:p-14 relative overflow-hidden grid md:grid-cols-[1.3fr_1fr] gap-10 items-center"
          style={{
            background: 'hsl(var(--ink))',
            color: 'hsl(var(--bg))',
            borderColor: 'hsl(var(--ink))',
          }}
        >
          <div
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              right: -120,
              top: -120,
              width: 360,
              height: 360,
              background: 'radial-gradient(closest-side, hsl(var(--amber) / 0.3), transparent 70%)',
            }}
          />
          <div className="relative">
            <div className="text-[12px] uppercase tracking-[0.04em] text-[#FDE68A]">Start today</div>
            <h2
              className="font-serif text-[32px] md:text-[44px] mt-2 tracking-[-0.02em] leading-[1.1]"
              style={{ color: 'hsl(var(--bg))' }}
            >
              বিশ মিনিট আজ।<br />
              <em className="italic" style={{ color: '#FDE68A' }}>এক বছর পরে</em> তুমি আলাদা।
            </h2>
            <p className="text-[14px] md:text-[15px] mt-4 max-w-[480px] leading-[1.55]" style={{ color: '#D8CDB3' }}>
              Any course free — no card, no trial pressure। Sign in করো একটা shared
              password দিয়ে, আর তোমার নাম দাও — ব্যাস।
            </p>
          </div>
          <div className="relative flex flex-col gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-lg btn-amber" style={{ height: 54 }}>
                Go to dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link to="/login" className="btn btn-lg btn-amber" style={{ height: 54 }}>
                Sign in to the course <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              to="/handbooks"
              className="btn btn-lg inline-flex items-center justify-center gap-2 rounded-[8px]"
              style={{
                height: 54,
                background: 'transparent',
                color: 'hsl(var(--bg))',
                border: '1px solid #4a4540',
              }}
            >
              Read handbooks first
            </Link>
            <div className="text-[12px] mt-1 text-center" style={{ color: '#8A8072' }}>
              ✦ Fully free · ✦ No tracking · ✦ Offline-ready
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-serif text-[28px] text-ink tracking-tight leading-none">{value}</div>
      <div className="text-[12px] text-ink-4 mt-1">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="hidden sm:block w-px h-8 bg-line" />;
}

function Feature({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="pt-6 border-t border-line-2">
      <div className="mono-font text-[11px] text-amber-700">{n}</div>
      <div className="font-serif text-[22px] text-ink mt-2 tracking-[-0.015em] leading-tight">{title}</div>
      <p className="text-[13.5px] text-ink-3 mt-2.5 leading-[1.6] max-w-[360px]">{desc}</p>
    </div>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────

function Marquee<T>({
  items,
  renderItem,
  speed = 35,
  reverse = false,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
      }}
    >
      <div
        className="flex gap-4 w-max px-6"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running';
        }}
      >
        {items.map((item, i) => renderItem(item, i))}
        {items.map((item, i) => renderItem(item, i + items.length))}
      </div>
    </div>
  );
}

type SubjectEntry = ReturnType<typeof getSubjects>[number];

function CourseCard({
  subject,
  isAuthenticated,
}: {
  subject: SubjectEntry;
  isAuthenticated: boolean;
}) {
  const config = CAROUSEL_CONFIGS[subject.id] ?? DEFAULT_CAROUSEL_CONFIG;
  const hasMultiple = subject.sections.length > 1;
  const isGated = subject.sections.some((s) => isGatedSection(s.id));

  const to = hasMultiple
    ? `/subjects/${subject.id}`
    : isGated && !isAuthenticated
      ? `/login?next=/sections/${subject.sections[0].id}`
      : `/sections/${subject.sections[0].id}`;

  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-[14px] flex flex-col bg-gradient-to-br ${config.gradient} transition-all duration-300 hover:-translate-y-1`}
      style={{
        width: 252,
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 14px 44px -8px ${config.glow}, 0 4px 20px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      }}
    >
      {/* Radial bloom */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${config.glow.replace('0.5)', '0.22)')}, transparent)`,
        }}
      />

      {/* Monogram watermark */}
      <div
        aria-hidden
        className="absolute top-0 right-0 font-serif italic leading-none select-none pointer-events-none"
        style={{
          fontSize: 72,
          color: 'rgba(255,255,255,0.055)',
          transform: 'translate(12%, -5%)',
          letterSpacing: '-0.04em',
        }}
      >
        {config.mono}
      </div>

      <div className="relative p-5 flex-1 flex flex-col">
        <span
          className="text-[10px] px-2 py-0.5 rounded-full self-start mb-5"
          style={{
            background: 'rgba(255,255,255,0.09)',
            color: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {hasMultiple ? `${subject.sections.length} tracks` : 'Course'}
        </span>

        <h3 className="font-serif text-[18px] text-white leading-[1.25] tracking-[-0.015em] flex-1">
          {subject.title}
        </h3>

        {hasMultiple && (
          <div className="flex flex-wrap gap-1 mt-3 mb-1">
            {subject.sections.map((s) => (
              <span
                key={s.id}
                className="text-[9.5px] px-1.5 py-0.5 rounded-full"
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

        <div
          className="flex items-center justify-between mt-4 pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {hasMultiple ? 'Choose track' : 'Open course'}
          </span>
          <ArrowRight
            className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-all"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          />
        </div>
      </div>
    </Link>
  );
}

function HandbookCard({ doc }: { doc: DocEntry }) {
  return (
    <Link
      to={doc.path}
      className="group card-surface bg-surface-2 rounded-[14px] overflow-hidden flex flex-col hover:shadow-soft-2 transition-all duration-200 hover:-translate-y-1"
      style={{ width: 220 }}
    >
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-[10px] text-amber-700 font-medium tracking-[0.06em] uppercase mb-3">
          Handbook
        </span>
        <h3 className="font-serif text-[16px] text-ink leading-[1.3] flex-1 group-hover:text-amber-700 transition-colors">
          {cleanChapterTitle(doc.title)}
        </h3>
        <p className="text-[12px] text-ink-3 mt-2 line-clamp-2 leading-[1.5]">{doc.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-line border-dashed">
          <span className="text-[11px] text-ink-4">{doc.readingTime} min read</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-ink-4 group-hover:text-amber-700 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
