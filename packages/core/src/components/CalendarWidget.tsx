import * as React from 'react';
import { ChevronLeft, ChevronRight } from '@prajwalshetty/icons';
import { cn } from '../utils/cn';

export interface CalendarEvent {
  date: string; // YYYY-MM-DD
  title: string;
  type?: 'primary' | 'accent' | 'warning';
}

export interface CalendarWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  events = [],
  onDateSelect,
  selectedDate: propsSelectedDate,
  className,
  ...props
}) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date>(propsSelectedDate || new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevDaysInMonth = new Date(year, month, 0).getDate();

  const days: { date: Date; isCurrentMonth: boolean; hasEvent?: boolean; eventType?: string }[] = [];

  // Previous month fill days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevDaysInMonth - i);
    days.push({ date: d, isCurrentMonth: false });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    const dateStr = d.toISOString().split('T')[0];
    const dayEvent = events.find((e) => e.date === dateStr);
    days.push({
      date: d,
      isCurrentMonth: true,
      hasEvent: !!dayEvent,
      eventType: dayEvent?.type || 'primary',
    });
  }

  // Next month fill days
  const remainingCells = 42 - days.length; // 6 rows of 7
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    days.push({ date: d, isCurrentMonth: false });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (d: Date) => {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (d: Date) => {
    return (
      d.getDate() === selectedDate.getDate() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateClick = (d: Date) => {
    setSelectedDate(d);
    onDateSelect?.(d);
  };

  return (
    <div
      className={cn(
        'rounded-[26px] border border-border/80 bg-background/60 p-6 shadow-soft-sm backdrop-blur-sm select-none w-full flex flex-col gap-4',
        className
      )}
      {...props}
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-foreground">
          {monthNames[month]} {year}
        </h4>
        <div className="flex items-center gap-1.5 bg-secondary/45 border border-border/40 p-1 rounded-xl">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-all duration-150"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-all duration-150"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-muted-foreground/75 uppercase tracking-wide border-b border-border/30 pb-2">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((item, idx) => {
          const today = isToday(item.date);
          const selected = isSelected(item.date);
          return (
            <button
              key={idx}
              onClick={() => handleDateClick(item.date)}
              className={cn(
                'aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-semibold relative transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/20',
                !item.isCurrentMonth && 'text-muted-foreground/35',
                item.isCurrentMonth && 'text-foreground/90 hover:bg-secondary/40',
                today && 'text-primary bg-primary/10 border border-primary/25',
                selected && 'bg-primary text-primary-foreground hover:bg-primary/95 shadow-soft-sm'
              )}
            >
              <span>{item.date.getDate()}</span>
              
              {/* Event indicators */}
              {item.hasEvent && !selected && (
                <span
                  className={cn(
                    'absolute bottom-1.5 h-1.5 w-1.5 rounded-full',
                    item.eventType === 'primary' && 'bg-primary',
                    item.eventType === 'accent' && 'bg-amber-400',
                    item.eventType === 'warning' && 'bg-red-400'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
