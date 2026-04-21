import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setMobileOpen(true)} />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 border-r border-border/60 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 bg-card/40">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
