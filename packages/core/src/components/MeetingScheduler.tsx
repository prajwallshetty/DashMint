import * as React from 'react';
import { Calendar, Clock, Plus, UserPlus } from '@dashmint/icons';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  meeting?: {
    title: string;
    organizer: string;
    avatar?: string;
    initials: string;
  };
}

export interface MeetingSchedulerProps extends React.HTMLAttributes<HTMLDivElement> {
  slots: TimeSlot[];
  onBookSlot?: (time: string) => void;
  title?: string;
}

export const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({
  slots,
  onBookSlot,
  title = 'Schedule Meetings',
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
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/30 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4.5 w-4.5 text-primary" />
          <h3 className="text-base font-bold text-foreground tracking-tight">{title}</h3>
        </div>
        <Button variant="outline" size="sm" className="h-8.5 rounded-xl text-xs gap-1">
          <Plus className="h-3.5 w-3.5" /> New Event
        </Button>
      </div>

      {/* Slots List */}
      <div className="flex flex-col gap-3">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            className={cn(
              'flex items-center justify-between p-3.5 rounded-[18px] border transition-all duration-150',
              slot.isAvailable
                ? 'border-border/60 bg-secondary/20 hover:bg-secondary/40 border-dashed'
                : 'border-border/80 bg-background/90'
            )}
          >
            {/* Slot Time */}
            <div className="flex items-center gap-3">
              <Clock className="h-4.5 w-4.5 text-muted-foreground/85" />
              <span className="text-sm font-bold text-foreground">{slot.time}</span>
            </div>

            {/* Availability details / bookings */}
            {slot.isAvailable ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8.5 text-xs text-primary font-bold hover:bg-primary/10 rounded-xl"
                onClick={() => onBookSlot?.(slot.time)}
              >
                Available - Book Now
              </Button>
            ) : slot.meeting ? (
              <div className="flex items-center gap-3.5">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-foreground leading-tight">
                    {slot.meeting.title}
                  </span>
                  <span className="text-[10px] font-semibold text-muted-foreground/80">
                    with {slot.meeting.organizer}
                  </span>
                </div>
                <Avatar shape="squircle" className="h-8 w-8">
                  {slot.meeting.avatar && <AvatarImage src={slot.meeting.avatar} alt={slot.meeting.organizer} />}
                  <AvatarFallback className="text-xs">{slot.meeting.initials}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <span className="text-xs font-semibold text-muted-foreground/90">Booked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
