import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, Lock } from 'lucide-react';
import { sections, isGatedSection, getSubjectMeta } from '@/lib/content';
import { useAuth } from '@/lib/auth';

const TONES = [
  'from-amber-50 to-amber-100',
  'from-[#E0E7F0] to-[#C8D6E8]',
  'from-[#E7F0E3] to-[#C8DDB8]',
  'from-[#FCE7D8] to-[#F5C9A3]',
  'from-[#E8DFF0] to-[#CFC0DF]',
  'from-[#F0E0D8] to-[#E0C8B0]',
];

const LABEL_DESCRIPTIONS: Record<string, string> = {
  Concepts: 'Core theory, diagrams, deep-dive explanations — পুরো syllabus একসাথে।',
  'Written Questions': 'Short ও broad written questions with model answers — exam-এ directly কাজে লাগবে।',
  'MCQ Practice': 'Option-based practice with Bangla explanation ও exam tips — fast revision।',
  Course: 'Complete course material — theory থেকে practice পর্যন্ত।',
};

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

  return (
    <div className="animate-fade-in max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-14">
      {/* Breadcrumb */}
      <div className="text-[12.5px] text-ink-4 mb-4">
        <Link to="/" className="hover:text-ink transition-colors">
          Home
        </Link>{' '}
        /{' '}
        <Link to="/courses" className="hover:text-ink transition-colors">
          Courses
        </Link>{' '}
        / <span className="text-ink-2">{subject.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 pb-8 border-b border-line">
        <div>
          <div className="meta text-[12px] uppercase tracking-[0.04em]">
            {subject.icon} {subject.title}
          </div>
          <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.02] tracking-[-0.025em] text-ink mt-2">
            Choose your <em className="italic text-amber-700">study mode</em>.
          </h1>
          <p className="text-[15px] text-ink-3 mt-4 max-w-[640px] leading-relaxed">
            {subject.description}
          </p>
        </div>
        <div className="meta shrink-0">{subject.sections.length} tracks available</div>
      </div>

      {/* Sub-section Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {subject.sections.map((subSection, i) => {
          const sectionData = sections.find((s) => s.id === subSection.id);
          const gated = isGatedSection(subSection.id);
          const to =
            gated && !isAuthenticated
              ? `/login?next=/sections/${subSection.id}`
              : `/sections/${subSection.id}`;

          return (
            <Link
              key={subSection.id}
              to={to}
              className="group card-surface bg-surface-2 overflow-hidden hover:shadow-soft-2 transition-all flex flex-col"
            >
              {/* Banner */}
              <div
                className={`h-[140px] relative bg-gradient-to-br ${TONES[i % TONES.length]} border-b border-line overflow-hidden`}
              >
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-[6px] bg-surface-2/95 text-[11px] font-medium text-ink-2">
                  {subSection.label}
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-[8px] bg-surface-2/90 text-ink-3 flex items-center justify-center">
                  {gated && !isAuthenticated ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <BookOpen className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="absolute bottom-3.5 left-4 font-serif text-[44px] leading-none opacity-90">
                  {subSection.icon}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-ink-4 text-[11.5px]">
                  {sectionData ? `${sectionData.docs.length} chapters` : 'Course material'}
                </div>

                <h3 className="font-serif text-[22px] text-ink mt-2 leading-[1.2] tracking-[-0.015em] group-hover:text-amber-700 transition-colors">
                  {subSection.label}
                </h3>

                <p className="text-[13px] text-ink-3 mt-2 leading-[1.55] flex-1">
                  {LABEL_DESCRIPTIONS[subSection.label] ?? `Explore ${subSection.label} materials.`}
                </p>

                <div className="border-t border-line border-dashed mt-3 pt-3 flex items-center justify-between">
                  <span className="text-[11.5px] text-ink-4 inline-flex items-center gap-1.5">
                    {gated && !isAuthenticated ? (
                      <>
                        <Lock className="h-3 w-3" /> Sign in to start
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-3 w-3" /> Open
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
    </div>
  );
}
