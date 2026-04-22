import { Link } from 'react-router-dom';

interface LogoProps {
  size?: number;
  to?: string;
  className?: string;
}

export function Logo({ size = 22, to = '/', className = '' }: LogoProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 text-ink hover:opacity-90 transition-opacity ${className}`}
    >
      <span
        aria-hidden
        className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-md bg-amber text-surface font-serif italic font-semibold text-[15px] shadow-soft-1"
      >
        L
      </span>
      <span
        className="font-serif font-medium tracking-tight leading-none"
        style={{ fontSize: size }}
      >
        Learning&nbsp;Hub<span className="text-amber">.</span>
      </span>
    </Link>
  );
}
