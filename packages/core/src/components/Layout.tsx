import * as React from 'react';
import { Menu, X } from '@dashmint/icons';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

// Container Component
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ fluid = false, className, ...props }) => {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        fluid ? 'max-w-full' : 'max-w-7xl',
        className
      )}
      {...props}
    />
  );
};

// Grid Component
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Grid: React.FC<GridProps> = ({ cols = 3, gap = 'md', className, ...props }) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    12: 'grid-cols-1 sm:grid-cols-6 lg:grid-cols-12',
  };

  const gapClasses = {
    sm: 'gap-3.5',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
  };

  return <div className={cn('grid', colClasses[cols], gapClasses[gap], className)} {...props} />;
};

// DashboardLayout Component
export interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  navbar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  navbar,
  children,
  className,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={cn('flex min-h-screen bg-background text-foreground', className)}>
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block shrink-0">
        {sidebar}
      </div>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/15 backdrop-blur-md lg:hidden"
            />
            {/* Slide container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 35 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-72 bg-background shadow-soft-lg lg:hidden flex flex-col border-r border-border/80"
            >
              <div className="absolute right-4 top-4 z-50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-4.5 w-4.5" />
                </Button>
              </div>
              <div className="h-full overflow-y-auto pt-6">
                {sidebar}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* If navbar is provided, render it. Add custom trigger on mobile */}
        {navbar ? (
          <div className="sticky top-0 z-30 w-full">
            {React.cloneElement(navbar as React.ReactElement<any>, {
              leftContent: (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden rounded-full h-9.5 w-9.5 p-0 shrink-0"
                    onClick={() => setMobileOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  {(navbar as React.ReactElement<any>).props.leftContent}
                </div>
              ),
            })}
          </div>
        ) : (
          /* Mobile Menu Toggle Floating if no navbar is supplied */
          <div className="lg:hidden p-4 sticky top-0 bg-background/60 backdrop-blur-md border-b border-border/40 z-30 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-9.5 w-9.5 p-0"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-bold text-sm tracking-wide">DashMint</span>
            <div className="w-9.5 h-9.5" /> {/* Spacer */}
          </div>
        )}

        {/* Child Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};
