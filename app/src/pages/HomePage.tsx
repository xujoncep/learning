import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sections } from '@/lib/content';

export function HomePage() {
  const totalDocs = sections.reduce((sum, s) => sum + s.docs.length, 0);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 lg:py-28 text-center">
          <Badge variant="outline" className="mb-6 gap-2">
            <Sparkles className="h-3 w-3 text-primary" />
            Modern Learning Platform
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Software Engineering
            </span>
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-clip-text text-transparent">
              শেখার Hub
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            বাংলায় ব্যাখ্যা, English keywords, practical examples, এবং Mermaid diagrams দিয়ে
            তৈরি এক complete learning resource।
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/docs/gate-cse/00-master-index">
              <Button size="lg" className="gap-2">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href="https://github.com/sujoncep/learning"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                View on GitHub
              </Button>
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <StatCard icon={<BookOpen className="h-5 w-5" />} value={String(totalDocs)} label="Documents" />
            <StatCard icon={<Code2 className="h-5 w-5" />} value="200+" label="PYQs" />
            <StatCard icon={<Zap className="h-5 w-5" />} value="13" label="GATE Chapters" />
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Explore Topics</h2>
        <p className="text-muted-foreground mb-10">
          Comprehensive guides covering networking, security, frontend, and GATE CSE preparation।
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Card
              key={section.id}
              className="group hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{section.icon}</span>
                  <Badge variant="secondary" className="text-xs">
                    {section.docs.length} docs
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {section.title}
                </CardTitle>
                <CardDescription>
                  {section.docs.slice(0, 3).map((d) => d.title).join(' · ')}
                  {section.docs.length > 3 && '...'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {section.docs.slice(0, 5).map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        to={doc.path}
                        className="text-muted-foreground hover:text-primary transition-colors truncate block"
                      >
                        → {doc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {section.docs.length > 5 && (
                  <Link
                    to={section.docs[0].path}
                    className="text-primary text-sm font-medium mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/60 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Why This Platform?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon="🌐"
              title="Bilingual"
              desc="বাংলায় explanation, English এ technical keywords"
            />
            <Feature
              icon="📊"
              title="Rich Diagrams"
              desc="Mermaid দিয়ে visual flowchart, mindmap, sequence"
            />
            <Feature
              icon="📝"
              title="200+ PYQs"
              desc="GATE previous year questions with step-by-step solutions"
            />
            <Feature
              icon="📱"
              title="Responsive"
              desc="Mobile থেকে desktop — সবখানে perfect view"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur p-4">
      <div className="flex items-center justify-center text-primary mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="text-center p-4">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
