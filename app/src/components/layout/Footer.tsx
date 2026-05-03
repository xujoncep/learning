import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Handbooks', to: '/handbooks' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'About', to: '/about' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-sand mt-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="max-w-[300px]">
            <Logo />
            <p className="text-[13px] text-ink-4 mt-3 leading-relaxed">
              বাংলায় Software Engineering শেখার একটা শান্ত জায়গা — ছোট ছোট পাঠ, বড় অগ্রগতি।
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <div className="text-[11px] font-medium uppercase tracking-[0.04em] text-ink mb-3">
              Explore
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[13px] text-ink-3 hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom strip */}
        <div className="mt-8 pt-5 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] text-ink-4">
          <span>© {new Date().getFullYear()} Porhi · বাংলায় CS শেখার জায়গা</span>
          <span>Made with care in Dhaka ✦ for working professionals and students</span>
        </div>
      </div>
    </footer>
  );
}
