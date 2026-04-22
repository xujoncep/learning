import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, BookOpen, Clock, Flame } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SeoHead } from '@/components/layout/SeoHead';
import { useAuth, avatarColor, initials } from '@/lib/auth';
import { sections, cleanChapterTitle, chapterLabel } from '@/lib/content';

export function DashboardPage() {
  const { displayName, loggedInAt } = useAuth();
  const color = avatarColor(displayName);
  const avatar = initials(displayName);

  const gateSection = sections.find((s) => s.id === 'gate-cse');
  const firstChapter = gateSection?.docs[0];

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout showSearch>
      <SeoHead
        title={`Dashboard · ${displayName ?? 'Welcome'} · Learning Hub`}
        description="Your reading progress and today's study plan."
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div className="flex items-center gap-5">
            <div
              aria-hidden
              className="h-16 w-16 rounded-full text-surface font-serif text-xl font-semibold flex items-center justify-center shadow-soft-2"
              style={{ background: color }}
            >
              {avatar}
            </div>
            <div>
              <div className="meta">{dateStr}</div>
              <h1 className="font-serif text-4xl md:text-[42px] leading-[1.05] tracking-tight text-ink mt-1">
                Welcome back, <em className="italic text-amber-700">{displayName || 'friend'}</em>.
              </h1>
              <p className="text-[14px] text-ink-3 mt-2">
                আজকে কোথায় শুরু করবে? নিচে তোমার জন্য একটা short plan।
              </p>
            </div>
          </div>

          {firstChapter && (
            <Link
              to={firstChapter.path}
              className="btn btn-lg btn-amber shrink-0"
            >
              Resume reading <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Grid: continue + right rail */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* MAIN */}
          <div>
            {/* Continue learning */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-[22px] text-ink tracking-tight">Continue learning</h2>
              <Link to="/sections/gate-cse" className="text-[12.5px] text-ink-3 hover:text-ink">
                All chapters →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(gateSection?.docs.slice(0, 2) ?? []).map((doc) => (
                <Link
                  key={doc.slug}
                  to={doc.path}
                  className="card-surface bg-surface-2 overflow-hidden group hover:shadow-soft-2 transition-all"
                >
                  <div className="h-[90px] relative bg-gradient-to-br from-amber-50 to-amber-100 border-b border-line">
                    <div className="absolute top-3.5 left-4 text-[11px] font-medium text-ink-3">
                      {chapterLabel(doc)}
                    </div>
                    <div className="absolute bottom-3 right-4 font-serif italic text-[32px] text-amber-700 opacity-40 leading-none">
                      GATE
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="meta text-[11px]">GATE CSE · {doc.readingTime} min read</div>
                    <h3 className="font-serif text-[18px] text-ink mt-1.5 leading-tight tracking-tight group-hover:text-amber-700 transition-colors">
                      {cleanChapterTitle(doc.title)}
                    </h3>
                    <p className="text-[13px] text-ink-3 mt-2 leading-relaxed line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11.5px] text-ink-4 inline-flex items-center gap-1.5">
                        <BookOpen className="h-3 w-3" /> Start reading
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-ink-4 group-hover:text-amber-700 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {[
                { icon: <Flame className="h-4 w-4" />, tone: 'text-amber-700', label: 'Current streak', value: '—', sub: 'days' },
                { icon: <Clock className="h-4 w-4" />, tone: 'text-ink-blue', label: 'This week', value: '—', sub: 'of 5h goal' },
                { icon: <BookOpen className="h-4 w-4" />, tone: 'text-sage', label: 'Readings', value: '—', sub: 'all time' },
                { icon: <Bookmark className="h-4 w-4" />, tone: 'text-clay', label: 'Bookmarks', value: '—', sub: 'saved' },
              ].map((s) => (
                <div key={s.label} className="card-surface bg-surface-2 p-4">
                  <div className={`inline-flex items-center gap-2 ${s.tone}`}>
                    {s.icon}
                    <span className="meta text-ink-4">{s.label}</span>
                  </div>
                  <div className="font-serif text-[28px] text-ink mt-2 tracking-tight leading-none">
                    {s.value}
                  </div>
                  <div className="meta text-[11.5px] mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT RAIL */}
          <aside className="space-y-5">
            {/* Session info */}
            <div className="card-surface bg-surface-2 p-5">
              <div className="meta text-[11px] uppercase tracking-[0.04em]">Session</div>
              <div className="font-serif text-[17px] text-ink mt-1 tracking-tight">
                Signed in as {displayName}
              </div>
              {loggedInAt && (
                <div className="meta text-[11.5px] mt-1">
                  Since {new Date(loggedInAt).toLocaleString()}
                </div>
              )}
            </div>

            {/* Weekly goal placeholder */}
            <div
              className="card-surface p-5"
              style={{ background: 'hsl(var(--ink))', color: 'hsl(var(--bg))', borderColor: 'hsl(var(--ink))' }}
            >
              <div className="text-[10.5px] uppercase tracking-[0.04em]" style={{ color: '#8A8072' }}>
                Weekly goal
              </div>
              <div className="font-serif text-[22px] mt-1.5" style={{ color: 'hsl(var(--bg))' }}>
                5 hours of deep learning
              </div>
              <div className="h-1 rounded-full bg-white/15 mt-4 overflow-hidden">
                <div className="h-full bg-amber" style={{ width: '0%' }} />
              </div>
              <div className="text-[12px] mt-2" style={{ color: '#D8CDB3' }}>
                Progress tracking coming soon
              </div>
            </div>

            {/* Handbooks shortcut */}
            <div>
              <div className="meta text-[11px] uppercase tracking-[0.04em] mb-2.5">
                Also available
              </div>
              <Link
                to="/handbooks"
                className="card-surface bg-surface-2 p-4 flex items-center justify-between group hover:shadow-soft-2 transition-all"
              >
                <div>
                  <div className="text-[13px] font-medium text-ink">Standalone Handbooks</div>
                  <div className="meta text-[11.5px] mt-0.5">SSH · SSL/TLS · Networking · more</div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-4 group-hover:text-amber-700 transition-colors" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
