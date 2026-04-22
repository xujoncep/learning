import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showSearch?: boolean;
  showFooter?: boolean;
}

export function Layout({
  children,
  showSidebar = false,
  showSearch = false,
  showFooter = true,
}: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-sand text-ink-2">
      <Header
        onMenuClick={() => setMobileOpen(true)}
        showMenu={showSidebar}
        showSearch={showSearch}
      />
      {showSidebar && <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />}

      <div className="flex flex-1">
        {showSidebar && (
          <aside className="hidden md:block w-64 border-r border-line shrink-0 h-[calc(100vh-4rem)] sticky top-16 bg-sand-2/40">
            <Sidebar />
          </aside>
        )}

        <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 focus:outline-none">
          {children}
        </main>
      </div>

      {showFooter && <Footer />}
    </div>
  );
}
