import * as React from 'react';
import { AreaChart, AreaChartDataItem } from './AreaChart';
import { cn } from '../utils/cn';

export interface RevenueChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: AreaChartDataItem[];
  totalRevenue: string;
  changeRate?: string;
  isPositive?: boolean;
  height?: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  totalRevenue,
  changeRate,
  isPositive = true,
  height = 200,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col gap-4 w-full select-none', className)} {...props}>
      {/* Metrics Banner */}
      <div className="flex items-baseline gap-2.5 px-1">
        <span className="text-2xl font-black text-foreground tracking-tight">{totalRevenue}</span>
        {changeRate && (
          <span
            className={cn(
              'text-xs font-extrabold px-2 py-0.5 rounded-full',
              isPositive
                ? 'bg-green-100 text-green-800 dark:bg-green-950/45 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-950/45 dark:text-red-300'
            )}
          >
            {isPositive ? '+' : ''}
            {changeRate}
          </span>
        )}
      </div>

      {/* Render Chart */}
      <AreaChart data={data} color="var(--color-primary, #4F7061)" height={height} />
    </div>
  );
};
