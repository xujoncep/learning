import { useParams, Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sections } from '@/lib/content';

export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  
  const sectionData = sections.find((s) => s.id === sectionId);

  if (!sectionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 isolate">
        <h1 className="text-4xl font-bold mb-4">Section Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the section you're looking for.</p>
        <Link to="/">
          <Button variant="default">Back Level</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10 border-b border-border/60 pb-8 tracking-tight">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1">
            Home
          </Link>
          <span className="text-muted-foreground text-sm">/</span>
          <span className="text-primary text-sm font-medium">{sectionData.title}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-4">
          <span className="text-5xl">{sectionData.icon}</span>
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {sectionData.title}
          </span>
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
          Explore all chapters and materials under {sectionData.title}. Select any module to start reading.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sectionData.docs.map((doc) => (
          <Card
            key={doc.slug}
            className="group hover:border-primary/50 hover:shadow-lg transition-all"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl"><BookOpen className="h-6 w-6 text-primary" /></span>
                <Badge variant="secondary" className="text-xs">
                  Chapter {doc.order !== 999 ? doc.order : ''}
                </Badge>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70">
                {doc.title}
              </CardTitle>
              <CardDescription className="truncate">{doc.slug}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to={doc.path}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary group-hover:bg-primary/5"
              >
                Read Chapter <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
