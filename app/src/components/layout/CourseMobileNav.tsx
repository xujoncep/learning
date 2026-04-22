import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseSidebar } from './CourseSidebar';
import { cn } from '@/lib/utils';

interface CourseMobileNavProps {
  open: boolean;
  onClose: () => void;
  section: string;
  currentSlug: string;
}

export function CourseMobileNav({
  open,
  onClose,
  section,
  currentSlug,
}: CourseMobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity md:hidden',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-72 max-w-[85vw] bg-card border-r border-border shadow-xl transition-transform md:hidden flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Course navigation"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
          <span className="font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Course Navigation
          </span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 min-h-0">
          <CourseSidebar
            section={section}
            currentSlug={currentSlug}
            onNavigate={onClose}
            mobile
          />
        </div>
      </aside>
    </>
  );
}
