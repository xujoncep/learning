import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Lock } from 'lucide-react';
import { sections, getSectionMeta, isGatedSection } from '@/lib/content';
import { useAuth } from '@/lib/auth';

const TONES = [
  'from-amber-50 to-amber-100',
  'from-[#E0E7F0] to-[#C8D6E8]', // ink-blue tinted
  'from-[#E7F0E3] to-[#C8DDB8]', // sage tinted
  'from-[#FCE7D8] to-[#F5C9A3]', // clay tinted
  'from-[#E8DFF0] to-[#CFC0DF]', // purple tinted
  'from-[#F0E0D8] to-[#E0C8B0]', // sand tinted
];

export function CoursesIndexPage() {
  const { isAuthenticated } = useAuth();

  // Show every registered section that has docs and isn't the root handbooks bucket.
  const courseSections = sections
    .filter((s) => s.id !== 'root' && s.docs.length > 0)
    .map((s) => ({ section: s, meta: getSectionMeta(s.id) }))
    .sort((a, b) => (a.meta?.order ?? 99) - (b.meta?.order ?? 99));

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
            প্রতিটা course একটা subject-কে beginner থেকে interview-ready পর্যন্ত cover করে। কোনো একটাতে click করো — chapters card-format-এ খুলবে।
          </p>
        </div>
        <div className="meta shrink-0">
          {courseSections.length} courses · curated learning paths
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {courseSections.map(({ section, meta }, i) => {
          const gated = isGatedSection(section.id);
          const to = gated && !isAuthenticated
            ? `/login?next=/sections/${section.id}`
            : `/sections/${section.id}`;

          return (
            <Link
              key={section.id}
              to={to}
              className="group card-surface bg-surface-2 overflow-hidden hover:shadow-soft-2 transition-all flex flex-col"
            >
              {/* Banner */}
              <div
                className={`h-[160px] relative bg-gradient-to-br ${TONES[i % TONES.length]} border-b border-line overflow-hidden`}
              >
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-[6px] bg-surface-2/95 text-[11px] font-medium text-ink-2">
                  Course
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-[8px] bg-surface-2/90 text-ink-3 flex items-center justify-center">
                  {gated && !isAuthenticated ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <BookOpen className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="absolute bottom-3.5 left-4 font-serif text-[44px] leading-none opacity-90">
                  {section.icon}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-ink-4 text-[11.5px]">
                  <span>{section.docs.length} chapters</span>
                  <span>·</span>
                  <span>complete course</span>
                </div>

                <h3 className="font-serif text-[20px] text-ink mt-2.5 leading-[1.25] tracking-[-0.015em] group-hover:text-amber-700 transition-colors">
                  {section.title}
                </h3>

                <p className="text-[13px] text-ink-3 mt-2 leading-[1.55] flex-1 line-clamp-3">
                  {meta?.description ?? `Explore every chapter under ${section.title}.`}
                </p>

                <div className="border-t border-line border-dashed mt-3 pt-3 flex items-center justify-between">
                  <span className="text-[11.5px] text-ink-4 inline-flex items-center gap-1.5">
                    {gated && !isAuthenticated ? (
                      <>
                        <Lock className="h-3 w-3" /> Sign in to start
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-3 w-3" /> Open course
                      </>
                    )}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-ink-4 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
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
