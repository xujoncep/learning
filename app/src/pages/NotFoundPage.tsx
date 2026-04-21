import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center animate-fade-in">
      <div className="text-8xl font-extrabold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-4">
        404
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        আপনি যেই page খুঁজছেন সেটি নেই বা সরানো হয়েছে।
      </p>
      <Link to="/">
        <Button className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Button>
      </Link>
    </div>
  );
}
