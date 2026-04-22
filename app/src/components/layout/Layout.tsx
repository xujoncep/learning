import { type ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  showSearch?: boolean;
  showFooter?: boolean;
}

export function Layout({
  children,
  showSearch = false,
  showFooter = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-sand text-ink-2">
      <Header onMenuClick={() => {}} showSearch={showSearch} />

      <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 focus:outline-none">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
