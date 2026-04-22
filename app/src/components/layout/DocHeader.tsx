import { Link } from 'react-router-dom';
import { Clock, FileText, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DocHeaderProps {
  title: string;
  section: string;
  readingTime: number;
  wordCount: number;
}

const SECTION_LABEL: Record<string, { title: string; icon: string }> = {
  'gate-cse': { title: 'GATE CSE', icon: '🎓' },
  root: { title: 'Handbooks', icon: '📚' },
};

export function DocHeader({ section, readingTime, wordCount }: DocHeaderProps) {
  const label = SECTION_LABEL[section] ?? { title: section, icon: '📄' };

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-6"
    >
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link
        to={section === 'root' ? '/' : `/sections/${section}`}
        className="hover:text-foreground transition-colors inline-flex items-center gap-1"
      >
        <span>{label.icon}</span>
        <span>{label.title}</span>
      </Link>

      <span className="mx-2 hidden sm:inline h-4 w-px bg-border" />

      <Badge variant="secondary" className="gap-1 text-xs">
        <Clock className="h-3 w-3" />
        {readingTime} min read
      </Badge>
      <Badge variant="outline" className="gap-1 text-xs font-normal">
        <FileText className="h-3 w-3" />
        {wordCount.toLocaleString()} words
      </Badge>
    </nav>
  );
}
