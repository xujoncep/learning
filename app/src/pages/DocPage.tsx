import { Suspense, useEffect, useState, type ComponentType } from 'react';
import { useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { NotFoundPage } from './NotFoundPage';
import { findDoc, getAdjacentDocs, type DocEntry } from '@/lib/content';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { Header } from '@/components/layout/Header';
import { DocHeader } from '@/components/layout/DocHeader';
import { ReadingProgress } from '@/components/layout/ReadingProgress';
import { BackToTop } from '@/components/layout/BackToTop';
import { SeoHead } from '@/components/layout/SeoHead';
import { PrevNext } from '@/components/layout/PrevNext';
import { TutorialControls } from '@/components/layout/TutorialControls';
import { CourseSidebar, CollapsedRail } from '@/components/layout/CourseSidebar';
import { CourseMobileNav } from '@/components/layout/CourseMobileNav';

const COURSE_SIDEBAR_KEY = 'course-sidebar-open';

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

function useScrollRestore(slug: string) {
  useEffect(() => {
    const cached = sessionStorage.getItem(`scroll:${slug}`);
    window.scrollTo({ top: cached ? parseInt(cached, 10) : 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    let timeout: number;
    const debounced = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        sessionStorage.setItem(`scroll:${slug}`, String(window.scrollY));
      }, 150);
    };
    window.addEventListener('scroll', debounced, { passive: true });
    return () => {
      window.removeEventListener('scroll', debounced);
      window.clearTimeout(timeout);
    };
  }, [slug]);
}

export function DocPage() {
  const params = useParams();
  const slug = params['*'] ?? '';
  const doc = findDoc(slug);

  if (!doc) return <NotFoundPage />;

  const isCourse = doc.section !== 'root';
  return isCourse ? <CourseView doc={doc} /> : <ArticleView doc={doc} />;
}

function CourseView({ doc }: { doc: DocEntry }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(COURSE_SIDEBAR_KEY) !== 'false';
  });

  useEffect(() => {
    localStorage.setItem(COURSE_SIDEBAR_KEY, String(sidebarOpen));
  }, [sidebarOpen]);

  useScrollRestore(doc.slug);

  const { prev, next } = getAdjacentDocs(doc.slug);
  const Content = doc.Component as ComponentType;

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead title={`${doc.title} · Learning Hub`} description={doc.description} canonical={doc.path} />
      <Header onMenuClick={() => setMobileOpen(true)} showMenu showSearch />
      <CourseMobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        section={doc.section}
        currentSlug={doc.slug}
      />
      <ReadingProgress />
      <BackToTop />

      <div className="flex flex-1">
        {sidebarOpen ? (
          <aside className="hidden md:block w-64 shrink-0 border-r border-border/60 sticky top-14 h-[calc(100vh-3.5rem)]">
            <CourseSidebar
              section={doc.section}
              currentSlug={doc.slug}
              onCollapse={() => setSidebarOpen(false)}
            />
          </aside>
        ) : (
          <CollapsedRail onExpand={() => setSidebarOpen(true)} />
        )}

        <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 focus:outline-none">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-10 w-full animate-fade-in">
            <DocHeader
              title={doc.title}
              section={doc.section}
              readingTime={doc.readingTime}
              wordCount={doc.wordCount}
            />
            <TutorialControls prev={prev} next={next} slug={doc.slug} />
            <article className="prose-custom">
              <Suspense fallback={<DocLoadingSkeleton />}>
                <MDXProvider components={mdxComponents}>
                  <Content />
                </MDXProvider>
              </Suspense>
            </article>
            <PrevNext prev={prev} next={next} />
          </div>
        </main>
      </div>
    </div>
  );
}

function ArticleView({ doc }: { doc: DocEntry }) {
  useScrollRestore(doc.slug);
  const Content = doc.Component as ComponentType;

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead title={`${doc.title} · Learning Hub`} description={doc.description} canonical={doc.path} />
      <Header onMenuClick={() => {}} showMenu={false} showSearch />
      <ReadingProgress />
      <BackToTop />

      <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 focus:outline-none">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14 w-full animate-fade-in">
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
        </div>
      </main>
    </div>
  );
}
