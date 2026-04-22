import { useState, type ImgHTMLAttributes } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ZoomableImage({
  className,
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        {...props}
        alt={alt ?? ''}
        loading="lazy"
        className={cn('cursor-zoom-in', className)}
        onClick={() => setOpen(true)}
      />
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-6 outline-none">
            <Dialog.Title className="sr-only">{alt ?? 'Zoomed image'}</Dialog.Title>
            <Dialog.Description className="sr-only">Image fullscreen view</Dialog.Description>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="absolute top-4 right-4 p-2 rounded-md bg-background/80 border border-border hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
            <img
              {...props}
              alt={alt ?? ''}
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
