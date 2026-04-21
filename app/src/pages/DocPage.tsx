import { useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { NotFoundPage } from './NotFoundPage';
import { findDoc, getAdjacentDocs } from '@/lib/content';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { PrevNext } from '@/components/layout/PrevNext';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { useEffect } from 'react';

export function DocPage() {
  const params = useParams();
  const slug = params['*'] ?? '';

  const doc = findDoc(slug);

  useEffect(() => {
    if (doc) {
      document.title = `${doc.title} · Learning Hub`;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [doc]);

  if (!doc) return <NotFoundPage />;

  const { prev, next } = getAdjacentDocs(slug);
  const Content = doc.Component;

  return (
    <div className="flex animate-fade-in">
      <div className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 py-8 md:py-12 max-w-4xl mx-auto w-full">
        <article className="prose-custom">
          <MDXProvider components={mdxComponents}>
            <Content />
          </MDXProvider>
        </article>
        <PrevNext prev={prev} next={next} />
      </div>

      {/* TOC sidebar */}
      <aside className="hidden xl:block w-56 shrink-0 border-l border-border/50 py-12 px-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <TableOfContents />
      </aside>
    </div>
  );
}
