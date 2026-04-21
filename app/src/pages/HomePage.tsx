import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, Sparkles, Mail, Layers, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { docs, sections } from '@/lib/content';

// Inline Brand Icons since lucide-react 1.0+ removed them
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

export function HomePage() {
  const totalDocs = docs.length;
  const writtenQuestions = "250+";
  const mcqs = "1500+";
  const totalTopics = sections.length + docs.filter(d => d.section === 'root').length;

  // Separate pure topics (root) from major sections (e.g. gate-cse)
  const groupedSections = sections.filter(s => s.id !== 'root');
  const rootDocs = docs.filter(s => s.section === 'root');

  const scrollToExplore = () => {
    const element = document.getElementById('explore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-slate-50/30 dark:bg-slate-900/10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.12),transparent_50%)]" />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-32 lg:pt-32 lg:pb-40 text-center">
          <Badge variant="outline" className="mb-8 gap-2 px-3 py-1 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Modern Learning Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
            <span className="block text-foreground whitespace-nowrap">
              Software Engineering
            </span>
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary/90 to-blue-500 bg-clip-text text-transparent">
              শেখার Hub
            </span>
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
            বাংলায় ব্যাখ্যা, <span className="text-foreground">English keywords</span>, practical examples, এবং ডায়াগ্রাম দিয়ে
            তৈরি এক complete রিলেশনশিপ গাইড।
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-lg font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all gap-2" onClick={scrollToExplore}>
              Start Learning <ArrowRight className="h-5 w-5" />
            </Button>
            <a
              href="https://github.com/sujoncep/learning"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold rounded-full border-2 hover:bg-muted/50 transition-all w-full">
                View Repository
              </Button>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-muted-foreground/80">
             <a href="https://github.com/xujoncep" target="_blank" rel="noreferrer" className="p-2.5 hover:text-foreground hover:bg-primary/10 rounded-xl transition-all"><Github className="w-6 h-6"/></a>
             <a href="https://www.linkedin.com/in/sujoncep/" target="_blank" rel="noreferrer" className="p-2.5 hover:text-[#0a66c2] hover:bg-primary/10 rounded-xl transition-all"><Linkedin className="w-6 h-6"/></a>
             <a href="https://facebook.com/sujoncep" target="_blank" rel="noreferrer" className="p-2.5 hover:text-[#1877F2] hover:bg-primary/10 rounded-xl transition-all"><Facebook className="w-6 h-6"/></a>
             <a href="mailto:sujoncep@gmail.com" className="p-2.5 hover:text-red-500 hover:bg-primary/10 rounded-xl transition-all"><Mail className="w-6 h-6"/></a>
          </div>
        </div>
      </section>

      {/* Info Stats Section - Positioned Overlapping */}
      <section className="relative z-20 -mt-16 sm:-mt-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard icon={<BookOpen className="h-6 w-6" />} value={String(totalDocs)} label="Total Document" color="blue" />
          <StatCard icon={<Code2 className="h-6 w-6" />} value={writtenQuestions} label="Written Question" color="purple" />
          <StatCard icon={<Layers className="h-6 w-6" />} value={mcqs} label="MCQ Practices" color="orange" />
          <StatCard icon={<Sparkles className="h-6 w-6" />} value={String(totalTopics)} label="Topics & Sections" color="green" />
        </div>
      </section>

      {/* Explore Sections & Topics */}
      <section id="explore" className="max-w-7xl mx-auto px-6 py-24 lg:py-32 scroll-mt-20">
        <header className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Explore the <span className="text-primary">Library</span></h2>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Professional documentation and interview-oriented materials organized for deep understanding and quick revision.
          </p>
        </header>

        {/* Section Modules */}
        {groupedSections.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full" />
                Comprehensive Learning Guides
              </h3>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {groupedSections.map((section) => (
                <ProfessionalCard
                  key={section.id}
                  icon={section.icon}
                  title={section.title}
                  description={`Complete module for ${section.title}. Focused on core fundamentals and exam-specific deep dives.`}
                  badge={`${section.docs.length} Chapters`}
                  link={`/sections/${section.id}`}
                  actionText="Explore Modules"
                  isSection
                />
              ))}
            </div>
          </div>
        )}

        {/* Individual Topics */}
        {rootDocs.length > 0 && (
          <div>
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-2 h-8 bg-slate-400 rounded-full" />
                Individual Handbooks
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rootDocs.map((doc) => (
                <ProfessionalCard
                  key={doc.slug}
                  icon="📄"
                  title={doc.title}
                  description="Detailed technical handbook with concepts and examples."
                  badge="Handbook"
                  link={doc.path}
                  actionText="Read Handbook"
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Features - Clean AWS Look */}
      <section className="bg-slate-50/50 dark:bg-slate-900/20 py-24 border-y border-border/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 px-4">
             <h2 className="text-4xl font-extrabold mb-4">Engineered for Success</h2>
             <p className="text-xl text-muted-foreground">High-quality technical content designed for the modern engineer.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureItem
              icon="🌐"
              title="Bilingual Approach"
              desc="Bangla for deeper conceptual clarity and English for technical precision."
            />
            <FeatureItem
              icon="📊"
              title="Visual Schematics"
              desc="System diagrams and flowcharts for complex architectural understanding."
            />
            <FeatureItem
              icon="📝"
              title="Exam Ready"
              desc="Curated previous year questions and practice sets for top certifications."
            />
            <FeatureItem
              icon="📱"
              title="PWA Ready"
              desc="Access your learning hub from any device, anytime with offline support."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'border-t-blue-500 text-blue-500',
    purple: 'border-t-purple-500 text-purple-500',
    orange: 'border-t-orange-500 text-orange-500',
    green: 'border-t-green-500 text-green-500',
  };

  return (
    <div className={`p-6 bg-card border border-border/60 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-b from-card to-card/95 border-t-4 ${colorMap[color] || 'border-t-primary'}`}>
      <div className="flex flex-col items-center text-center gap-3">
        <div className="p-3 bg-muted/50 rounded-2xl group-hover:bg-muted transition-colors">
          {icon}
        </div>
        <div>
          <div className="text-3xl font-black text-foreground mb-1 tracking-tight">{value}</div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{label}</div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalCard({ icon, title, description, badge, link, actionText, isSection = false }: any) {
  return (
    <Card className="flex flex-col h-full bg-card border border-border/80 shadow-sm transition-all hover:shadow-md hover:border-primary/40 group relative overflow-hidden">
      {/* AWS Accent top border */}
      <div className={`absolute top-0 left-0 w-full h-[3px] ${isSection ? 'bg-primary' : 'bg-slate-400 opacity-60'}`} />
      
      <CardHeader className="pt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 bg-muted/50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:bg-primary/5 transition-colors">
            {icon}
          </div>
          <Badge variant="secondary" className="font-semibold px-2.5 py-0.5 rounded-full border-none bg-muted text-muted-foreground uppercase text-[10px] tracking-wider">
            {badge}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-base mt-3 leading-relaxed line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="mt-auto pt-6 border-t border-border/40">
        <Link to={link}>
          <Button variant="ghost" className="w-full group/btn flex items-center justify-between px-4 py-6 font-bold text-base hover:bg-primary hover:text-white transition-all rounded-xl">
            {actionText}
            <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-4 p-8 rounded-3xl bg-card border border-border/40 hover:border-primary/20 hover:bg-primary/[0.02] transition-all">
      <div className="text-5xl">{icon}</div>
      <div>
        <h4 className="text-xl font-bold mb-3">{title}</h4>
        <p className="text-muted-foreground leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
