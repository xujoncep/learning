import { useState, type HTMLAttributes } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PreProps extends HTMLAttributes<HTMLPreElement> {
  'data-language'?: string;
}

export function Pre({ children, className, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);
  const language = props['data-language'];

  const handleCopy = () => {
    const code = extractTextContent(children);
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group my-6">
      {language && (
        <span className="absolute left-3 top-2 text-xs font-mono text-muted-foreground opacity-60">
          {language}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute right-2 top-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur border border-border z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>
      <pre
        className={cn(
          'overflow-x-auto rounded-lg border border-border bg-card px-4 py-4 text-sm leading-relaxed shadow-sm',
          language ? 'pt-8' : '',
          className
        )}
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
