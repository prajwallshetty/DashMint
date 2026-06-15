import * as React from 'react';
import { Mail, MoreVertical } from '@dashmint/icons';
import { cn } from '../utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { Button } from './Button';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  status: 'online' | 'offline' | 'idle';
}

export interface TeamMembersCardProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMember[];
  title?: string;
}

export const TeamMembersCard: React.FC<TeamMembersCardProps> = ({
  members,
  title = 'Team Members',
  className,
  ...props
}) => {
  const statusColors = {
    online: 'bg-green-400 border-green-500',
    idle: 'bg-amber-400 border-amber-500',
    offline: 'bg-muted-foreground/35 border-muted-foreground/50',
  };

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
      <div className="flex flex-col gap-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between gap-3">
            {/* Member Profile */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <Avatar shape="squircle" className="h-9 w-9 border-border/40 shrink-0">
                  {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                  <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                </Avatar>
                {/* Status dot */}
                <span
                  className={cn(
                    'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background',
                    statusColors[member.status]
                  )}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-foreground truncate">{member.name}</span>
                <span className="text-[10px] font-semibold text-muted-foreground/80 truncate leading-tight">
                  {member.role}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="sm" className="h-8.5 w-8.5 p-0 rounded-xl hover:bg-secondary/65">
                <Mail className="h-4 w-4 text-muted-foreground/85 hover:text-foreground" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8.5 w-8.5 p-0 rounded-xl hover:bg-secondary/65">
                <MoreVertical className="h-4 w-4 text-muted-foreground/85 hover:text-foreground" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
