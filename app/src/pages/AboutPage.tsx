import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Globe,
  Heart,
  Layers,
  Library,
  Sparkles,
  Target,
} from 'lucide-react';

// lucide-react does not ship a GitHub mark; inline the official icon path
// so the team-card link icon doesn't pull in another dep.
function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
import { SeoHead } from '@/components/layout/SeoHead';
import { docs, sections } from '@/lib/content';

interface TeamMember {
  name: string;
  role: string;
  blurb: string;
  image: string;
  link?: string;
  tone: string;
  badge: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Md Sahabuddin Hossain',
    role: 'Founder · Author · Curator',
    blurb:
      'Software engineer turned bilingual educator. লেখা, structure, voice — সব এর হাতেই। প্রতিটা chapter পরীক্ষা পথ + interview track-কে head-on attack করে যেন an average student ও সহজে বুঝতে পারে।',
    image: 'https://avatars.githubusercontent.com/u/178742119?v=4&s=300',
    link: 'https://github.com/xujoncep',
    tone: 'text-amber-700',
    badge: 'Lead',
  },
  {
    name: 'Claude (Anthropic)',
    role: 'AI Engineering Partner',
    blurb:
      'Frontend code, design tokens, Worker endpoints, D1 schema — Claude pairs through every commit. From Porhi-র UI polish থেকে শুরু করে activity-tracking infra পর্যন্ত — every diff reviewed line-by-line।',
    image: 'https://avatars.githubusercontent.com/u/76263028?v=4&s=300',
    link: 'https://www.anthropic.com',
    tone: 'text-ink-blue',
    badge: 'AI',
  },
  {
    name: 'Codex (OpenAI)',
    role: 'AI Code Reviewer',
    blurb:
      'Second pair of AI eyes — quick refactors, edge-case checks, alternate-approach probes। বড় change-এর আগে context cross-check করে, এবং architecture choices-এ devil-advocate হয়।',
    image: 'https://avatars.githubusercontent.com/u/14957082?v=4&s=300',
    link: 'https://openai.com',
    tone: 'text-sage',
    badge: 'AI',
  },
];

interface Pillar {
  icon: React.ReactNode;
  tone: string;
  title: string;
  body: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <Globe className="h-5 w-5" />,
    tone: 'text-amber-700',
    title: 'Bilingual by design',
    body: 'বাংলায় explanation, English-এ keywords। Concept বাংলা মনে থাকে, terminology English-এ — দুইটাই গুরুত্বপূর্ণ।',
  },
  {
    icon: <Target className="h-5 w-5" />,
    tone: 'text-ink-blue',
    title: 'PYQ-heavy, exam-shaped',
    body: 'প্রতিটা chapter previous year questions-এর pattern অনুযায়ী structured। শুধু theory না — practice-এর সাথে।',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    tone: 'text-sage',
    title: 'Bite-sized readings',
    body: '8–20 মিনিটের section, mobile-first। বাস-এ পড়ো, lunch break-এ পড়ো — পড়ার অভ্যাস gradient।',
  },
  {
    icon: <Heart className="h-5 w-5" />,
    tone: 'text-clay',
    title: 'Calm, no ads',
    body: 'No upsell, no popup, no tracking pixels। Clean reader experience, dark mode, offline PWA — পড়ার আনন্দ-টা priority।',
  },
];

const TECH_STACK = [
  { icon: <Code2 className="h-3.5 w-3.5" />, label: 'React + TypeScript' },
  { icon: <Layers className="h-3.5 w-3.5" />, label: 'MDX content pipeline' },
  { icon: <Cpu className="h-3.5 w-3.5" />, label: 'Cloudflare Workers + D1' },
  { icon: <Sparkles className="h-3.5 w-3.5" />, label: 'Tailwind + Fraunces type' },
];

