import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const COLUMNS: Array<{ title: string; links: Array<{ label: string; to: string }> }> = [
  {
    title: 'Learn',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Handbooks', to: '/handbooks' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
  },
  {
    title: 'Courses',
    links: [
      { label: 'GATE CSE', to: '/sections/gate-cse' },
      { label: 'C Programming', to: '/sections/c-programming' },
      { label: 'Computer Networking', to: '/sections/computer-networking' },
    ],
  },
  {
    title: 'Handbooks',
    links: [
      { label: 'SSH', to: '/docs/ssh' },
      { label: 'SSL / TLS', to: '/docs/ssl-tls' },
      { label: 'Authentication & Authorization', to: '/docs/authentication-authorization-dotnet' },
      { label: 'React for .NET Developers', to: '/docs/react-for-dotnet-developers' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-sand mt-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 pt-12 pb-8 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="text-[13px] text-ink-4 mt-4 max-w-[280px] leading-relaxed">
            বাংলায় Software Engineering শেখার একটা শান্ত জায়গা — ছোট ছোট পাঠ, বড়
            অগ্রগতি। GATE CSE, Networking, Security, Frontend, সব একসাথে।
          </p>
          <p className="bn text-[13px] text-ink-4 mt-2">
            নিজের গতিতে শেখো।
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] font-medium uppercase tracking-[0.04em] text-ink mb-3">
              {col.title}
            </div>
            <ul className="space-y-1.5">
              {col.links.map((l) => (
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
          </div>
        ))}

        <div className="md:col-span-4 border-t border-line pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12px] text-ink-4">
          <span>© {new Date().getFullYear()} Porhi · বাংলায় CS শেখার জায়গা</span>
          <span>Made with care in Dhaka ✦ for working professionals and students</span>
        </div>
      </div>
    </footer>
  );
}
