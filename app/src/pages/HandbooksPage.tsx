import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SeoHead } from '@/components/layout/SeoHead';
import { sections, cleanChapterTitle, chapterInitials } from '@/lib/content';

export function HandbooksPage() {
  const handbooks = sections.find((s) => s.id === 'root')?.docs ?? [];

  return (
    <Layout showSearch>
      <SeoHead
        title="Handbooks · Porhi"
        description="Standalone deep-dive guides on SSH, SSL/TLS, Networking, C programming, and more — fully public reading."
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Masthead */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="meta text-[12px] uppercase tracking-[0.04em]">The Porhi Journal</div>
            <h1 className="font-serif text-5xl md:text-[60px] font-normal tracking-[-0.03em] leading-[1] mt-3 text-ink">
              Notes on <em className="italic text-amber-700">learning</em>,<br />
              the craft, and the slow career.
            </h1>
          </div>
          <div className="max-w-[320px]">
            <p className="text-[14px] text-ink-3 leading-relaxed">
              Standalone deep-dive handbooks — fully public reading. একটা টপিকে পুরো
              জিনিসটা বুঝতে চাও? এখান থেকে শুরু করো।
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {handbooks.map((doc) => (
            <Link
              key={doc.slug}
              to={doc.path}
              className="group card-surface bg-surface-2 overflow-hidden hover:shadow-soft-2 transition-all flex flex-col"
            >
              <div className="h-[160px] relative bg-gradient-to-br from-amber-50 to-amber-100 border-b border-line overflow-hidden">
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-surface-2/95 text-[11px] font-medium text-ink-2">
                  Handbook
                </div>
                <div className="absolute bottom-4 left-4 font-serif italic text-[44px] text-amber-700 opacity-50 leading-none">
                  {chapterInitials(doc)}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2.5 text-ink-4 text-[11.5px]">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {doc.readingTime} min read
                  </span>
                  <span>·</span>
                  <span>{doc.wordCount.toLocaleString()} words</span>
                </div>
                <h3 className="font-serif text-[20px] text-ink mt-2.5 leading-tight tracking-tight group-hover:text-amber-700 transition-colors">
                  {cleanChapterTitle(doc.title)}
                </h3>
                <p className="text-[13px] text-ink-3 mt-2 leading-relaxed flex-1 line-clamp-3">
                  {doc.description}
                </p>
                <div className="mt-4 pt-3 border-t border-line border-dashed flex items-center justify-between">
                  <span className="text-[11.5px] text-ink-4 inline-flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" /> Read handbook
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-ink-4 group-hover:text-amber-700 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}

          {handbooks.length === 0 && (
            <div className="col-span-full text-center py-20 text-ink-4">
              কোনো handbook এখনো পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
