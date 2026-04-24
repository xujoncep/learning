import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Lock } from 'lucide-react';
import { sections, cleanChapterTitle, chapterLabel, chapterInitials } from '@/lib/content';
import { useAuth } from '@/lib/auth';

const TONES = [
  'from-amber-50 to-amber-100',
  'from-[#E0E7F0] to-[#C8D6E8]', // ink-blue tinted
  'from-[#E7F0E3] to-[#C8DDB8]', // sage tinted
  'from-[#FCE7D8] to-[#F5C9A3]', // clay tinted
  'from-[#E8DFF0] to-[#CFC0DF]', // purple tinted
];

export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Gate: GATE CSE course requires login.
  if (sectionId === 'gate-cse' && !isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  const sectionData = sections.find((s) => s.id === sectionId);

  if (!sectionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <h1 className="font-serif text-[44px] text-ink mb-3">Section not found</h1>
        <p className="text-ink-3 mb-6">We couldn't find the section you're looking for.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-14">
      {/* Breadcrumb */}
      <div className="text-[12.5px] text-ink-4 mb-4">
        <Link to="/" className="hover:text-ink transition-colors">
          Home
        </Link>{' '}
        /{' '}
        <span className="text-ink-2">{sectionData.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-8 border-b border-line">
        <div>
          <div className="meta text-[12px] uppercase tracking-[0.04em]">Catalog</div>
          <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.02] tracking-[-0.025em] text-ink mt-2">
            {sectionData.title} — <em className="italic text-amber-700">every chapter</em>.
          </h1>
          <p className="text-[15px] text-ink-3 mt-4 max-w-[640px] leading-relaxed">
            {sectionId === 'gate-cse'
              ? 'GATE CSE-র সব subject, PYQ-heavy approach, bilingual explanations — একটা focused course হিসেবে organized।'
              : `Explore all materials under ${sectionData.title}. Any card → start reading.`}
          </p>
        </div>
        <div className="meta shrink-0">
          {sectionData.docs.length} chapters · complete course
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {sectionData.docs.map((doc, i) => (
          <Link
            key={doc.slug}
            to={doc.path}
            className="group card-surface bg-surface-2 overflow-hidden hover:shadow-soft-2 transition-all flex flex-col"
          >
            {/* Banner */}
            <div
              className={`h-[160px] relative bg-gradient-to-br ${TONES[i % TONES.length]} border-b border-line overflow-hidden`}
            >
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-surface-2/95 text-[11px] font-medium text-ink-2">
                {chapterLabel(doc)}
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-2/90 text-ink-3 flex items-center justify-center">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <div className="absolute bottom-3.5 left-4 font-serif italic text-[42px] text-amber-700 opacity-45 leading-none">
                {chapterInitials(doc)}
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-ink-4 text-[11.5px]">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {doc.readingTime} min read
                </span>
                <span>·</span>
                <span>{doc.wordCount.toLocaleString()} words</span>
              </div>

              <h3 className="font-serif text-[19px] text-ink mt-2.5 leading-[1.25] tracking-[-0.015em] group-hover:text-amber-700 transition-colors">
                {cleanChapterTitle(doc.title)}
              </h3>

              <p className="text-[13px] text-ink-3 mt-2 leading-[1.55] flex-1 line-clamp-2">
                {doc.description}
              </p>

              <div className="border-t border-line border-dashed mt-3 pt-3 flex items-center justify-between">
                <span className="text-[11.5px] text-ink-4 inline-flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3" /> Open chapter
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-ink-4 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Signed-in indicator */}
      {sectionId === 'gate-cse' && (
        <div className="mt-12 pt-6 border-t border-line flex items-center justify-center gap-2 text-[12px] text-ink-4">
          <Lock className="h-3 w-3" /> Course content — accessible to signed-in readers
        </div>
      )}
    </div>
  );
}

