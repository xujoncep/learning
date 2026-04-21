import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { DocEntry } from '@/lib/content';
import { cn } from '@/lib/utils';

interface PrevNextProps {
  prev?: DocEntry;
  next?: DocEntry;
}

export function PrevNext({ prev, next }: PrevNextProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 pt-8 border-t border-border grid gap-4 md:grid-cols-2">
      {prev ? (
        <Link
          to={prev.path}
          className={cn(
            'group flex flex-col items-start p-4 rounded-lg border border-border bg-card',
            'hover:border-primary/50 hover:bg-accent/30 transition-all'
          )}
        >
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <ArrowLeft className="h-3 w-3" /> Previous
          </span>
          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={next.path}
          className={cn(
            'group flex flex-col items-end p-4 rounded-lg border border-border bg-card text-right',
            'hover:border-primary/50 hover:bg-accent/30 transition-all'
          )}
        >
          <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            Next <ArrowRight className="h-3 w-3" />
          </span>
          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
