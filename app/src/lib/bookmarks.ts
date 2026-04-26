import { useCallback, useEffect, useState } from 'react';
import {
  addBookmark as apiAddBookmark,
  recordAudit,
  removeBookmark as apiRemoveBookmark,
} from '@/lib/api';
import { getApiToken } from '@/lib/auth';

const STORAGE_KEY = 'learning-bookmarks';
const EVENT = 'learning:bookmarks-change';

function read(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
}

function write(set: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function getBookmarks(): string[] {
  return Array.from(read());
}

export function isBookmarked(slug: string): boolean {
  return read().has(slug);
}

export function toggleBookmark(slug: string): boolean {
  const set = read();
  if (set.has(slug)) {
    set.delete(slug);
  } else {
    set.add(slug);
  }
  write(set);
  return set.has(slug);
}

export function useBookmark(slug: string): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(() => isBookmarked(slug));

  useEffect(() => {
    setValue(isBookmarked(slug));
    const onChange = () => setValue(isBookmarked(slug));
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onChange);
    };
  }, [slug]);

  const toggle = useCallback(() => {
    const newValue = toggleBookmark(slug);
    setValue(newValue);

    // Best-effort sync to API when an OAuth session exists.
    // Failures are tolerated — localStorage already reflects the change.
    if (getApiToken()) {
      const remote = newValue ? apiAddBookmark(slug) : apiRemoveBookmark(slug);
      remote
        .then(() => recordAudit(newValue ? 'bookmark_add' : 'bookmark_remove', slug))
        .catch(() => {
          /* tolerated */
        });
    }
  }, [slug]);

  return [value, toggle];
}
