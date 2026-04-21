import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
}

export function TableOfContents({ contentSelector = '.prose-custom' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const article = document.querySelector(contentSelector);
    if (!article) return;

    const elements = article.querySelectorAll<HTMLHeadingElement>('h2, h3');
    const items: Heading[] = Array.from(elements)
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent ?? '',
        level: parseInt(el.tagName.substring(1), 10),
      }));

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    elements.forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [contentSelector]);

  if (headings.length < 2) return null;

  return (
    <nav className="text-sm">
      <h4 className="font-semibold mb-3 text-foreground">On this page</h4>
      <ul className="space-y-2 border-l border-border">
        {headings.map((h) => (
          <li
            key={h.id}
            className={cn('pl-3 -ml-px border-l-2 border-transparent transition-colors', {
              'pl-6': h.level === 3,
              'border-primary': activeId === h.id,
            })}
          >
            <a
              href={`#${h.id}`}
              className={cn(
                'block py-0.5 text-muted-foreground hover:text-foreground transition-colors leading-tight',
                activeId === h.id && 'text-primary font-medium'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
