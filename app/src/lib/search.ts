import FlexSearch from 'flexsearch';
import { docs, getAllRawContent } from '@/lib/content';

export interface SearchHit {
  slug: string;
  title: string;
  section: string;
  path: string;
  snippet: string;
}

function stripMd(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<Mermaid[\s\S]*?\/>/g, ' ')
    .replace(/<Callout[\s\S]*?<\/Callout>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

interface DocEntry {
  title: string;
  body: string;
}

// Title + body fields indexed separately
const titleIndex = new FlexSearch.Index({ tokenize: 'forward' });
const bodyIndex = new FlexSearch.Index({ tokenize: 'forward' });

const byId = new Map<number, DocEntry & { slug: string; cleanBody: string }>();

let built = false;
function buildIndex() {
  if (built) return;
  built = true;

  const all = getAllRawContent();
  all.forEach(({ doc, raw }, i) => {
    const cleanBody = stripMd(raw);
    byId.set(i, {
      title: doc.title,
      body: cleanBody,
      slug: doc.slug,
      cleanBody,
    });
    titleIndex.add(i, doc.title);
    bodyIndex.add(i, cleanBody);
  });
}

export function search(query: string, limit = 8): SearchHit[] {
  buildIndex();
  const trimmed = query.trim();
  if (!trimmed) return [];

  const titleResults = titleIndex.search(trimmed, { limit }) as number[];
  const bodyResults = bodyIndex.search(trimmed, { limit }) as number[];

  const seen = new Set<number>();
  const ordered: number[] = [];
  for (const id of [...titleResults, ...bodyResults]) {
    if (seen.has(id)) continue;
    seen.add(id);
    ordered.push(id);
    if (ordered.length >= limit) break;
  }

  return ordered.map((id) => {
    const entry = byId.get(id)!;
    const doc = docs.find((d) => d.slug === entry.slug)!;
    return {
      slug: doc.slug,
      title: doc.title,
      section: doc.section,
      path: doc.path,
      snippet: makeSnippet(entry.cleanBody, trimmed),
    };
  });
}

function makeSnippet(body: string, query: string): string {
  const lower = body.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return body.slice(0, 140) + (body.length > 140 ? '…' : '');
  const start = Math.max(0, idx - 50);
  const end = Math.min(body.length, idx + q.length + 100);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < body.length ? '…' : '';
  return prefix + body.slice(start, end) + suffix;
}
