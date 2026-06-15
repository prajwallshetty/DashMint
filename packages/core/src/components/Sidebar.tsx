import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@dashmint/icons';
import { cn } from '../utils/cn';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  badge?: string | number;
}

export interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  groups: SidebarGroup[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  defaultCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  groups,
  logo,
  footer,
  className,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 260 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className={cn(
        'h-screen sticky top-0 flex flex-col border-r border-border/80 bg-background/50 backdrop-blur-md px-3.5 py-5 select-none relative shrink-0 z-40',
        className
      )}
    >
      {/* Collapse/Expand Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 flex h-7.5 w-7.5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground/80 hover:text-foreground shadow-soft-sm transition-colors hover:bg-secondary/40 outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Logo Area */}
      {logo && (
        <div className={cn('flex items-center gap-3 mb-8 px-2 overflow-hidden h-10', isCollapsed && 'justify-center px-0')}>
          {logo}
        </div>
      )}

      {/* Navigation Groups */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto no-scrollbar">
        {groups.map((group, gIndex) => (
          <div key={gIndex} className="flex flex-col gap-1.5">
            {group.title && !isCollapsed && (
              <h5 className="text-[10px] font-bold text-muted-foreground/75 px-3 uppercase tracking-wider select-none mb-1">
                {group.title}
              </h5>
            )}
            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <SidebarItemRow key={item.id} item={item} isCollapsed={isCollapsed} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Area */}
      {footer && (
        <div className={cn('mt-auto pt-4 border-t border-border/30 overflow-hidden', isCollapsed && 'flex justify-center border-t-0 pt-0')}>
          {footer}
        </div>
      )}
    </motion.aside>
  );
};

interface SidebarItemRowProps {
  item: SidebarItem;
  isCollapsed: boolean;
}

const SidebarItemRow: React.FC<SidebarItemRowProps> = ({ item, isCollapsed }) => {
  const { label, icon, active, onClick, badge } = item;

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center h-10 rounded-xl px-3 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/25 w-full text-left group select-none font-semibold text-sm',
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/25',
        isCollapsed && 'justify-center px-0'
      )}
    >
      {/* Sliding Background for Active Item */}
      {active && (
        <motion.div
          layoutId="sidebar-active-bg"
          className="absolute inset-0 bg-accent/65 dark:bg-accent/15 rounded-xl -z-10"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      {/* Icon */}
      <span className={cn('shrink-0 flex items-center justify-center', isCollapsed ? 'h-10 w-10' : 'mr-3')}>
        {icon}
      </span>

      {/* Label and Badge */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between w-full"
        >
          <span className="truncate">{label}</span>
          {badge !== undefined && (
            <span
              className={cn(
                'ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full',
                active ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'
              )}
            >
              {badge}
            </span>
          )}
        </motion.div>
      )}

      {/* Collapsed Tooltip */}
      {isCollapsed && (
        <div className="absolute left-18 scale-0 origin-left rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-soft-sm opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 pointer-events-none z-50 whitespace-nowrap">
          {label}
        </div>
      )}
    </button>
  );
};
