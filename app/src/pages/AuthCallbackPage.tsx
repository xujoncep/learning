import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setOAuthSession } = useAuth();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const token = searchParams.get('token');
    if (!token) {
      navigate('/login?error=oauth_failed', { replace: true });
      return;
    }

    setOAuthSession(token)
      .then(() => navigate('/dashboard', { replace: true }))
      .catch(() => navigate('/login?error=oauth_invalid', { replace: true }));
  }, [searchParams, setOAuthSession, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-8 w-8 text-amber-700 animate-spin" />
        <div>
          <div className="font-serif text-[22px] text-ink tracking-tight">
            Signing you <em className="italic text-amber-700">in</em>…
          </div>
          <div className="text-[13px] text-ink-3 mt-1.5">
            Verifying your Google session.
          </div>
        </div>
      </div>
    </div>
  );
}
