import * as React from 'react';
import { cn } from '../utils/cn';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  sticky?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  leftContent,
  rightContent,
  sticky = true,
  className,
  children,
  ...props
}) => {
  return (
    <header
      className={cn(
        'w-full border-b border-border/60 bg-background/50 backdrop-blur-md px-6 h-16 flex items-center justify-between z-30 select-none',
        sticky && 'sticky top-0',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4.5 flex-1">
        {leftContent}
        {children}
      </div>
      <div className="flex items-center gap-3.5">
        {rightContent}
      </div>
    </header>
  );
};
