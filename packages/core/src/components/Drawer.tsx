import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@dashmint/icons';
import { cn } from '../utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'full';
  showCloseButton?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  className,
  side = 'right',
  size = 'md',
  showCloseButton = true,
}) => {
  const getSlideTransition = () => {
    switch (side) {
      case 'left':
        return {
          initial: { x: '-100%' },
          animate: { x: 0 },
          exit: { x: '-100%' },
        };
      case 'right':
        return {
          initial: { x: '100%' },
          animate: { x: 0 },
          exit: { x: '100%' },
        };
      case 'top':
        return {
          initial: { y: '-100%' },
          animate: { y: 0 },
          exit: { y: '-100%' },
        };
      case 'bottom':
        default:
        return {
          initial: { y: '100%' },
          animate: { y: 0 },
          exit: { y: '100%' },
        };
    }
  };

  const getPositionClasses = () => {
    switch (side) {
      case 'left':
        return 'left-0 top-0 bottom-0 h-full border-r';
      case 'right':
        return 'right-0 top-0 bottom-0 h-full border-l';
      case 'top':
        return 'top-0 left-0 right-0 w-full border-b';
      case 'bottom':
      default:
        return 'bottom-0 left-0 right-0 w-full border-t';
    }
  };

  const getSizes = () => {
    const isHorizontal = side === 'left' || side === 'right';
    if (isHorizontal) {
      switch (size) {
        case 'sm':
          return 'w-80';
        case 'md':
          return 'w-96';
        case 'lg':
          return 'w-[32rem] max-w-[90vw]';
        case 'full':
          return 'w-screen';
      }
    } else {
      switch (size) {
        case 'sm':
          return 'h-80';
        case 'md':
          return 'h-96';
        case 'lg':
          return 'h-[32rem] max-h-[90vh]';
        case 'full':
          return 'h-screen';
      }
    }
  };

  const slideDef = getSlideTransition();

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

            {/* Content container */}
            <DialogPrimitive.Content asChild>
              <motion.div
                initial={slideDef.initial}
                animate={slideDef.animate}
                exit={slideDef.exit}
                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                className={cn(
                  'fixed z-50 bg-background p-6 shadow-soft-lg outline-none flex flex-col border-border/80',
                  getPositionClasses(),
                  getSizes(),
                  // Add rounded corners depending on side
                  side === 'right' && 'rounded-l-[28px]',
                  side === 'left' && 'rounded-r-[28px]',
                  side === 'top' && 'rounded-b-[28px]',
                  side === 'bottom' && 'rounded-t-[28px]',
                  className
                )}
              >
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-full p-1.5 text-muted-foreground/80 hover:bg-secondary/65 hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                    aria-label="Close sheet"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                )}
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </AnimatePresence>
  );
};

// Sub-components for drawer structure
const DrawerHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-left mb-5 mt-2', className)} {...props} />
);

const DrawerTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h2 className={cn('text-lg font-bold tracking-tight text-foreground', className)} {...props} />
);

const DrawerDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-sm text-muted-foreground/95', className)} {...props} />
);

const DrawerFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2 mt-auto pt-6', className)} {...props} />
);

export { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter };
