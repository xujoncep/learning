import { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import * as Dialog from '@radix-ui/react-dialog';
import { Maximize2, X, Download } from 'lucide-react';
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
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

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
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      }
    }

    render();

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

  const downloadSvg = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagram-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="my-6 p-4 border border-destructive/50 bg-destructive/10 rounded-lg text-sm text-destructive">
        <p className="font-semibold mb-1">Diagram rendering error</p>
        <p className="text-xs opacity-80">{error}</p>
      </div>
    );
  }

  return (
    <>
      <figure
        className={cn(
          'relative group my-6 flex justify-center items-center p-6 bg-card rounded-xl border border-border overflow-x-auto shadow-sm',
          className
        )}
      >
        <button
          type="button"
          onClick={() => setFullscreen(true)}
          aria-label="Open diagram fullscreen"
          className="absolute right-3 top-3 p-2 rounded-md bg-background/70 backdrop-blur border border-border opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity z-10 hover:bg-background"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
        <div
          className="mermaid-content w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </figure>

      <Dialog.Root open={fullscreen} onOpenChange={setFullscreen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-50 flex flex-col outline-none">
            <Dialog.Title className="sr-only">Diagram fullscreen view</Dialog.Title>
            <Dialog.Description className="sr-only">
              Zoomed-in view of the diagram
            </Dialog.Description>
            <div className="flex items-center justify-end gap-2 p-3 border-b border-border bg-background/80 backdrop-blur">
              <button
                type="button"
                onClick={downloadSvg}
                aria-label="Download SVG"
                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-border hover:bg-accent"
              >
                <Download className="h-3.5 w-3.5" />
                Download SVG
              </button>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="p-1.5 rounded-md border border-border hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-auto p-6">
              <div
                className="mermaid-content max-w-full"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
