import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, ExternalLink, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/lib/theme';
import { docs } from '@/lib/content';

interface HeaderProps {
  onMenuClick: () => void;
  showMenu?: boolean;
  showSearch?: boolean;
}

export function Header({ onMenuClick, showMenu = false, showSearch = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredDocs = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    return docs
      .filter((doc) => {
        return (
          doc.title.toLowerCase().includes(term) ||
          doc.slug.toLowerCase().includes(term) ||
          doc.section.toLowerCase().includes(term)
        );
      })
      .slice(0, 8);
  }, [query]);

  const handleDocSelect = (path: string) => {
    setQuery('');
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
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
          <div className="hidden md:block relative w-full max-w-xl mx-2">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 120)}
              placeholder="Search documents..."
              className="h-9 pl-9"
            />

            {isSearchOpen && query.trim() && (
              <div className="absolute top-11 left-0 z-50 w-full rounded-md border border-border bg-popover shadow-lg overflow-hidden">
                {filteredDocs.length > 0 ? (
                  <ul className="max-h-72 overflow-auto py-1">
                    {filteredDocs.map((doc) => (
                      <li key={doc.slug}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleDocSelect(doc.path)}
                          className="w-full text-left px-3 py-2 hover:bg-accent transition-colors"
                        >
                          <div className="font-medium text-sm truncate">{doc.title}</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide">
                            {doc.section}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-3 py-2 text-sm text-muted-foreground">No matching document found</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open('https://github.com/sujoncep/learning', '_blank')}
          aria-label="GitHub"
          className="hidden sm:inline-flex"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {showSearch && (
        <div className="md:hidden border-t border-border/60 px-4 pb-3 pt-2 relative">
          <Search className="h-4 w-4 text-muted-foreground absolute left-7 top-1/2 -translate-y-1/2" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 120)}
            placeholder="Search documents..."
            className="h-9 pl-9"
          />

          {isSearchOpen && query.trim() && (
            <div className="absolute top-12 left-4 right-4 z-50 rounded-md border border-border bg-popover shadow-lg overflow-hidden">
              {filteredDocs.length > 0 ? (
                <ul className="max-h-72 overflow-auto py-1">
                  {filteredDocs.map((doc) => (
                    <li key={doc.slug}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleDocSelect(doc.path)}
                        className="w-full text-left px-3 py-2 hover:bg-accent transition-colors"
                      >
                        <div className="font-medium text-sm truncate">{doc.title}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                          {doc.section}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-2 text-sm text-muted-foreground">No matching document found</p>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
