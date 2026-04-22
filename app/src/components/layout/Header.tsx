import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun, Menu, Search, Type } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTheme } from '@/lib/theme';
import { useFontSize } from '@/lib/font-size';
import { useAuth } from '@/lib/auth';
import { SearchDialog } from './SearchDialog';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  showMenu?: boolean;
  showSearch?: boolean;
}

const PUBLIC_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Handbooks', to: '/handbooks' },
  { label: 'Sections', to: '/sections/gate-cse' },
];

const AUTHED_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Course', to: '/sections/gate-cse' },
  { label: 'Handbooks', to: '/handbooks' },
];

export function Header({ onMenuClick, showMenu = false, showSearch = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
  const { isAuthenticated } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === '/' && !isInEditable(e.target)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const links = isAuthenticated ? AUTHED_LINKS : PUBLIC_LINKS;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-ink focus:text-sand focus:rounded-md"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-line bg-sand/85 backdrop-blur-md supports-[backdrop-filter]:bg-sand/70">
        <div className="flex h-16 items-center gap-4 px-4 md:px-8">
          {showMenu && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-3 hover:bg-sand-2 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Logo />

          <nav className="hidden md:flex items-center gap-6 ml-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'text-[13.5px] transition-colors',
                    isActive ? 'text-ink font-medium' : 'text-ink-3 hover:text-ink'
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search trigger — compact pill */}
          {showSearch && (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search (Ctrl+K)"
              className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-full border border-line bg-sand-2 hover:bg-sand-3 transition-colors text-[12.5px] text-ink-4"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="mono-font text-[10px] px-1.5 py-0.5 rounded bg-sand border border-line text-ink-4">
                ⌘K
              </kbd>
            </button>
          )}

          {showSearch && (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-3 hover:bg-sand-2 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          {/* Font size dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                aria-label="Text size"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-3 hover:bg-sand-2 transition-colors"
              >
                <Type className="h-4 w-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={8}
                align="end"
                className="z-50 min-w-[160px] rounded-xl border border-line bg-surface-2 p-1.5 shadow-soft-3 animate-fade-in"
              >
                {(['sm', 'md', 'lg'] as const).map((size) => (
                  <DropdownMenu.Item
                    key={size}
                    onSelect={() => setFontSize(size)}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer outline-none transition-colors',
                      'data-[highlighted]:bg-sand-2',
                      fontSize === size ? 'text-amber-700 font-medium' : 'text-ink-2'
                    )}
                  >
                    <span>{size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}</span>
                    {fontSize === size && <span aria-hidden>✓</span>}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-3 hover:bg-sand-2 transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Auth CTAs */}
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="text-[13.5px] text-ink-3 hover:text-ink transition-colors"
              >
                Sign in
              </Link>
              <Link to="/login" className="btn btn-sm btn-primary">
                Start free
              </Link>
            </div>
          )}
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

function isInEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}
