import { useState, type HTMLAttributes } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreProps extends HTMLAttributes<HTMLPreElement> {
  'data-language'?: string;
  'data-theme'?: string;
}

export function Pre({ children, className, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);
  const language = props['data-language'];

  const handleCopy = () => {
    const code = extractTextContent(children);
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="relative group my-6 rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      {language && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/50">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy code'}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-border bg-background hover:bg-accent transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-green-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </button>
        </div>
      )}
      {!language && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy code'}
          className="absolute right-2 top-2 h-7 w-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur border border-border rounded-md z-10"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      )}
      <pre
        className={cn('overflow-x-auto px-4 py-4 text-sm leading-relaxed', className)}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

function extractTextContent(node: unknown): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractTextContent).join('');
  if (
    node &&
    typeof node === 'object' &&
    'props' in node &&
    node.props &&
    typeof node.props === 'object' &&
    'children' in node.props
  ) {
    return extractTextContent((node.props as { children: unknown }).children);
  }
  return '';
}
