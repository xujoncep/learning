import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showSearch?: boolean;
}

export function Layout({ children, showSidebar = false, showSearch = false }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onMenuClick={() => setMobileOpen(true)}
        showMenu={showSidebar}
        showSearch={showSearch}
      />
      {showSidebar && <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />}

      <div className="flex flex-1">
        {showSidebar && (
          <aside className="hidden md:block w-64 border-r border-border/60 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 bg-card/40">
            <Sidebar />
          </aside>
        )}

        <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
