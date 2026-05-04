import { Suspense, useEffect, useState, type ComponentType } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { NotFoundPage } from './NotFoundPage';
import { findDoc, getAdjacentDocs, isGatedSection, type DocEntry } from '@/lib/content';
import { useAuth } from '@/lib/auth';
import { recordReadingEvent, flushReadingHeartbeat } from '@/lib/api';
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

// Heartbeat-style reading tracker. Sends:
//   - one mount event with seconds=0 so the chapter shows up in "recent"
//     immediately, even before any active time accumulates;
//   - a heartbeat row every HEARTBEAT_INTERVAL_S of *visible* time;
//   - a final flush on unmount or pagehide via fetch keepalive.
//
// Active time is accumulated only while the tab is visible (Page Visibility
// API). Switching tabs / minimizing pauses the count; coming back resumes
// it. A per-tick cap guards against the timer being suspended (battery
// saver, throttled background) and then claiming hours of "reading".
const HEARTBEAT_INTERVAL_S = 30;
const TICK_MS = 1000;
const MAX_TICK_DELTA_S = 5;

function useReadingHeartbeat(doc: DocEntry, isAuthenticated: boolean) {
  useEffect(() => {
    if (!isAuthenticated) return;
    if (typeof document === 'undefined') return;

    const meta = { slug: doc.slug, title: doc.title, section: doc.section };

    // Initial visit row — duration 0, so the chapter shows up in "recent" on
    // dashboard even if the reader leaves before any heartbeat fires.
    recordReadingEvent({ ...meta, seconds: 0 });

    let activeSeconds = 0;
    let lastTick = Date.now();
    let isVisible = !document.hidden;

    const sendHeartbeat = () => {
      if (activeSeconds < 1) return;
      const seconds = activeSeconds;
      activeSeconds = 0;
      recordReadingEvent({ ...meta, seconds });
    };

    const interval = window.setInterval(() => {
      if (isVisible) {
        const now = Date.now();
        const delta = (now - lastTick) / 1000;
        activeSeconds += Math.min(delta, MAX_TICK_DELTA_S);
        lastTick = now;
        if (activeSeconds >= HEARTBEAT_INTERVAL_S) sendHeartbeat();
      } else {
        // While hidden the cursor stays frozen; reset on resume so the
        // visible→visible delta doesn't include hidden time.
        lastTick = Date.now();
      }
    }, TICK_MS);

    const onVisibilityChange = () => {
      const wasVisible = isVisible;
      isVisible = !document.hidden;
      if (wasVisible && !isVisible) {
        // Going hidden — flush whatever's accumulated so the dashboard is
        // close to real-time even if the user never closes the tab.
        sendHeartbeat();
      } else if (!wasVisible && isVisible) {
        lastTick = Date.now();
      }
    };

    const onPageHide = () => {
      flushReadingHeartbeat({ ...meta, seconds: Math.floor(activeSeconds) });
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onPageHide);
      // Flush remaining seconds on chapter change. Use the keepalive variant
      // because the previous chapter's React tree may unmount during navigation.
      flushReadingHeartbeat({ ...meta, seconds: Math.floor(activeSeconds) });
    };
  }, [doc.slug, doc.title, doc.section, isAuthenticated]);
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

// Legacy slugs that have been split into per-LEVEL course sections.
// Redirect to the new master index so old bookmarks and external links still work.
const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  'c-programming-hand-book': '/docs/c-programming/00-master-index',
  'computer-networking-hand-book': '/docs/computer-networking/00-master-index',
  'bb-dsa-master-index': '/docs/bb-dsa/00-master-index',
  'bb-dsa-arrays-linkedlist': '/docs/bb-dsa/01-arrays-linkedlist',
  'bb-dsa-stack-queue': '/docs/bb-dsa/02-stack-queue',
  'bb-dsa-tree-bst': '/docs/bb-dsa/03-tree-bst',
  'bb-dsa-sorting-searching': '/docs/bb-dsa/04-sorting-searching',
  'dsa-graph-hashing-dp': '/docs/bb-dsa/05-graph-hashing-dp',
  'bb-dsa-mcq-150': '/docs/bb-dsa/06-mcq-150',
};

export function DocPage() {
  const params = useParams();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const slug = params['*'] ?? '';

  const legacyTarget = LEGACY_SLUG_REDIRECTS[slug];
  if (legacyTarget) return <Navigate to={legacyTarget} replace />;

  const doc = findDoc(slug);

  if (!doc) return <NotFoundPage />;

  // Gate: course sections (gate-cse, c-programming, computer-networking) require login; root handbooks stay public.
  if (isGatedSection(doc.section) && !isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  const isCourse = doc.section !== 'root';
  return isCourse ? <CourseView doc={doc} /> : <ArticleView doc={doc} />;
}

function CourseView({ doc }: { doc: DocEntry }) {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(COURSE_SIDEBAR_KEY) !== 'false';
  });

  useEffect(() => {
    localStorage.setItem(COURSE_SIDEBAR_KEY, String(sidebarOpen));
  }, [sidebarOpen]);

  useReadingHeartbeat(doc, isAuthenticated);
  useScrollRestore(doc.slug);

  const { prev, next } = getAdjacentDocs(doc.slug);
  const Content = doc.Component as ComponentType;

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead title={`${doc.title} · Porhi`} description={doc.description} canonical={doc.path} />
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
          <aside className="hidden md:block w-64 shrink-0 border-r border-border/60 sticky top-[68px] h-[calc(100vh-68px)]">
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
  const { isAuthenticated } = useAuth();
  useReadingHeartbeat(doc, isAuthenticated);
  useScrollRestore(doc.slug);
  const Content = doc.Component as ComponentType;

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead title={`${doc.title} · Porhi`} description={doc.description} canonical={doc.path} />
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
