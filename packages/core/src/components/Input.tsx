import * as React from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, label, leftIcon, rightIcon, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn('w-full flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label className="text-xs font-semibold text-muted-foreground/95 px-1 tracking-wider uppercase select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-foreground/80">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'flex h-11 w-full bg-secondary/35 border border-border/80 rounded-2xl px-4 text-sm font-medium transition-all duration-200 placeholder:text-muted-foreground/60 focus:bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-400 focus:border-red-400 focus:ring-red-400/15',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-muted-foreground/80">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 font-medium px-1 mt-0.5">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
