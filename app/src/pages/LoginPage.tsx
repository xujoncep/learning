import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/components/layout/Logo';
import { SeoHead } from '@/components/layout/SeoHead';

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, bounce to next/dashboard.
  useEffect(() => {
    if (isAuthenticated) navigate(next, { replace: true });
  }, [isAuthenticated, navigate, next]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = login(password, name);
    if (result.ok) {
      navigate(next, { replace: true });
    } else {
      setError(result.reason);
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead title="Sign in · Learning Hub" description="Sign in to access the GATE CSE course and dashboard." />

      <div className="min-h-screen grid md:grid-cols-2 bg-sand">
        {/* LEFT — form */}
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
                  GATE CSE course আর personal dashboard access করতে একটা display name
                  আর shared password লাগবে।
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* Display name */}
                <label className="block">
                  <span className="text-[12px] font-medium text-ink-3 mb-1.5 inline-block">
                    Display name
                  </span>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-4 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                      required
                      placeholder="e.g., Mehedy"
                      className="w-full h-12 pl-10 pr-3 bg-surface-2 border border-line-2 rounded-lg text-[14px] text-ink placeholder:text-ink-5 focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber transition-all"
                    />
                  </div>
                </label>

                {/* Password */}
                <label className="block">
                  <span className="text-[12px] font-medium text-ink-3 mb-1.5 inline-block">
                    Shared password
                  </span>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-4 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter shared password"
                      className="w-full h-12 pl-10 pr-10 bg-surface-2 border border-line-2 rounded-lg text-[14px] text-ink placeholder:text-ink-5 focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-4 hover:text-ink-2 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {error && (
                  <div
                    role="alert"
                    className="text-[13px] text-danger bg-danger/5 border border-danger/20 rounded-md px-3 py-2"
                    style={{
                      color: 'hsl(var(--danger))',
                      background: 'hsl(var(--danger) / 0.08)',
                      borderColor: 'hsl(var(--danger) / 0.25)',
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-lg btn-primary w-full"
                >
                  {submitting ? 'Signing in…' : (
                    <>
                      Sign in <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-[12px] text-ink-4 text-center pt-2">
                  Password না জানলে site owner-এর সাথে যোগাযোগ করো। <br />
                  Public resources → <Link to="/" className="text-amber-700 hover:underline">Home</Link>
                  {' · '}
                  <Link to="/handbooks" className="text-amber-700 hover:underline">Handbooks</Link>
                </p>
              </form>
            </div>
          </div>

          <div className="text-[12px] text-ink-4 pt-8">
            © {new Date().getFullYear()} Learning Hub · বাংলায় CS শেখার জায়গা
          </div>
        </div>

        {/* RIGHT — editorial illustration panel */}
        <div className="hidden md:block relative overflow-hidden bg-[hsl(var(--ink-blue))]">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--ink-blue)) 0%, hsl(214, 60%, 12%) 70%)',
            }}
          />
          {/* amber glow */}
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
                LH
              </div>
              <div>
                <div className="text-[#FFFBEF] font-medium">Learning Hub</div>
                <div className="text-[#8A8072] text-[11.5px]">বাংলায় CS শেখার জায়গা</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
