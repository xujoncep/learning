import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy } from 'react';

type MDXModule = { default: ComponentType };

// Lazy-loaded: each .mdx is a separate chunk, fetched on demand.
const lazyModules = import.meta.glob<MDXModule>('/src/content/**/*.mdx');

// Eager meta: build-time generated minimal metadata for sidebar/search.
// We extract the first heading from raw markdown at build time via Vite's `?raw` query.
const rawContent = import.meta.glob<string>('/src/content/**/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export interface DocMeta {
  slug: string;
  section: string;
  title: string;
  order: number;
  path: string;
  description: string;
  readingTime: number;
  wordCount: number;
}

export interface DocEntry extends DocMeta {
  Component: LazyExoticComponent<ComponentType>;
}

const SECTION_META: Record<string, { title: string; icon: string; order: number }> = {
  'gate-cse': { title: 'GATE CSE', icon: '🎓', order: 1 },
  root: { title: 'Handbooks', icon: '📚', order: 2 },
};

function prettyTitle(slug: string): string {
  return slug
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractOrder(slug: string): number {
  const match = slug.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

function extractFirstH1(raw: string): string | null {
  const match = raw.match(/^#\s+(.+)$/m);
  if (!match) return null;
  return match[1].trim();
}

function extractBlockquote(raw: string): string | null {
  const match = raw.match(/^>\s+(.+)$/m);
  if (!match) return null;
  return match[1].replace(/\*\*/g, '').replace(/\[(.+?)\]\(.+?\)/g, '$1').trim();
}

function estimateReadingTime(raw: string): { minutes: number; words: number } {
  const text = raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#*_`>\-[\]()]/g, '')
    .trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return { minutes, words };
}

export const docs: DocEntry[] = Object.entries(lazyModules)
  .map(([file, loader]) => {
    const rel = file.replace('/src/content/', '').replace(/\.mdx$/, '');
    const parts = rel.split('/');
    const isSectioned = parts.length > 1;
    const section = isSectioned ? parts[0] : 'root';
    const slug = rel;
    const basename = parts[parts.length - 1];

    const raw = rawContent[file] ?? '';
    const rt = estimateReadingTime(raw);
    const title = extractFirstH1(raw) ?? prettyTitle(basename);
    const description = extractBlockquote(raw) ?? `Complete learning material on ${title}`;

    return {
      slug,
      section,
      title,
      order: extractOrder(basename),
      path: `/docs/${slug}`,
      description,
      readingTime: rt.minutes,
      wordCount: rt.words,
      Component: lazy(loader),
    } as DocEntry;
  })
  .sort((a, b) => {
    if (a.section !== b.section) {
      return (SECTION_META[a.section]?.order ?? 99) - (SECTION_META[b.section]?.order ?? 99);
    }
    return a.order - b.order;
  });

export interface Section {
  id: string;
  title: string;
  icon: string;
  docs: DocEntry[];
}

export const sections: Section[] = (() => {
  const map = new Map<string, DocEntry[]>();
  for (const d of docs) {
    if (!map.has(d.section)) map.set(d.section, []);
    map.get(d.section)!.push(d);
  }
  return Array.from(map.entries()).map(([id, docs]) => ({
    id,
    title: SECTION_META[id]?.title ?? prettyTitle(id),
    icon: SECTION_META[id]?.icon ?? '📄',
    docs,
  }));
})();

export function findDoc(slug: string): DocEntry | undefined {
  return docs.find((d) => d.slug === slug);
}

export function getAdjacentDocs(slug: string): { prev?: DocEntry; next?: DocEntry } {
  const current = findDoc(slug);
  if (!current) return {};
  // Stay within section for prev/next; skip across sections.
  const siblings = docs.filter((d) => d.section === current.section);
  const idx = siblings.findIndex((d) => d.slug === slug);
  return {
    prev: idx > 0 ? siblings[idx - 1] : undefined,
    next: idx < siblings.length - 1 ? siblings[idx + 1] : undefined,
  };
}

// Expose raw content for search index
export function getAllRawContent(): Array<{ doc: DocEntry; raw: string }> {
  return Object.entries(rawContent).map(([file, raw]) => {
    const rel = file.replace('/src/content/', '').replace(/\.mdx$/, '');
    const doc = docs.find((d) => d.slug === rel)!;
    return { doc, raw };
  });
}
