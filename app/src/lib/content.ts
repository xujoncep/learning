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

interface SectionMeta {
  title: string;
  icon: string;
  order: number;
  gated?: boolean;
  description?: string;
}

export interface SubjectSection {
  id: string;
  label: string;
  icon: string;
}

export interface SubjectMeta {
  title: string;
  icon: string;
  order: number;
  description: string;
  sections: SubjectSection[];
}

const SUBJECT_META: Record<string, SubjectMeta> = {
  dbms: {
    title: 'Database Management System',
    icon: '🗄️',
    order: 1,
    description:
      'Relational model, SQL, Normalization, Transactions, Indexing — DBMS concepts ও MCQ practice।',
    sections: [
      { id: 'dbms', label: 'Concepts', icon: '📖' },
      { id: 'dbms-mcq', label: 'MCQ Practice', icon: '✅' },
    ],
  },
  'operating-system': {
    title: 'Operating System',
    icon: '🖥️',
    order: 2,
    description:
      'Process, Scheduling, Memory, File System — OS concepts, BB written prep ও MCQ practice।',
    sections: [
      { id: 'operating-system', label: 'Concepts', icon: '📖' },
      { id: 'operating-system-bd-bank', label: 'Written Questions', icon: '✍️' },
      { id: 'operating-system-mcq', label: 'MCQ Practice', icon: '✅' },
    ],
  },
  'cyber-security': {
    title: 'Cyber Security',
    icon: '🔐',
    order: 3,
    description:
      'CIA Triad, Malware, Cryptography, BB Framework 2026 — written prep ও MCQ practice for BB IT exam।',
    sections: [
      { id: 'cyber-security-bd-bank', label: 'Written Questions', icon: '✍️' },
      { id: 'cyber-security-mcq', label: 'MCQ Practice', icon: '✅' },
    ],
  },
  'computer-networking': {
    title: 'Computer Networking',
    icon: '🌐',
    order: 4,
    description:
      'OSI/TCP-IP থেকে routing, security, wireless পর্যন্ত — networking-র complete course।',
    sections: [{ id: 'computer-networking', label: 'Concepts', icon: '📖' }],
  },
  'c-programming': {
    title: 'C Programming',
    icon: '💻',
    order: 5,
    description: 'C language depth-এ — fundamentals থেকে data structures পর্যন্ত।',
    sections: [
      { id: 'c-programming', label: 'Concepts', icon: '📖' },
      { id: 'c-programming-problems', label: 'Programming Problems', icon: '💡' },
      { id: 'c-programming-mcq', label: 'MCQ Practice', icon: '✅' },
    ],
  },
  'system-design': {
    title: 'System Design',
    icon: '🏗️',
    order: 6,
    description:
      'NFR, load balancer, caching, sharding — beginner থেকে interview-ready system design।',
    sections: [{ id: 'system-design', label: 'Concepts', icon: '📖' }],
  },
  'gate-cse': {
    title: 'GATE CSE',
    icon: '🎓',
    order: 7,
    description: 'GATE CSE সব subject, PYQ-heavy approach, bilingual explanations।',
    sections: [{ id: 'gate-cse', label: 'Course', icon: '🎓' }],
  },
};

export function getSubjectMeta(subjectId: string): SubjectMeta | undefined {
  return SUBJECT_META[subjectId];
}

export function getSubjects(): Array<{ id: string } & SubjectMeta> {
  return Object.entries(SUBJECT_META)
    .map(([id, meta]) => ({ id, ...meta }))
    .sort((a, b) => a.order - b.order);
}

