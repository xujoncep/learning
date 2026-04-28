import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { apiGoogleSignInUrl } from '@/lib/api';
import { Logo } from '@/components/layout/Logo';
import { SeoHead } from '@/components/layout/SeoHead';

export function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  const [error] = useState<string | null>(() => {
    const code = searchParams.get('error');
    if (code === 'oauth_failed') return 'Google sign-in did not complete. Please try again.';
    if (code === 'oauth_invalid') return 'Google session was rejected. Please try again.';
    return null;
  });

  // If already logged in, bounce to next/dashboard.
  useEffect(() => {
    if (isAuthenticated) navigate(next, { replace: true });
  }, [isAuthenticated, navigate, next]);

  return (
    <>
      <SeoHead title="Sign in · Porhi" description="Sign in with Google to access courses and your reading dashboard." />

      <div className="min-h-screen grid md:grid-cols-2 bg-sand">
        {/* LEFT — sign-in column */}
        <div className="flex flex-col p-6 md:p-12">
          <div className="mb-10">
            <Logo />
          </div>

          <div className="flex-1 flex items-center">
            <div className="w-full max-w-[420px] mx-auto">
              <div className="mb-8">
                <div className="text-[11px] uppercase tracking-[0.04em] text-ink-4">Welcome</div>
                <h1 className="font-serif text-[44px] leading-[1.05] tracking-tight text-ink mt-2">
                  Sign in to continue <em className="italic text-amber-700">learning</em>.
                </h1>
                <p className="text-[14px] text-ink-3 mt-3 leading-relaxed">
                  Gated courses, personal dashboard, calendar আর reading activity tracking
                  — সব access করতে Google দিয়ে sign in করো।
                </p>
              </div>

              {/* Google OAuth */}
              <button
                type="button"
                onClick={() => {
                  window.location.href = apiGoogleSignInUrl();
                }}
                className="w-full h-12 inline-flex items-center justify-center gap-3 rounded-[8px] bg-white border border-line-2 text-[14px] font-medium text-ink hover:bg-sand-2 hover:border-line transition-all shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.28 1.48-1.13 2.74-2.4 3.58v3h3.88c2.27-2.09 3.57-5.18 3.57-8.82z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.71-4.95H1.29v3.09C3.26 21.31 7.31 24 12 24z" />
                  <path fill="#FBBC05" d="M5.29 14.3c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l4-3.09z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.61l4 3.09C6.23 6.86 8.88 4.75 12 4.75z" />
                </svg>
                Sign in with Google
              </button>

              {error && (
                <div
                  role="alert"
                  className="mt-4 text-[13px] rounded-md px-3 py-2"
                  style={{
                    color: 'hsl(var(--danger))',
                    background: 'hsl(var(--danger) / 0.08)',
                    borderColor: 'hsl(var(--danger) / 0.25)',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}
                >
                  {error}
                </div>
              )}

              <p className="text-[12.5px] text-ink-4 mt-6 leading-relaxed">
                We only use Google sign-in to identify you across devices and keep your
                reading history safe. No password to remember, no separate account.
              </p>

              <p className="text-[12px] text-ink-4 text-center pt-8 border-t border-line/50 mt-8">
                Public resources →{' '}
                <Link to="/" className="text-amber-700 hover:underline">
                  Home
                </Link>
                {' · '}
                <Link to="/handbooks" className="text-amber-700 hover:underline">
                  Handbooks
                </Link>
              </p>
            </div>
          </div>

          <div className="text-[12px] text-ink-4 pt-8">
            © {new Date().getFullYear()} Porhi · বাংলায় CS শেখার জায়গা
          </div>
        </div>

        {/* RIGHT — editorial illustration panel */}
        <div className="hidden md:block relative overflow-hidden bg-[hsl(var(--ink-blue))] border-l border-line/30">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--ink-blue)) 0%, hsl(214, 60%, 12%) 70%)',
            }}
          />
          <div
            aria-hidden
            className="absolute rounded-full"
            style={{
              right: -160,
              top: -160,
              width: 480,
              height: 480,
              background:
                'radial-gradient(closest-side, hsl(var(--amber) / 0.25), transparent 70%)',
            }}
          />

          <div className="relative h-full flex flex-col justify-between p-14 text-[#E7DFD1]">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-[#FDE68A]">
              <span className="inline-block w-8 h-px bg-[#FDE68A]" />
              Study Hub · GATE CSE 2026
            </div>

            <div className="max-w-[500px]">
              <div className="mono-font text-[11px] text-[#A39584] uppercase tracking-[0.08em] mb-4">
                From the course · Chapter 08 · Reading 4
              </div>
              <h2 className="font-serif text-[38px] leading-[1.1] tracking-tight text-[#FFFBEF]">
                <em className="italic text-[#FDE68A]">Deadlock</em> — চারটা শর্ত,
                একটা এড়িয়ে যাও।
              </h2>
              <p className="text-[14px] mt-5 leading-relaxed text-[#D8CDB3]">
                Mutual exclusion, Hold &amp; Wait, No Preemption, Circular Wait — এই
                চারটা একসাথে হলেই system আটকে যায়। যেকোনো একটা ভাঙতে পারলে deadlock
                আর হবে না।
              </p>

              <div className="mt-8 rounded-xl overflow-hidden border border-[rgba(255,251,239,.1)]">
                <div className="bg-[#1C1917] p-4 font-mono text-[12.5px] leading-[1.65] text-[#E7DFD1]">
                  <div className="text-[#A39584]">{'// 4 Coffman conditions'}</div>
                  <div>
                    <span className="text-[#D97706]">if</span> (all_four_hold) {'{'}
                  </div>
                  <div>&nbsp;&nbsp;system.deadlock_possible = <span className="text-[#D97706]">true</span>;</div>
                  <div>{'}'}</div>
                  <div className="text-[#A39584] mt-2">{'// Break any one → safe'}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[12.5px] text-[#D8CDB3]">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#B85C38] text-white font-serif text-[13px]">
                P
              </div>
              <div>
                <div className="text-[#FFFBEF] font-medium">Porhi</div>
                <div className="text-[#8A8072] text-[11.5px]">বাংলায় CS শেখার জায়গা</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
