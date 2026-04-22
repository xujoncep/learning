import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { NotFoundPage } from './NotFoundPage';
import { findDoc, getAdjacentDocs } from '@/lib/content';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { PrevNext } from '@/components/layout/PrevNext';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { DocHeader } from '@/components/layout/DocHeader';
import { ReadingProgress } from '@/components/layout/ReadingProgress';
import { BackToTop } from '@/components/layout/BackToTop';
import { SeoHead } from '@/components/layout/SeoHead';

function DocLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 py-8">
      <div className="h-10 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-4 bg-muted rounded w-5/6" />
      <div className="h-40 bg-muted rounded" />
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-2/3" />
    </div>
  );
}

export function DocPage() {
  const params = useParams();
  const slug = params['*'] ?? '';

  const doc = findDoc(slug);

  useEffect(() => {
    if (doc) {
      // Restore scroll position if cached; otherwise scroll top.
      const cached = sessionStorage.getItem(`scroll:${doc.slug}`);
      if (cached) {
        window.scrollTo({ top: parseInt(cached, 10), behavior: 'auto' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  }, [doc]);

  useEffect(() => {
    if (!doc) return;
    const onScroll = () => {
      sessionStorage.setItem(`scroll:${doc.slug}`, String(window.scrollY));
    };
    let timeout: number;
    const debounced = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(onScroll, 150);
    };
    window.addEventListener('scroll', debounced, { passive: true });
    return () => {
      window.removeEventListener('scroll', debounced);
      window.clearTimeout(timeout);
    };
  }, [doc]);

  if (!doc) return <NotFoundPage />;

  const { prev, next } = getAdjacentDocs(slug);
  const Content = doc.Component;

  return (
    <>
      <SeoHead
        title={`${doc.title} · Learning Hub`}
        description={doc.description}
        canonical={doc.path}
      />
      <ReadingProgress />
      <BackToTop />

      <div className="flex animate-fade-in">
        <div className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 py-8 md:py-12 max-w-4xl mx-auto w-full">
          <DocHeader
            title={doc.title}
            section={doc.section}
            readingTime={doc.readingTime}
            wordCount={doc.wordCount}
          />
          <article className="prose-custom">
            <Suspense fallback={<DocLoadingSkeleton />}>
              <MDXProvider components={mdxComponents}>
                <Content />
              </MDXProvider>
            </Suspense>
          </article>
          <PrevNext prev={prev} next={next} />
        </div>

        <aside className="hidden xl:block w-56 shrink-0 border-l border-border/50 py-12 px-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
