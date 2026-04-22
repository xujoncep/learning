import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy } from 'react';
import metaJson from '@/generated/content-meta.json';

type MDXModule = { default: ComponentType };

interface GeneratedMeta {
  title: string | null;
  description: string | null;
  wordCount: number;
  readingTime: number;
  plainText: string;
}

const meta = metaJson as Record<string, GeneratedMeta>;

// Lazy-loaded: each .mdx is a separate chunk, fetched on demand.
const lazyModules = import.meta.glob<MDXModule>('/src/generated/content/**/*.mdx');

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

export const docs: DocEntry[] = Object.entries(lazyModules)
  .map(([file, loader]) => {
    const rel = file.replace('/src/generated/content/', '').replace(/\.mdx$/, '');
    const parts = rel.split('/');
    const isSectioned = parts.length > 1;
    const section = isSectioned ? parts[0] : 'root';
    const slug = rel;
    const basename = parts[parts.length - 1];

    const m = meta[file];
    const title = m?.title ?? prettyTitle(basename);
    const description = m?.description ?? `Complete learning material on ${title}`;

    return {
      slug,
      section,
      title,
      order: extractOrder(basename),
      path: `/docs/${slug}`,
      description,
      readingTime: m?.readingTime ?? 1,
      wordCount: m?.wordCount ?? 0,
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
  const siblings = docs.filter((d) => d.section === current.section);
  const idx = siblings.findIndex((d) => d.slug === slug);
  return {
    prev: idx > 0 ? siblings[idx - 1] : undefined,
    next: idx < siblings.length - 1 ? siblings[idx + 1] : undefined,
  };
}

// Expose pre-extracted plain text (from build-time meta) for search.
export function getAllRawContent(): Array<{ doc: DocEntry; raw: string }> {
  return docs
    .map((doc) => {
      const file = `/src/generated/content/${doc.slug}.mdx`;
      const raw = meta[file]?.plainText ?? '';
      return { doc, raw };
    })
    .filter((x) => x.raw.length > 0);
}
