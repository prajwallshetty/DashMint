import * as React from 'react';
import { Calendar, CheckSquare, Layers } from '@prajwalshetty/icons';
import { cn } from '../utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ProjectOverviewProps
  extends Omit<HTMLMotionProps<'div'>, 'ref' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  name: string;
  description?: string;
  progress: number; // 0 to 100
  tasksCount: { completed: number; total: number };
  dueDate?: string;
  members: { name: string; avatar?: string; initials: string }[];
  status?: 'planning' | 'active' | 'completed' | 'on-hold';
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  name,
  description,
  progress,
  tasksCount,
  dueDate,
  members = [],
  status = 'active',
  className,
  ...props
}) => {
  const statusColors = {
    planning: 'bg-blue-100 text-blue-800 dark:bg-blue-950/45 dark:text-blue-300',
    active: 'bg-green-100 text-green-800 dark:bg-green-950/45 dark:text-green-300',
    completed: 'bg-secondary text-foreground/80 dark:bg-secondary/40 dark:text-foreground/80',
    'on-hold': 'bg-amber-100 text-amber-800 dark:bg-amber-950/45 dark:text-amber-300',
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'rounded-[26px] border border-border/80 bg-background/60 p-6 shadow-soft-sm backdrop-blur-sm select-none flex flex-col gap-5.5 w-full',
        className
      )}
      {...props}
    >
      {/* Header section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-foreground tracking-tight leading-tight">{name}</h3>
          {description && (
            <p className="text-xs font-semibold text-muted-foreground/85 line-clamp-1">{description}</p>
          )}
        </div>
        <span
          className={cn(
            'text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize select-none shrink-0 border border-border/10',
            statusColors[status]
          )}
        >
          {status.replace('-', ' ')}
        </span>
      </div>

      {/* Progress visual bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-muted-foreground/85">Progress</span>
          <span className="text-foreground">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-secondary/85 rounded-full overflow-hidden border border-border/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between gap-4 border-t border-border/30 pt-4 mt-1">
        <div className="flex items-center gap-4.5">
          {/* Tasks Summary */}
          <div className="flex items-center gap-1.5 text-muted-foreground/80">
            <CheckSquare className="h-4 w-4" />
            <span className="text-xs font-bold text-foreground">
              {tasksCount.completed}/{tasksCount.total}
            </span>
          </div>

          {/* Due date */}
          {dueDate && (
            <div className="flex items-center gap-1.5 text-muted-foreground/80">
              <Calendar className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{dueDate}</span>
            </div>
          )}
        </div>

        {/* Member Overlapping Stack List */}
        {members.length > 0 && (
          <div className="flex -space-x-2.5 overflow-hidden">
            {members.slice(0, 3).map((member, idx) => (
              <Avatar
                key={idx}
                shape="squircle"
                className="h-7 w-7 border-2 border-background ring-0 shrink-0"
              >
                {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                <AvatarFallback className="text-[9px]">{member.initials}</AvatarFallback>
              </Avatar>
            ))}
            {members.length > 3 && (
              <div className="flex h-7 w-7 items-center justify-center rounded-[32%] border-2 border-background bg-secondary text-[9px] font-extrabold text-muted-foreground/90 shrink-0 select-none">
                +{members.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
