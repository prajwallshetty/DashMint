import * as React from 'react';
import { cn } from '../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn('w-full flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label className="text-xs font-semibold text-muted-foreground/95 px-1 tracking-wider uppercase select-none">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'flex min-h-[96px] w-full bg-secondary/35 border border-border/80 rounded-2xl p-4 text-sm font-medium transition-all duration-200 placeholder:text-muted-foreground/60 focus:bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/15',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-medium px-1 mt-0.5">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
