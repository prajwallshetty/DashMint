import * as React from 'react';
import { cn } from '../utils/cn';
import { Button } from './Button';

export interface AnalyticsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  filters?: string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  summaryMetrics?: {
    label: string;
    value: string | number;
    change?: string;
    isPositive?: boolean;
  }[];
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  subtitle,
  filters = ['1D', '1W', '1M', '1Y'],
  activeFilter = '1M',
  onFilterChange,
  summaryMetrics,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-[26px] border border-border/80 bg-background/60 p-6 shadow-soft-sm backdrop-blur-sm select-none flex flex-col gap-6 w-full',
        className
      )}
      {...props}
    >
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-foreground tracking-tight">{title}</h3>
          {subtitle && (
            <p className="text-xs font-semibold text-muted-foreground/80">{subtitle}</p>
          )}
        </div>
        {filters && filters.length > 0 && (
          <div className="flex items-center gap-1 bg-secondary/45 border border-border/40 p-1 rounded-xl shrink-0 self-start">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange?.(filter)}
                className={cn(
                  'px-3 py-1 text-xs font-bold rounded-lg transition-all duration-150',
                  activeFilter === filter
                    ? 'bg-background text-foreground shadow-soft-sm'
                    : 'text-muted-foreground/85 hover:text-foreground'
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Summary Metrics */}
      {summaryMetrics && summaryMetrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-border/30 pb-4">
          {summaryMetrics.map((metric, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-muted-foreground/75 uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground">{metric.value}</span>
              {metric.change && (
                <span
                  className={cn(
                    'text-[10px] font-bold',
                    metric.isPositive !== false ? 'text-green-600' : 'text-red-500'
                  )}
                >
                  {metric.change}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Render Chart Content */}
      <div className="flex-1 w-full min-h-[220px] relative">
        {children}
      </div>
    </div>
  );
};
