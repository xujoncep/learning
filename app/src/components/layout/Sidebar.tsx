import { NavLink } from 'react-router-dom';
import { sections } from '@/lib/content';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <ScrollArea className="h-full py-6 pr-2">
      <div className="px-3 pb-6">
        <NavLink
          to="/"
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )
          }
        >
          🏠 Home
        </NavLink>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <span>{section.icon}</span>
            {section.title}
          </h3>
          <nav className="space-y-0.5">
            {section.docs.map((doc) => (
              <NavLink
                key={doc.slug}
                to={doc.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-1.5 mx-1 rounded-md text-sm transition-all truncate',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                  )
                }
              >
                {doc.title}
              </NavLink>
            ))}
          </nav>
        </div>
      ))}
    </ScrollArea>
  );
}
