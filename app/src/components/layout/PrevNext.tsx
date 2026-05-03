import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { DocEntry } from '@/lib/content';

interface PrevNextProps {
  prev?: DocEntry;
  next?: DocEntry;
}

export function PrevNext({ prev, next }: PrevNextProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-12 pt-6 border-t border-line grid grid-cols-2 gap-3">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex flex-col gap-1.5 p-3 rounded-lg border border-line hover:border-amber/50 hover:bg-sand-2 transition-all"
        >
          <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-ink-4 group-hover:text-amber-700 transition-colors">
            <ArrowLeft className="h-3 w-3" /> Previous
          </span>
          <span className="text-[13px] text-ink leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group flex flex-col items-end gap-1.5 p-3 rounded-lg border border-line hover:border-amber/50 hover:bg-sand-2 transition-all text-right"
        >
          <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-ink-4 group-hover:text-amber-700 transition-colors">
            Next <ArrowRight className="h-3 w-3" />
          </span>
          <span className="text-[13px] text-ink leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
