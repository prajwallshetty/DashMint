import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Bell, Check, Trash } from '@prajwalshetty/icons';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
  initials?: string;
}

export interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onClearAll?: () => void;
  className?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClearAll,
  className,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          className={cn(
            'relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border/80 bg-secondary/35 text-muted-foreground/80 hover:text-foreground transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/20 hover:bg-secondary/65 shadow-soft-sm cursor-pointer shrink-0',
            className
          )}
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-extrabold text-white border border-background">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={8}
          className="z-50 w-80 sm:w-96 rounded-2xl border border-border bg-background/95 backdrop-blur-md p-4.5 shadow-soft-lg outline-none select-none flex flex-col gap-4 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950/45 dark:text-red-300 px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 rounded-lg text-[10px] font-bold px-2.5 hover:bg-secondary/40"
                  onClick={onMarkAllRead}
                >
                  Mark all read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 rounded-lg text-[10px] font-bold px-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={onClearAll}
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto no-scrollbar">
            {notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => !item.read && onMarkRead?.(item.id)}
                className={cn(
                  'flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer relative group',
                  item.read
                    ? 'border-transparent hover:bg-secondary/25'
                    : 'border-border/30 bg-primary/[0.02] hover:bg-primary/[0.04]'
                )}
              >
                {/* Avatar */}
                {item.avatar || item.initials ? (
                  <Avatar shape="squircle" className="h-8.5 w-8.5 border-border/40 shrink-0">
                    {item.avatar && <AvatarImage src={item.avatar} alt={item.title} />}
                    <AvatarFallback className="text-[10px]">{item.initials}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-8.5 w-8.5 flex items-center justify-center rounded-xl bg-secondary border border-border/40 shrink-0">
                    <Bell className="h-4.5 w-4.5 text-muted-foreground/80" />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-0.5 flex-1 pr-6">
                  <span className={cn('text-xs font-bold text-foreground leading-snug', !item.read && 'font-extrabold')}>
                    {item.title}
                  </span>
                  <span className="text-[10px] font-semibold text-muted-foreground/90 leading-tight">
                    {item.description}
                  </span>
                  <span className="text-[9px] font-bold text-muted-foreground/75 mt-1 uppercase tracking-wide">
                    {item.time}
                  </span>
                </div>

                {/* Read indicator / actions */}
                {!item.read && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center p-6 text-center text-xs font-semibold text-muted-foreground/85 min-h-[120px]">
                All caught up!
              </div>
            )}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};
