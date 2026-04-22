import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { search, type SearchHit } from '@/lib/search';
import { cn } from '@/lib/utils';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo<SearchHit[]>(() => {
    const q = query.trim();
    if (!q) return [];
    return search(q, 10);
  }, [query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIdx(0);
    }
  }, [open]);

  const go = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const hit = results[activeIdx];
      if (hit) go(hit.path);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-[15%] z-50 w-[92vw] max-w-2xl -translate-x-1/2 rounded-xl border border-border bg-popover shadow-2xl outline-none"
          onKeyDown={onKeyDown}
        >
          <Dialog.Title className="sr-only">Search documents</Dialog.Title>
          <Dialog.Description className="sr-only">
            Full-text search across all learning hub documents
          </Dialog.Description>

          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents, concepts, PYQs..."
              className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
            />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close search"
                className="p-1 rounded-md hover:bg-accent text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          {query.trim() === '' ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Type to search across 20+ documents, PYQs and diagrams.
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results for "<span className="text-foreground font-medium">{query}</span>"
            </div>
          ) : (
            <ul ref={listRef} className="max-h-[60vh] overflow-auto py-2">
              {results.map((hit, i) => (
                <li key={hit.slug}>
                  <button
                    type="button"
                    onClick={() => go(hit.path)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={cn(
                      'w-full text-left px-4 py-3 transition-colors',
                      activeIdx === i
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/40'
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium truncate">{hit.title}</span>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground shrink-0">
                        {hit.section}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      <Highlight text={hit.snippet} term={query} />
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="hidden sm:flex items-center justify-between gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <kbd className="inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5">
                <ArrowUp className="h-3 w-3" /> <ArrowDown className="h-3 w-3" />
              </kbd>
              navigate
              <kbd className="inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5">
                <CornerDownLeft className="h-3 w-3" />
              </kbd>
              open
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5">esc</kbd>
              close
            </div>
            <span>Full-text search · FlexSearch</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Highlight({ text, term }: { text: string; term: string }) {
  const t = term.trim();
  if (!t) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escape(t)})`, 'gi'));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === t.toLowerCase() ? (
          <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
