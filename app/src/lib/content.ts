import type { ComponentType } from 'react';

type MDXModule = { default: ComponentType };

const modules = import.meta.glob<MDXModule>('/src/content/**/*.mdx', { eager: true });

export interface DocMeta {
  slug: string;
  section: string;
  title: string;
  order: number;
  path: string;
}

export interface DocEntry extends DocMeta {
  Component: ComponentType;
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

export const docs: DocEntry[] = Object.entries(modules)
  .map(([file, mod]) => {
    const rel = file.replace('/src/content/', '').replace(/\.mdx$/, '');
    const parts = rel.split('/');
    const isSectioned = parts.length > 1;
    const section = isSectioned ? parts[0] : 'root';
    const slug = rel;
    const basename = parts[parts.length - 1];

    return {
      slug,
      section,
      title: prettyTitle(basename),
      order: extractOrder(basename),
      path: `/docs/${slug}`,
      Component: mod.default,
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
  const idx = docs.findIndex((d) => d.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? docs[idx - 1] : undefined,
    next: idx < docs.length - 1 ? docs[idx + 1] : undefined,
  };
}
