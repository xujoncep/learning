import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookmark } from '@/lib/bookmarks';
import { cn } from '@/lib/utils';
import type { DocEntry } from '@/lib/content';

interface TutorialControlsProps {
  prev?: DocEntry;
  next?: DocEntry;
  slug: string;
}

export function TutorialControls({ prev, next, slug }: TutorialControlsProps) {
  const [bookmarked, toggle] = useBookmark(slug);

  return (
    <div className="flex items-center justify-between gap-3 my-6 pb-6 border-b border-border/60">
      <div className="flex items-center gap-2">
        <NavButton to={prev?.path} label="Previous" direction="prev" disabled={!prev} />
        <NavButton to={next?.path} label="Next" direction="next" disabled={!next} />
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        aria-pressed={bookmarked}
        className={cn(
          'transition-colors',
          bookmarked && 'text-primary hover:text-primary/80'
        )}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-5 w-5 fill-current" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}

interface NavButtonProps {
  to?: string;
  label: string;
  direction: 'prev' | 'next';
  disabled: boolean;
}

function NavButton({ to, label, direction, disabled }: NavButtonProps) {
  const content = (
    <span className="inline-flex items-center gap-1.5">
      {direction === 'prev' && <ChevronLeft className="h-4 w-4" />}
      {label}
      {direction === 'next' && <ChevronRight className="h-4 w-4" />}
    </span>
  );

  const classes = cn(
    'inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-semibold transition-all',
    disabled
      ? 'bg-muted text-muted-foreground opacity-60 cursor-not-allowed'
      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow'
  );

  if (disabled || !to) {
    return (
      <span className={classes} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
