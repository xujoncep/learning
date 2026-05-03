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

// Desktop nav stays slim to avoid tablet crowding — links to courses live on /home tracks
// and via the section pages themselves. The mobile dropdown shows all sections explicitly.
const PUBLIC_DESKTOP_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Handbooks', to: '/handbooks' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
];

const AUTHED_DESKTOP_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Courses', to: '/courses' },
  { label: 'Handbooks', to: '/handbooks' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
];

const COURSE_SECTIONS = [
  { label: 'GATE CSE', to: '/sections/gate-cse' },
  { label: 'C Programming', to: '/sections/c-programming' },
  { label: 'Cyber Security', to: '/sections/cyber-security' },
  { label: 'Computer Networking', to: '/sections/computer-networking' },
  { label: 'DBMS', to: '/sections/dbms' },
  { label: 'Operating System', to: '/sections/operating-system' },
  { label: 'System Design', to: '/sections/system-design' },
];

const PRIMARY_ITEM_CLASS =
  'flex items-center px-3 py-2 text-sm rounded-md cursor-pointer outline-none transition-colors text-ink-2 data-[highlighted]:bg-sand-2 data-[highlighted]:text-ink';

const COURSE_ITEM_CLASS =
  'flex items-center px-3 py-1.5 text-[13px] rounded-md cursor-pointer outline-none transition-colors text-ink-3 data-[highlighted]:bg-sand-2 data-[highlighted]:text-ink';

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

  const desktopLinks = isAuthenticated ? AUTHED_DESKTOP_LINKS : PUBLIC_DESKTOP_LINKS;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-ink focus:text-sand focus:rounded-md"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-line bg-sand/90 backdrop-blur-md supports-[backdrop-filter]:bg-sand/80">
        <div className="flex h-[68px] items-center gap-4 px-4 md:px-8">
          {showMenu ? (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-3 hover:bg-sand-2 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  aria-label="Open navigation"
                  className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-3 hover:bg-sand-2 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={8}
                  align="start"
                  className="z-50 min-w-[200px] rounded-xl border border-line bg-surface-2 p-1.5 shadow-soft-3 animate-fade-in"
                >
                  <DropdownMenu.Item asChild>
                    <Link to={isAuthenticated ? '/dashboard' : '/'} className={PRIMARY_ITEM_CLASS}>
                      {isAuthenticated ? 'Dashboard' : 'Home'}
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link to="/courses" className={PRIMARY_ITEM_CLASS}>
                      All courses
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link to="/handbooks" className={PRIMARY_ITEM_CLASS}>
                      Handbooks
                    </Link>
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="my-1 h-px bg-line" />

                  <DropdownMenu.Label className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-4">
                    Courses
                  </DropdownMenu.Label>
                  {COURSE_SECTIONS.map((s) => (
                    <DropdownMenu.Item key={s.to} asChild>
                      <Link to={s.to} className={COURSE_ITEM_CLASS}>
                        {s.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}

                  <DropdownMenu.Separator className="my-1 h-px bg-line" />

                  <DropdownMenu.Item asChild>
                    <Link to="/about" className={PRIMARY_ITEM_CLASS}>
                      About
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link to="/blog" className={PRIMARY_ITEM_CLASS}>
                      Blog
                    </Link>
                  </DropdownMenu.Item>

                  {!isAuthenticated && (
                    <>
                      <DropdownMenu.Separator className="my-1 h-px bg-line" />
                      <DropdownMenu.Item asChild>
                        <Link
                          to="/login"
                          className="flex items-center px-3 py-2 text-sm rounded-md cursor-pointer outline-none transition-colors text-amber-700 font-medium data-[highlighted]:bg-amber-50"
                        >
                          Sign in
                        </Link>
                      </DropdownMenu.Item>
                    </>
                  )}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}

          <Logo />

          <nav className="hidden md:flex items-center gap-7 ml-7">
            {desktopLinks.map((l) => (
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
              className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-[8px] border border-line bg-sand-2 hover:bg-sand-3 transition-colors text-[12.5px] text-ink-4"
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
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-3 hover:bg-sand-2 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          {/* Font size dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                aria-label="Text size"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-3 hover:bg-sand-2 transition-colors"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-3 hover:bg-sand-2 transition-colors"
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
