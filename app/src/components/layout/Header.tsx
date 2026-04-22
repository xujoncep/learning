import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, ExternalLink, BookOpen, Search, Type } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme';
import { useFontSize } from '@/lib/font-size';
import { SearchDialog } from './SearchDialog';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  showMenu?: boolean;
  showSearch?: boolean;
}

export function Header({ onMenuClick, showMenu = false, showSearch = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
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

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuClick}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <Link to="/" className="flex items-center gap-2 font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Learning Hub
            </span>
          </Link>

          {showSearch && (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search (Ctrl+K)"
              className={cn(
                'hidden md:flex items-center gap-2 w-full max-w-md mx-4 h-9 px-3 rounded-md border border-border bg-background/50 hover:bg-background hover:border-ring transition-colors text-sm text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Search documents...</span>
              <kbd className="hidden lg:inline-flex pointer-events-none select-none items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          )}

          <div className="flex-1" />

          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="icon" aria-label="Text size">
                <Type className="h-4 w-4" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={6}
                align="end"
                className="z-50 min-w-[140px] rounded-md border border-border bg-popover p-1 shadow-lg animate-fade-in"
              >
                {(['sm', 'md', 'lg'] as const).map((size) => (
                  <DropdownMenu.Item
                    key={size}
                    onSelect={() => setFontSize(size)}
                    className={cn(
                      'flex items-center justify-between px-2 py-1.5 text-sm rounded cursor-pointer outline-none',
                      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
                      fontSize === size && 'font-semibold text-primary'
                    )}
                  >
                    <span>
                      {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
                    </span>
                    {fontSize === size && <span aria-hidden>✓</span>}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open('https://github.com/sujoncep/learning', '_blank')}
            aria-label="View on GitHub"
            className="hidden sm:inline-flex"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
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
