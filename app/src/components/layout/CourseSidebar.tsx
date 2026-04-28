import { NavLink, Link } from 'react-router-dom';
import { ChevronLeft, Home, PanelLeftClose } from 'lucide-react';
import { sections } from '@/lib/content';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface CourseSidebarProps {
  section: string;
  currentSlug: string;
  onCollapse?: () => void;
  onNavigate?: () => void;
  mobile?: boolean;
}

export function CourseSidebar({
  section,
  currentSlug,
  onCollapse,
  onNavigate,
  mobile = false,
}: CourseSidebarProps) {
  const sectionObj = sections.find((s) => s.id === section);
  if (!sectionObj) return null;

  return (
    <div className="h-full flex flex-col bg-card/40">
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border/60">
        <Link
          to="/"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="h-3.5 w-3.5" />
          Back to home
        </Link>
        {!mobile && onCollapse && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onCollapse}
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="px-4 py-3 border-b border-border/60">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <span>{sectionObj.icon}</span>
          <span className="truncate">{sectionObj.title}</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {sectionObj.docs.length} chapters
        </p>
      </div>

      <ScrollArea className="flex-1 py-2">
        <nav>
          {sectionObj.docs.map((doc, idx) => (
            <NavLink
              key={doc.slug}
              to={doc.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-start gap-3 px-4 py-2 text-sm transition-colors border-l-2',
                  isActive || doc.slug === currentSlug
                    ? 'bg-primary/10 text-primary font-medium border-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/40'
                )
              }
            >
              <span className="text-xs text-muted-foreground mt-0.5 tabular-nums shrink-0 w-5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="truncate">{doc.title}</span>
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}

interface CollapsedRailProps {
  onExpand: () => void;
}

export function CollapsedRail({ onExpand }: CollapsedRailProps) {
  return (
    <button
      type="button"
      onClick={onExpand}
      className="hidden md:flex w-7 shrink-0 sticky top-[68px] h-[calc(100vh-68px)] bg-card/40 border-r border-border/60 items-start justify-center pt-4 hover:bg-accent/40 transition-colors group"
      aria-label="Expand sidebar"
    >
      <ChevronLeft className="h-4 w-4 rotate-180 text-muted-foreground group-hover:text-foreground" />
    </button>
  );
}
