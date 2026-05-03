import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Megaphone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getApiToken } from '@/lib/auth';
import {
  dismissAnnouncement,
  getActiveAnnouncements,
  type ActiveAnnouncement,
} from '@/lib/api';

const LEVEL_STYLES: Record<
  ActiveAnnouncement['level'],
  { container: string; icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  info: {
    container: 'bg-amber-50 border-amber/40 text-ink',
    icon: Megaphone,
  },
  warn: {
    container: 'bg-clay/10 border-clay/40 text-ink',
    icon: AlertTriangle,
  },
  success: {
    container: 'bg-sage/15 border-sage/40 text-ink',
    icon: CheckCircle2,
  },
};

export function AnnouncementBanner() {
  const [items, setItems] = useState<ActiveAnnouncement[]>([]);
  const [dismissing, setDismissing] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!getApiToken()) return;
    let cancelled = false;
    getActiveAnnouncements()
      .then((list) => {
        if (!cancelled) setItems(list);
      })
      .catch(() => {
        // Best-effort — never block the page on a banner fetch.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDismiss = (id: number) => {
    setDismissing((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    dismissAnnouncement(id)
      .catch(() => {
        /* swallow — UI still removes locally */
      })
      .finally(() => {
        setItems((curr) => curr.filter((a) => a.id !== id));
        setDismissing((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      });
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 flex flex-col gap-1">
      {items.map((a) => {
        const style = LEVEL_STYLES[a.level] ?? LEVEL_STYLES.info;
        const Icon = style.icon;
        const fading = dismissing.has(a.id);
        return (
          <div
            key={a.id}
            role="status"
            className={cn(
              'flex items-start gap-3 rounded-[10px] border px-4 py-3 transition-opacity',
              style.container,
              fading && 'opacity-50',
            )}
          >
            <span className="shrink-0 mt-0.5 text-ink-2">
              <Icon size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-ink text-sm">{a.title}</div>
              <p className="text-ink-2 text-sm mt-0.5 leading-relaxed">{a.body}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDismiss(a.id)}
              disabled={fading}
              className="shrink-0 -mr-1 -mt-1 p-1 rounded-md text-ink-3 hover:text-ink hover:bg-ink/5 transition-colors disabled:opacity-50"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
