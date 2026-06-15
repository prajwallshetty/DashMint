import * as React from 'react';
import { Calendar, Tag } from '@dashmint/icons';
import { cn } from '../utils/cn';
import { Checkbox } from './Checkbox';
import { Badge } from './Badge';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface TaskCardProps
  extends Omit<HTMLMotionProps<'div'>, 'ref' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  title: string;
  description?: string;
  dueDate?: string;
  tags?: { label: string; variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' }[];
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  completed?: boolean;
  onCompletedChange?: (completed: boolean) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  dueDate,
  tags = [],
  assignee,
  completed = false,
  onCompletedChange,
  className,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'rounded-[22px] border border-border/80 bg-background p-4.5 shadow-soft-sm flex gap-4 select-none',
        completed && 'opacity-65 border-border/40 bg-secondary/15',
        className
      )}
      {...props}
    >
      {/* Complete Checkbox */}
      <div className="pt-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={completed} onCheckedChange={(val) => onCompletedChange?.(!!val)} />
      </div>

      {/* Task Content */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="flex flex-col gap-1">
          <h4
            className={cn(
              'text-sm font-bold text-foreground leading-snug break-words transition-all duration-200',
              completed && 'line-through text-muted-foreground/90'
            )}
          >
            {title}
          </h4>
          {description && (
            <p className="text-xs font-semibold text-muted-foreground/90 line-clamp-2">{description}</p>
          )}
        </div>

        {/* Bottom Details */}
        <div className="flex flex-wrap items-center justify-between gap-3.5 mt-1">
          <div className="flex items-center gap-3">
            {/* Due Date */}
            {dueDate && (
              <div className="flex items-center gap-1.5 text-muted-foreground/80">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{dueDate}</span>
              </div>
            )}

            {/* Tags */}
            {tags.map((tag, idx) => (
              <Badge key={idx} variant={tag.variant || 'primary'} className="text-[9px] px-2 h-5 flex items-center font-bold">
                {tag.label}
              </Badge>
            ))}
          </div>

          {/* Assignee */}
          {assignee && (
            <Avatar shape="squircle" className="h-7.5 w-7.5 shrink-0 border-border/40">
              {assignee.avatar && <AvatarImage src={assignee.avatar} alt={assignee.name} />}
              <AvatarFallback className="text-[10px]">{assignee.initials}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </motion.div>
  );
};
