import { AlertCircle, Info, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'success' | 'danger' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const config: Record<
  CalloutType,
  { icon: typeof Info; className: string; iconClass: string }
> = {
  info: {
    icon: Info,
    className: 'bg-blue-500/10 border-blue-500/30 dark:bg-blue-500/5',
    iconClass: 'text-blue-500',
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-amber-500/10 border-amber-500/30 dark:bg-amber-500/5',
    iconClass: 'text-amber-500',
  },
  success: {
    icon: CheckCircle2,
    className: 'bg-green-500/10 border-green-500/30 dark:bg-green-500/5',
    iconClass: 'text-green-500',
  },
  danger: {
    icon: XCircle,
    className: 'bg-red-500/10 border-red-500/30 dark:bg-red-500/5',
    iconClass: 'text-red-500',
  },
  tip: {
    icon: Lightbulb,
    className: 'bg-purple-500/10 border-purple-500/30 dark:bg-purple-500/5',
    iconClass: 'text-purple-500',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, className, iconClass } = config[type];

  return (
    <div className={cn('my-6 flex gap-3 rounded-lg border p-4', className)}>
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconClass)} />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-1 text-foreground">{title}</p>}
        <div className="text-sm leading-6 text-foreground/90 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
