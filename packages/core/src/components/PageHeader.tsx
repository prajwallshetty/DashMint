import * as React from 'react';
import { cn } from '../utils/cn';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  breadcrumbs,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/30 w-full mb-6 select-none',
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        {breadcrumbs && <div className="text-xs font-semibold text-muted-foreground/80 mb-1">{breadcrumbs}</div>}
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
        {description && (
          <p className="text-sm font-semibold text-muted-foreground/90">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