export function AboutPage() {
  // Numbers come from real registered content so the page stays honest
  // without hand-maintained counters.
  const totalCourses = sections.filter((s) => s.id !== 'root').length;
  const totalChapters = sections
    .filter((s) => s.id !== 'root')
    .reduce((sum, s) => sum + s.docs.length, 0);
  const totalHandbooks = docs.filter((d) => d.section === 'root').length;
  const totalWords = docs.reduce((sum, d) => sum + (d.wordCount ?? 0), 0);

  return (
    <>
      <SeoHead
        title="About · Porhi"
        description="The story, the mission, and the small team behind Porhi — bilingual CS learning."
        canonical="/about"
      />

      <div className="animate-fade-in">
        {/* ════════════════════════════════════════════════════════════════
            HERO
            ════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-line">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20">
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-center">
              <div>
                <div className="meta text-[12px] uppercase tracking-[0.04em]">About Porhi</div>
                <h1 className="font-serif text-[36px] sm:text-[44px] md:text-[64px] leading-[1.04] tracking-[-0.025em] text-ink mt-3">
                  A small crew,{' '}
                  <em className="italic text-amber-700">a slow craft</em>,
                  <br className="hidden sm:block" /> a quiet place to learn.
                </h1>
                <p className="text-[15px] sm:text-[16px] text-ink-3 mt-5 max-w-[560px] leading-relaxed">
                  Porhi (পরহি) — বাংলায় Computer Science শেখার একটা editorial-style জায়গা।
                  GATE CSE, DBMS, OS, System Design, Networking, C — প্রতিটা subject-এ
                  beginner থেকে interview-ready পর্যন্ত curated path। কোনো ad নেই, কোনো
                  upsell নেই — শুধু পড়া আর শেখা।
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/courses" className="btn btn-lg btn-amber">
                    Explore courses <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/handbooks" className="btn btn-lg btn-ghost border border-line">
                    <Library className="h-4 w-4" /> Browse handbooks
                  </Link>
                </div>
              </div>

              {/* Right — editorial frame */}
              <div className="hidden md:block relative">
                <div
                  className="aspect-[4/5] rounded-2xl overflow-hidden relative"
                  style={{
                    background:
                      'linear-gradient(135deg, hsl(var(--ink-blue)) 0%, hsl(214, 60%, 12%) 70%)',
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute rounded-full"
                    style={{
                      right: -160,
                      top: -160,
                      width: 480,
                      height: 480,
                      background:
                        'radial-gradient(closest-side, hsl(var(--amber) / 0.30), transparent 70%)',
                    }}
                  />
                  <div className="relative h-full p-10 flex flex-col justify-between text-[#E7DFD1]">
                    <div className="text-[11px] uppercase tracking-[0.08em] text-[#FDE68A]">
                      Editorial study, slow learning
                    </div>
                    <div>
                      <div className="font-serif text-[44px] leading-[1.05] text-[#FFFBEF]">
                        নিজের গতিতে শেখো,
                        <br />
                        <em className="italic text-[#FDE68A]">একটা chapter এক বসায়</em>।
                      </div>
                      <div className="mt-6 inline-flex items-center gap-3 text-[12.5px] text-[#D8CDB3]">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#B85C38] text-white font-serif text-[13px]">
                          P
                        </div>
                        <span>Porhi · বাংলায় CS শেখার জায়গা</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            NUMBERS
            ════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-line bg-sand-2">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { value: totalCourses, label: 'Courses', sub: 'curated tracks' },
                { value: totalChapters, label: 'Chapters', sub: 'across all courses' },
                { value: totalHandbooks, label: 'Handbooks', sub: 'free standalone reads' },
                {
                  value: `${Math.round(totalWords / 1000)}k+`,
                  label: 'Words',
                  sub: 'bilingual content',
                },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-[36px] sm:text-[44px] md:text-[52px] leading-none tracking-tight text-ink">
                    {s.value}
                  </div>
                  <div className="text-[13px] font-medium text-ink-2 mt-2">{s.label}</div>
                  <div className="meta text-[11.5px] mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            MISSION / PILLARS
            ════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-line">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20">
            <div className="max-w-[720px] mb-10 md:mb-14">
              <div className="meta text-[12px] uppercase tracking-[0.04em]">Mission</div>
              <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[44px] mt-3 leading-[1.08] tracking-[-0.02em] text-ink">
                বাংলা ভাষায় engineering নিয়ে চিন্তা করা যাবে —{' '}
                <em className="italic text-amber-700">এটাই principle</em>.
              </h2>
              <p className="text-[15px] text-ink-3 mt-5 leading-relaxed">
                Concept বাংলা-তে বুঝে নাও, technical keyword English-এ মুখস্থ করো।
                দুইটার ফাঁকটা যত ছোট হবে, exam আর interview-এ তত আরাম। Porhi সেই ফাঁক
                ঢেকে দেয় — slow editorial reading-এর মাধ্যমে, ad ছাড়া, distraction ছাড়া।
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {PILLARS.map((p) => (
                <div key={p.title} className="card-surface bg-surface-2 p-5 md:p-6">
                  <div className={`inline-flex items-center gap-2.5 ${p.tone}`}>
                    {p.icon}
                    <span className="font-serif text-[18px] md:text-[20px] text-ink tracking-tight">
                      {p.title}
                    </span>
                  </div>
                  <p className="text-[14px] text-ink-3 mt-3 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            TEAM
            ════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-line bg-sand-2">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20">
            <div className="max-w-[720px] mb-10 md:mb-14">
              <div className="meta text-[12px] uppercase tracking-[0.04em]">The crew</div>
              <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[44px] mt-3 leading-[1.08] tracking-[-0.02em] text-ink">
                Three on the ship —{' '}
                <em className="italic text-amber-700">one human</em>, two co-pilots.
              </h2>
              <p className="text-[15px] text-ink-3 mt-5 leading-relaxed">
                Porhi-র পেছনে ছোট একটা team — একজন human author যিনি content + voice
                দেন, আর দুটো AI engineering partner যারা code, design, infra-তে
                pair করে। প্রতিটা commit human-reviewed।
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {TEAM.map((m) => (
                <article
                  key={m.name}
                  className="card-surface bg-surface-2 overflow-hidden flex flex-col"
                >
                  {/* Image header — avatar centered on a soft tint */}
                  <div className="h-[180px] relative bg-gradient-to-br from-amber-50 to-amber-100 border-b border-line flex items-center justify-center overflow-hidden">
                    <span className="absolute top-3.5 left-4 px-2 py-0.5 rounded-[6px] bg-surface-2/95 text-[10.5px] font-medium text-ink-2">
                      {m.badge}
                    </span>
                    <img
                      src={m.image}
                      alt={`${m.name} avatar`}
                      loading="lazy"
                      className="h-[110px] w-[110px] rounded-full object-cover shadow-soft-2 border-2 border-surface-2"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="font-serif text-[20px] text-ink leading-tight tracking-tight">
                      {m.name}
                    </h3>
                    <div className={`text-[12.5px] font-medium mt-1 ${m.tone}`}>{m.role}</div>
                    <p className="text-[13.5px] text-ink-3 mt-3 leading-relaxed flex-1">
                      {m.blurb}
                    </p>
                    {m.link && (
                      <a
                        href={m.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] text-ink-2 hover:text-amber-700 transition-colors group"
                      >
                        <GithubMark className="h-3.5 w-3.5" />
                        <span className="border-b border-line group-hover:border-amber-700 pb-[1px]">
                          {m.link.replace(/^https?:\/\//, '')}
                        </span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            BUILT WITH
            ════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-line">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-16">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12 items-start">
              <div>
                <div className="meta text-[12px] uppercase tracking-[0.04em]">Built with</div>
                <h2 className="font-serif text-[28px] md:text-[34px] mt-3 leading-[1.1] tracking-[-0.02em] text-ink">
                  Tools that <em className="italic text-amber-700">stay out of the way</em>.
                </h2>
              </div>
              <div>
                <div className="flex flex-wrap gap-2.5">
                  {TECH_STACK.map((t) => (
                    <span
                      key={t.label}
                      className="chip chip-outline inline-flex items-center gap-1.5"
                    >
                      {t.icon}
                      {t.label}
                    </span>
                  ))}
                </div>
                <p className="text-[14px] text-ink-3 mt-6 leading-relaxed max-w-[560px]">
                  Frontend single-page React app on Cloudflare Pages, content authored in
                  Markdown, compiled to MDX at build time, lazy-loaded per chapter। Auth +
                  activity tracking goes through a Cloudflare Worker (Hono + D1). Static-fast
                  for readers, edge-cheap to run.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CTA FOOTER
            ════════════════════════════════════════════════════════════════ */}
        <section>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20 text-center">
            <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[44px] leading-[1.08] tracking-[-0.02em] text-ink max-w-[760px] mx-auto">
              Ready to start? <em className="italic text-amber-700">আজই একটা chapter</em>।
            </h2>
            <p className="text-[14.5px] text-ink-3 mt-4 max-w-[520px] mx-auto leading-relaxed">
              ছোট ছোট পাঠ, বড় অগ্রগতি। বিশ মিনিটে আজকের অংশ — কাল আবার বিশ মিনিট।
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link to="/courses" className="btn btn-lg btn-primary">
                Browse courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/handbooks" className="btn btn-lg btn-ghost border border-line">
                <Library className="h-4 w-4" /> Free handbooks
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
