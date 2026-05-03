import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function DevLoginPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    localStorage.setItem('learning:auth', 'true');
    localStorage.setItem('learning:name', 'Dev');
    const next = searchParams.get('next') || '/dashboard';
    window.location.replace(next);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand text-ink-3">
      Logging in…
    </div>
  );
}
