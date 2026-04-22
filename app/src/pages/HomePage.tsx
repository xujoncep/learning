import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Code2,
  Network,
  Lock,
  ArrowUpRight,
  Flame,
  Bookmark as BookmarkIcon,
  Share2,
} from 'lucide-react';
import { docs, sections, cleanChapterTitle } from '@/lib/content';
import { useAuth } from '@/lib/auth';

export function HomePage() {
  const { isAuthenticated } = useAuth();
  const gateSection = sections.find((s) => s.id === 'gate-cse');
  const rootDocs = docs.filter((d) => d.section === 'root');

  const totalChapters = gateSection?.docs.length ?? 0;
  const totalHandbooks = rootDocs.length;

  return (
    <div className="animate-fade-in">
      {/* ════════════════════════════════════════════════════════════════
          HERO — 2-column editorial
          ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-16 md:pb-24 grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-16 items-center">
          {/* LEFT */}
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="chip chip-amber">
                <Sparkles className="h-3 w-3" /> New · GATE CSE 2026 cohort open
              </span>
              <span className="chip chip-outline">{totalChapters} chapters · {totalHandbooks} handbooks</span>
            </div>

            <h1 className="font-serif text-[48px] md:text-[68px] leading-[1.02] tracking-[-0.03em] text-ink">
              বাংলায় CS শেখো,<br />
              <em className="italic text-amber-700">
                সহজে বুঝে
              </em>—<br />
              নিজের গতিতে।
            </h1>

            <p className="mt-6 text-[16px] md:text-[17px] text-ink-3 leading-[1.55] max-w-[540px]">
              Learning Hub একটা focused study site — GATE CSE-র জন্য প্রতিটা subject
              depth-এ cover করা, সাথে SSH, SSL/TLS, Networking, C programming-এর
              standalone handbook। ছোট ছোট পাঠ, বড় অগ্রগতি।
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-lg btn-primary">
                  Go to dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link to="/login" className="btn btn-lg btn-primary">
                  Start learning free <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link to="/handbooks" className="btn btn-lg btn-ghost">
                <BookOpen className="h-3.5 w-3.5" /> Browse handbooks
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 mt-10">
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

          {/* RIGHT — lesson preview card stack */}
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

                {/* Code preview */}
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

                {/* Progress */}
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
                    <div className="h-7 w-7 rounded-full flex items-center justify-center text-white font-serif text-[11px] bg-ink-blue">
                      LH
                    </div>
                    <div className="leading-tight">
                      <div className="text-[12px] text-ink">Learning Hub</div>
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

            {/* Floating streak chip */}
            <div
              className="card-surface bg-surface-2 shadow-soft-2 flex items-center gap-2.5 absolute"
              style={{ right: -16, top: 60, padding: '10px 14px', zIndex: 2 }}
            >
              <div className="h-8 w-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center">
                <Flame className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="text-[13px] text-ink font-medium">12-day streak</div>
                <div className="meta">Keep it going ✨</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TRACKS — two tracks
          ════════════════════════════════════════════════════════════════ */}
      <div className="dots mx-6 md:mx-10" />

      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="meta text-[12px] uppercase tracking-[0.04em]">
              Two tracks, one calm pace
            </div>
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

        <div className="grid md:grid-cols-2 gap-5">
          <TrackCard
            eyebrow="Track 01 — Course (sign-in required)"
            icon={<Code2 className="h-5 w-5" />}
            iconTone="text-ink-blue"
            title="GATE CSE Preparation"
            description="13টা subject, 500+ PYQs solved, weightage analysis, mindmap summary — GATE 2026-র জন্য complete প্রস্তুতি।"
            items={
              gateSection?.docs
                .slice(0, 5)
                .map((d) => ({ slug: d.slug, label: cleanChapterTitle(d.title) })) ?? []
            }
            meta={`${totalChapters} chapters · updated regularly`}
            ctaTo={isAuthenticated ? '/sections/gate-cse' : '/login?next=/sections/gate-cse'}
            ctaLabel={isAuthenticated ? 'Open course' : 'Sign in to start'}
            locked={!isAuthenticated}
          />
          <TrackCard
            eyebrow="Track 02 — Public handbooks"
            icon={<Network className="h-5 w-5" />}
            iconTone="text-clay"
            title="Standalone Handbooks"
            description="একটা টপিকে গভীরে যাও — What → Why → How → Summary flow-এ real-world-ready content।"
            items={rootDocs
              .slice(0, 5)
              .map((d) => ({ slug: d.slug, label: cleanChapterTitle(d.title) }))}
            meta={`${totalHandbooks} handbooks · free to read`}
            ctaTo="/handbooks"
            ctaLabel="Browse handbooks"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          WHY — 6 features
          ════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-line bg-sand-2 py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="max-w-[720px] mb-10">
            <div className="meta text-[12px] uppercase tracking-[0.04em]">Why Learning Hub</div>
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
              background:
                'radial-gradient(closest-side, hsl(var(--amber) / 0.3), transparent 70%)',
            }}
          />
          <div className="relative">
            <div className="text-[12px] uppercase tracking-[0.04em] text-[#FDE68A]">
              Start today
            </div>
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
              className="btn btn-lg inline-flex items-center justify-center gap-2 rounded-full"
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

// ── Sub-components ─────────────────────────────────────────────────────

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="font-serif text-[28px] text-ink tracking-tight leading-none">{value}</div>
      <div className="text-[12px] text-ink-4 mt-1">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-8 bg-line" />;
}

function TrackCard({
  eyebrow,
  icon,
  iconTone,
  title,
  description,
  items,
  meta,
  ctaTo,
  ctaLabel,
  locked = false,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  iconTone: string;
  title: string;
  description: string;
  items: Array<{ slug: string; label: string }>;
  meta: string;
  ctaTo: string;
  ctaLabel: string;
  locked?: boolean;
}) {
  return (
    <div className="card-surface bg-surface-2 p-8 flex flex-col">
      <div className="flex items-center justify-between">
        <div
          className={`h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center ${iconTone}`}
        >
          {icon}
        </div>
        <span className="meta flex items-center gap-1.5">
          {locked && <Lock className="h-3 w-3" />}
          {eyebrow}
        </span>
      </div>
      <h3 className="font-serif text-[28px] mt-5 tracking-[-0.02em] text-ink leading-tight">
        {title}
      </h3>
      <p className="text-[14px] text-ink-3 mt-2.5 leading-[1.6]">{description}</p>

      {items.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          {items.map((c, i) => (
            <div
              key={c.slug}
              className={`flex items-center justify-between py-2.5 ${
                i < items.length - 1 ? 'border-b border-line border-dashed' : ''
              }`}
            >
              <span className="text-[13.5px] text-ink-2 truncate pr-2">{c.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-ink-4 shrink-0" />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-5 pt-1">
        <span className="meta">{meta}</span>
        <Link to={ctaTo} className="btn btn-sm btn-ghost">
          {ctaLabel} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function Feature({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="pt-6 border-t border-line-2">
      <div className="mono-font text-[11px] text-amber-700">{n}</div>
      <div className="font-serif text-[22px] text-ink mt-2 tracking-[-0.015em] leading-tight">
        {title}
      </div>
      <p className="text-[13.5px] text-ink-3 mt-2.5 leading-[1.6] max-w-[360px]">{desc}</p>
    </div>
  );
}
