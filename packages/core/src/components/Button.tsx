import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'children'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      whileHover,
      whileTap,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      primary: 'bg-primary text-primary-foreground shadow-soft-sm hover:bg-primary/95',
      secondary:
        'bg-secondary text-secondary-foreground shadow-soft-sm hover:bg-secondary/80 border border-border/40',
      accent: 'bg-accent text-accent-foreground shadow-soft-sm hover:bg-accent/90',
      outline:
        'border border-border/80 bg-background/50 backdrop-blur-sm text-foreground hover:bg-secondary/40 hover:text-foreground',
      ghost: 'text-foreground hover:bg-secondary/40 hover:text-foreground',
      link: 'text-primary underline-offset-4 hover:underline bg-transparent p-0 shadow-none hover:bg-transparent',
    };

    const sizes = {
      sm: 'h-9 px-4 rounded-xl text-xs gap-1.5',
      md: 'h-11 px-6 rounded-2xl text-sm gap-2',
      lg: 'h-13 px-8 rounded-[20px] text-base gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={disabled || isLoading ? undefined : whileHover || { y: -1, scale: 1.01 }}
        whileTap={disabled || isLoading ? undefined : whileTap || { y: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== 'link' && sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
