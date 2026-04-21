import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity md:hidden',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-72 max-w-[85vw] bg-card border-r border-border shadow-xl transition-transform md:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Navigation"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border">
          <span className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Learning Hub
          </span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="h-[calc(100%-3.5rem)]">
          <Sidebar onNavigate={onClose} />
        </div>
      </aside>
    </>
  );
}
