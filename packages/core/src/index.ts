// Styling Utility
export { cn } from './utils/cn';

// Foundation Components
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';

export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { RadioGroup, RadioGroupItem } from './components/RadioGroup';
export type { RadioGroupProps, RadioGroupItemProps } from './components/RadioGroup';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './components/Select';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Badge } from './components/Badge';
export type { BadgePropsType as BadgeProps } from './components/Badge';

export { Avatar, AvatarImage, AvatarFallback } from './components/Avatar';
export type { AvatarProps } from './components/Avatar';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from './components/Drawer';
export type { DrawerProps } from './components/Drawer';

export { ToastProvider, useToast } from './components/Toast';
export type { ToastItem, ToastVariant } from './components/Toast';

// Layout Components
export { Container, Grid, DashboardLayout } from './components/Layout';
export type { ContainerProps, GridProps, DashboardLayoutProps } from './components/Layout';

export { Sidebar } from './components/Sidebar';
export type { SidebarProps, SidebarItem, SidebarGroup } from './components/Sidebar';

export { Navbar } from './components/Navbar';
export type { NavbarProps } from './components/Navbar';

export { PageHeader } from './components/PageHeader';
export type { PageHeaderProps } from './components/PageHeader';

// Productivity Components
export { StatCard } from './components/StatCard';
export type { StatCardProps } from './components/StatCard';

export { AnalyticsCard } from './components/AnalyticsCard';
export type { AnalyticsCardProps } from './components/AnalyticsCard';

export { ActivityFeed } from './components/ActivityFeed';
export type { ActivityFeedProps, ActivityItem } from './components/ActivityFeed';

export { CalendarWidget } from './components/CalendarWidget';
export type { CalendarWidgetProps, CalendarEvent } from './components/CalendarWidget';

export { MeetingScheduler } from './components/MeetingScheduler';
export type { MeetingSchedulerProps, TimeSlot } from './components/MeetingScheduler';

export { TaskCard } from './components/TaskCard';
export type { TaskCardProps } from './components/TaskCard';

export { KanbanBoard } from './components/KanbanBoard';
export type { KanbanBoardProps, KanbanColumn } from './components/KanbanBoard';

export { ProjectOverview } from './components/ProjectOverview';
export type { ProjectOverviewProps } from './components/ProjectOverview';

export { TeamMembersCard } from './components/TeamMembersCard';
export type { TeamMembersCardProps, TeamMember } from './components/TeamMembersCard';

export { Timeline } from './components/Timeline';
export type { TimelineProps, TimelineMilestone } from './components/Timeline';

export { NotificationCenter } from './components/NotificationCenter';
export type { NotificationCenterProps, NotificationItem } from './components/NotificationCenter';

// AI Components
export {
  AITypingIndicator,
  AIMessageBubble,
  PromptInput,
  AILoadingStates,
  AIChatWindow,
} from './components/AIComponents';
export type {
  AIMessage,
  AIMessageBubbleProps,
  PromptInputProps,
  AIChatWindowProps,
} from './components/AIComponents';
