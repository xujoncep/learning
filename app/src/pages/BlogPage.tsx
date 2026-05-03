import { SeoHead } from '@/components/layout/SeoHead';

export default function BlogPage() {
  return (
    <>
      <SeoHead title="Blog — Porhi" description="Porhi blog — শীঘ্রই আসছে।" />
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-5xl">✍️</span>
        <h1 className="text-2xl font-semibold text-ink" style={{ fontFamily: 'Fraunces, serif' }}>
          Blog — শীঘ্রই আসছে
        </h1>
        <p className="text-ink-3 max-w-sm">
          C programming tips, exam strategies, এবং tech notes — খুব শীঘ্রই এখানে পাবে।
        </p>
      </div>
    </>
  );
}
