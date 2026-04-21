import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, ExternalLink, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link to="/" className="flex items-center gap-2 font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Learning Hub
          </span>
        </Link>

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
    </header>
  );
}
