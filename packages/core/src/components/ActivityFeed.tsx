import * as React from 'react';
import { cn } from '../utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

export interface ActivityItem {
  id: string;
  title: string;
  description?: React.ReactNode;
  timestamp: string;
  icon?: React.ReactNode;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[];
  title?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  title = 'Recent Activity',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-[26px] border border-border/80 bg-background/60 p-6 shadow-soft-sm backdrop-blur-sm select-none w-full flex flex-col gap-5.5',
        className
      )}
      {...props}
    >
      {title && (
        <h3 className="text-base font-bold text-foreground tracking-tight border-b border-border/30 pb-3">
          {title}
        </h3>
      )}
      <div className="flex flex-col relative pl-4 border-l border-border/80 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative flex items-start gap-4">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[25px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-background border border-border">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>

            {/* Avatar or Icon */}
            {item.user ? (
              <Avatar shape="squircle" className="h-9 w-9 shrink-0">
                {item.user.avatar && <AvatarImage src={item.user.avatar} alt={item.user.name} />}
                <AvatarFallback>{item.user.initials}</AvatarFallback>
              </Avatar>
            ) : item.icon ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/80 border border-border/40 text-muted-foreground shrink-0">
                {item.icon}
              </div>
            ) : (
              <div className="h-9 w-9 shrink-0" />
            )}

            {/* Item Content */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-sm font-semibold text-foreground leading-snug">
                {item.title}
              </span>
              {item.description && (
                <div className="text-xs font-medium text-muted-foreground/90">{item.description}</div>
              )}
              <span className="text-[10px] font-bold text-muted-foreground/75 mt-0.5 uppercase tracking-wide">
                {item.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
