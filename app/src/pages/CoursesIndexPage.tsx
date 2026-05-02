import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronRight, Lock } from 'lucide-react';
import { isGatedSection, getSubjects } from '@/lib/content';
import { useAuth } from '@/lib/auth';

const TONES = [
  'from-amber-50 to-amber-100',
  'from-[#E0E7F0] to-[#C8D6E8]',
  'from-[#E7F0E3] to-[#C8DDB8]',
  'from-[#FCE7D8] to-[#F5C9A3]',
  'from-[#E8DFF0] to-[#CFC0DF]',
  'from-[#F0E0D8] to-[#E0C8B0]',
];

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
        {subjects.map(({ id, title, icon, description, sections: subSections }, i) => {
          const hasMultiple = subSections.length > 1;
          const isGated = subSections.some((s) => isGatedSection(s.id));

          const to = hasMultiple
            ? `/subjects/${id}`
            : isGated && !isAuthenticated
              ? `/login?next=/sections/${subSections[0].id}`
              : `/sections/${subSections[0].id}`;

          return (
            <Link
              key={id}
              to={to}
              className="group card-surface bg-surface-2 overflow-hidden hover:shadow-soft-2 transition-all flex flex-col"
            >
              {/* Banner */}
              <div
                className={`h-[160px] relative bg-gradient-to-br ${TONES[i % TONES.length]} border-b border-line overflow-hidden`}
              >
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-[6px] bg-surface-2/95 text-[11px] font-medium text-ink-2">
                  {hasMultiple ? `${subSections.length} tracks` : 'Course'}
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-[8px] bg-surface-2/90 text-ink-3 flex items-center justify-center">
                  {isGated && !isAuthenticated ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <BookOpen className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="absolute bottom-3.5 left-4 font-serif text-[44px] leading-none opacity-90">
                  {icon}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                {hasMultiple && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {subSections.map((s) => (
                      <span
                        key={s.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sand text-[10.5px] text-ink-3 border border-line"
                      >
                        {s.icon} {s.label}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="font-serif text-[20px] text-ink mt-1 leading-[1.25] tracking-[-0.015em] group-hover:text-amber-700 transition-colors">
                  {title}
                </h3>

                <p className="text-[13px] text-ink-3 mt-2 leading-[1.55] flex-1 line-clamp-3">
                  {description}
                </p>

                <div className="border-t border-line border-dashed mt-3 pt-3 flex items-center justify-between">
                  <span className="text-[11.5px] text-ink-4 inline-flex items-center gap-1.5">
                    {isGated && !isAuthenticated ? (
                      <>
                        <Lock className="h-3 w-3" /> Sign in to start
                      </>
                    ) : hasMultiple ? (
                      <>
                        <ChevronRight className="h-3 w-3" /> Choose track
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
