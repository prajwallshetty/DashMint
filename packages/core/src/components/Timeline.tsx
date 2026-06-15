import * as React from 'react';
import { cn } from '../utils/cn';

export interface TimelineMilestone {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: React.ReactNode;
  isCompleted?: boolean;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  milestones: TimelineMilestone[];
}

export const Timeline: React.FC<TimelineProps> = ({ milestones, className, ...props }) => {
  return (
    <div className={cn('flex flex-col relative pl-6 border-l border-border/80 gap-8 py-2 w-full', className)} {...props}>
      {milestones.map((milestone) => (
        <div key={milestone.id} className="relative flex flex-col gap-1 w-full select-none">
          {/* Connector Dot */}
          <div
            className={cn(
              'absolute -left-[32px] top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-background border-2',
              milestone.isCompleted
                ? 'border-primary text-primary'
                : 'border-border text-muted-foreground'
            )}
          >
            {milestone.icon ? (
              <span className="shrink-0">{milestone.icon}</span>
            ) : (
              <div
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  milestone.isCompleted ? 'bg-primary' : 'bg-muted-foreground/35'
                )}
              />
            )}
          </div>

          {/* Milestone Details */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <h4 className="text-sm font-bold text-foreground leading-snug">
              {milestone.title}
            </h4>
            <span className="text-[10px] font-bold text-muted-foreground/75 uppercase tracking-wide shrink-0">
              {milestone.date}
            </span>
          </div>
          {milestone.description && (
            <p className="text-xs font-semibold text-muted-foreground/90">{milestone.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};
