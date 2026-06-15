import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from '@prajwalshetty/icons';
import { cn } from '../utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  sparklineData?: number[];
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  sparklineData,
  className,
}) => {
  // Generate simple sparkline SVG path
  const generateSparklinePath = (data: number[]) => {
    if (!data || data.length < 2) return '';
    const width = 100;
    const height = 30;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    return data
      .map((val, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height + 2; // Offset slightly
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const sparklinePath = sparklineData ? generateSparklinePath(sparklineData) : '';
  const isPositive = trend?.isPositive !== false;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={cn(
        'relative overflow-hidden rounded-[26px] border border-border/80 bg-background/60 p-6 shadow-soft-sm backdrop-blur-sm select-none flex flex-col justify-between min-h-[160px]',
        className
      )}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-muted-foreground/90 uppercase tracking-wider">{title}</span>
          <span className="text-3xl font-extrabold tracking-tight text-foreground">{value}</span>
        </div>
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/65 border border-border/40 text-muted-foreground/95 shadow-soft-sm">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between w-full mt-5">
        {trend && (
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold',
                isPositive
                  ? 'bg-green-100 text-green-800 dark:bg-green-950/45 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-950/45 dark:text-red-300'
              )}
            >
              {isPositive ? <ArrowUpRight className="h-3 w-3 stroke-[2.5]" /> : <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />}
              {trend.value}%
            </span>
            {trend.label && (
              <span className="text-[11px] font-bold text-muted-foreground/85">{trend.label}</span>
            )}
          </div>
        )}

        {sparklineData && (
          <div className="w-24 h-8 shrink-0">
            <svg viewBox="0 0 100 35" className="overflow-visible w-full h-full">
              {/* Path Shadow */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                d={sparklinePath}
                fill="none"
                stroke={isPositive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Path Main */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                d={sparklinePath}
                fill="none"
                stroke={isPositive ? 'var(--color-primary, #4F7061)' : '#EF4444'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};
