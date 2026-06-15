import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@prajwalshetty/icons';
import { cn } from '../utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  size = 'md',
  showCloseButton = true,
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[96vw] h-[92vh]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPrimitive.Root open={isOpen} onOpenChange={(val) => !val && onClose()}>
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="fixed inset-0 z-50 bg-foreground/15 backdrop-blur-md dark:bg-black/45"
              />
            </DialogPrimitive.Overlay>

            {/* Content Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <DialogPrimitive.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 15 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className={cn(
                    'relative w-full overflow-hidden rounded-[28px] border border-border/80 bg-background p-6 shadow-soft-lg outline-none flex flex-col',
                    sizes[size],
                    className
                  )}
                >
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground/80 hover:bg-secondary/65 hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                      aria-label="Close dialog"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                  )}
                  {children}
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </AnimatePresence>
  );
};

// Sub-components for structure
const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-left mb-4', className)} {...props} />
);

const ModalTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 className={cn('text-xl font-bold tracking-tight text-foreground', className)} {...props} />
);

const ModalDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-sm text-muted-foreground/95', className)} {...props} />
);

const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2.5 mt-6', className)} {...props} />
);

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter };
