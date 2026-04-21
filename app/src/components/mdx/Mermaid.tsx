import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { cn } from '@/lib/utils';

let initialized = false;
function initMermaid() {
  if (initialized) return;
  const isDark = document.documentElement.classList.contains('dark');
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'loose',
    fontFamily: 'Inter, system-ui, sans-serif',
  });
  initialized = true;
}

interface MermaidProps {
  chart: string;
  className?: string;
}

export function Mermaid({ chart, className }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function render() {
      try {
        initMermaid();
        const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
        const { svg } = await mermaid.render(id, chart);
        if (mounted) {
          setSvg(svg);
          setError(null);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      }
    }

    render();

    // Re-render on theme change
    const observer = new MutationObserver(() => {
      initialized = false;
      render();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 p-4 border border-destructive/50 bg-destructive/10 rounded-lg text-sm text-destructive">
        <p className="font-semibold mb-1">Diagram rendering error</p>
        <p className="text-xs opacity-80">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        'my-6 flex justify-center p-6 bg-card rounded-xl border border-border overflow-x-auto shadow-sm',
        className
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