const SECTION_META: Record<string, SectionMeta> = {
  'gate-cse': {
    title: 'GATE CSE',
    icon: '🎓',
    order: 1,
    gated: true,
    description:
      'GATE CSE-র সব subject, PYQ-heavy approach, bilingual explanations — একটা focused course হিসেবে organized।',
  },
  'c-programming': {
    title: 'C Programming',
    icon: '💻',
    order: 2,
    gated: true,
    description:
      'C language depth-এ — fundamentals থেকে data structures পর্যন্ত। প্রতিটা level-এ concept, code examples, MCQ + written problems, traps।',
  },
  'c-programming-problems': {
    title: 'C Programming Problems (BB Exam)',
    icon: '💡',
    order: 2.1,
    gated: true,
    description:
      'Bangladesh Bank IT/AME/Programmer exam-এর জন্য ১০০টা C programming problem — Bangla logic ব্যাখ্যা, sample I/O, এবং exam tips সহ।',
  },
  'c-programming-mcq': {
    title: 'C Programming MCQ Practice',
    icon: '✅',
    order: 2.2,
    gated: true,
    description:
      '১৮০টা C programming MCQ — output tracing, pointer logic, operator precedence, theory — Bangladesh Bank IT exam-এর জন্য।',
  },
  'computer-networking': {
    title: 'Computer Networking',
    icon: '🌐',
    order: 3,
    gated: true,
    description:
      'OSI/TCP-IP থেকে শুরু করে routing, security, wireless পর্যন্ত — networking-র complete course। প্রতিটা layer + protocol-এ deep dive।',
  },
  dbms: {
    title: 'DBMS',
    icon: '🗄️',
    order: 4,
    gated: true,
    description:
      'Database fundamentals, relational model, SQL, normalization, transactions, indexing, NoSQL — interview-ready DBMS course।',
  },
  'operating-system': {
    title: 'Operating System',
    icon: '🖥️',
    order: 5,
    gated: true,
    description:
      'Process, thread, scheduling, synchronization, deadlock, memory, file system, security — OS-এর complete roadmap।',
  },
  'system-design': {
    title: 'System Design',
    icon: '🏗️',
    order: 6,
    gated: true,
    description:
      'NFR, capacity, load balancer, caching, sharding, queue, consistency, observability — beginner থেকে interview-ready system design।',
  },
  'cyber-security-bd-bank': {
    title: 'Cyber Security (BB IT Exam)',
    icon: '🔐',
    order: 7,
    gated: true,
    description:
      'Bangladesh Bank IT/AD IT exam-এর জন্য cyber security written question + answer — CIA, SSL/TLS, SWIFT, MFA, BB Framework v1.0 (2026), e-KYC সহ ২৮টি high-priority topic।',
  },
  'operating-system-mcq': {
    title: 'Operating System MCQ Practice',
    icon: '🖥️',
    order: 8,
    gated: true,
    description:
      '৭০টা OS MCQ — Process, Scheduling, Sync, Deadlock, Memory, Virtual Memory, File System, I/O, Linux command — Bank IT, BCS, NTRCA, university viva-র জন্য fast revision।',
  },
  'operating-system-bd-bank': {
    title: 'OS Written (BB IT/AME Exam)',
    icon: '✍️',
    order: 9,
    gated: true,
    description:
      'Bangladesh Bank Officer (IT) ও AME post-এর written exam-এর জন্য ৩৩টা OS question + answer — Gantt chart math, RAG diagram, paging, LRU, RAID, boot sequence, chmod সহ complete written prep।',
  },
  'dbms-mcq': {
    title: 'DBMS MCQ Practice',
    icon: '🗄️',
    order: 10,
    gated: true,
    description:
      '৯০টা DBMS MCQ — Fundamentals, ER, SQL, Normalization, Transactions, Indexing, NoSQL — Bangla question + Bangla explanation, Bank IT / BCS / NTRCA / GATE-এর জন্য fast revision।',
  },
  'cyber-security-mcq': {
    title: 'Cyber Security MCQ Practice',
    icon: '🔐',
    order: 11,
    gated: true,
    description:
      '১০০টা Cyber Security MCQ — ZTA, Malware, Cryptography, BB Framework 2026, API Security, AI threats — Bangla explanation সহ, Bangladesh Bank IT / BCS / NTRCA exam-এর জন্য fast revision।',
  },
  root: { title: 'Handbooks', icon: '📚', order: 12 },
};

export function isGatedSection(section: string | undefined): boolean {
  if (!section) return false;
  return SECTION_META[section]?.gated === true;
}

export function getSectionMeta(section: string): SectionMeta | undefined {
  return SECTION_META[section];
}

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

/**
 * Turn a full chapter title into a compact version for card display.
 * Examples:
 *   "Engineering Mathematics — GATE CSE 🔢"    → "Engineering Mathematics"
 *   "GATE CSE — Master Index 📚"               → "Master Index"
 *   "Operating System — GATE CSE 🖥️"           → "Operating System"
 *   "SSH (Secure Shell) — Complete Guide…"    → same, trailing emoji stripped
 */
export function cleanChapterTitle(title: string): string {
  // "Topic — GATE CSE <anything>" → "Topic"
  const afterSuffix = title.replace(/\s+—\s+GATE CSE\b.*$/u, '');
  if (afterSuffix !== title) return afterSuffix.trim();
  // "GATE CSE — Master Index 📚" → "Master Index"
  const afterPrefix = title.replace(/^GATE CSE\s+—\s+/, '');
  if (afterPrefix !== title) {
    return afterPrefix.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}️\s]+$/u, '').trim();
  }
  // Generic: just strip trailing emoji
  return title.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}️\s]+$/u, '').trim();
}

/**
 * Human-friendly chapter label for card badges.
 *   slug "00-master-index"            → "Index"
 *   slug "00-exam-pattern-strategy"   → "Intro"
 *   order 8                           → "Chapter 08"
 *   root handbook                     → "Handbook"
 */
export function chapterLabel(doc: DocEntry): string {
  if (doc.section === 'root') return 'Handbook';
  if (doc.order === 0) {
    if (doc.slug.includes('master-index')) return 'Index';
    return 'Intro';
  }
  if (doc.order === 999) return 'Chapter';
  return `Chapter ${String(doc.order).padStart(2, '0')}`;
}

/**
 * 2-3 character banner initials for a card.
 * Prefers zero-padded chapter number for course docs; falls back to
 * ALLCAPS letters in the title.
 */
export function chapterInitials(doc: DocEntry): string {
  if (doc.section !== 'root') {
    if (doc.order === 0) {
      return doc.slug.includes('master-index') ? 'IX' : 'IN';
    }
    if (doc.order !== 999) {
      return String(doc.order).padStart(2, '0');
    }
  }
  // Root / fallback: pull ALLCAPS letters or initials of first two words
  const caps = doc.title.match(/[A-Z]{2,4}/);
  if (caps) return caps[0].slice(0, 3);
  const words = doc.title.replace(/^[\d\-\s]+/, '').split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return doc.title.slice(0, 2).toUpperCase();
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
