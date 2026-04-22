import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type FontSize = 'sm' | 'md' | 'lg';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);
const STORAGE_KEY = 'learning-font-size';

const SCALE: Record<FontSize, string> = {
  sm: '15px',
  md: '16px',
  lg: '18px',
};

function getInitial(): FontSize {
  if (typeof window === 'undefined') return 'md';
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'sm' || stored === 'md' || stored === 'lg' ? stored : 'md';
}

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>(getInitial);

  useEffect(() => {
    document.documentElement.style.setProperty('--prose-base-size', SCALE[fontSize]);
    localStorage.setItem(STORAGE_KEY, fontSize);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error('useFontSize must be used within FontSizeProvider');
  return ctx;
}
