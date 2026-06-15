import * as React from 'react';
import { cn } from '../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
}

function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none';

  const variants = {
    primary: 'bg-accent text-accent-foreground border border-accent-foreground/5',
    secondary: 'bg-secondary text-secondary-foreground border border-border/40',
    success: 'bg-green-100 dark:bg-green-950/45 text-green-800 dark:text-green-300 border border-green-200/40 dark:border-green-900/40',
    warning: 'bg-amber-100 dark:bg-amber-950/45 text-amber-800 dark:text-amber-300 border border-amber-200/40 dark:border-amber-900/40',
    destructive:
      'bg-red-100 dark:bg-red-950/45 text-red-800 dark:text-red-300 border border-red-200/40 dark:border-red-900/40',
    outline: 'text-foreground border border-border bg-background/50',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
export type { BadgeProps as BadgePropsType };
