import * as React from 'react';
import { Plus, MoreHorizontal } from '@prajwalshetty/icons';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { TaskCard, TaskCardProps } from './TaskCard';
import { motion } from 'framer-motion';

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: (TaskCardProps & { id: string })[];
}

export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[];
  onAddTask?: (columnId: string) => void;
  onTaskClick?: (taskId: string) => void;
  onCardMove?: (taskId: string, sourceColumnId: string, targetColumnId: string) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  onAddTask,
  onTaskClick,
  onCardMove,
  className,
  ...props
}) => {
  const [activeDropColumn, setActiveDropColumn] = React.useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string, sourceColumnId: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId, sourceColumnId }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const { taskId, sourceColumnId } = JSON.parse(dataStr);
      if (sourceColumnId !== targetColumnId) {
        onCardMove?.(taskId, sourceColumnId, targetColumnId);
      }
    } catch (err) {
      console.error('Failed to parse drag data', err);
    } finally {
      setActiveDropColumn(null);
    }
  };

  return (
    <div
      className={cn(
        'flex gap-6 overflow-x-auto pb-4 w-full select-none snap-x scrollbar-thin',
        className
      )}
      {...props}
    >
      {columns.map((column) => {
        const isDropTarget = activeDropColumn === column.id;
        return (
          <div
            key={column.id}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => {
              e.preventDefault();
              setActiveDropColumn(column.id);
            }}
            onDragLeave={() => {
              if (activeDropColumn === column.id) {
                setActiveDropColumn(null);
              }
            }}
            onDrop={(e) => handleDrop(e, column.id)}
            className={cn(
              'flex flex-col w-80 shrink-0 bg-secondary/15 border border-border/40 p-4 rounded-[26px] h-[calc(100vh-12rem)] snap-align-start transition-all duration-200',
              isDropTarget && 'bg-accent/15 border-primary/50 scale-[1.01]'
            )}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground tracking-tight">
                  {column.title}
                </span>
                <span className="text-[10px] font-bold bg-secondary border border-border/50 text-muted-foreground/95 px-2 py-0.5 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg hover:bg-secondary/60"
                  onClick={() => onAddTask?.(column.id)}
                >
                  <Plus className="h-4 w-4 text-muted-foreground/90 hover:text-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg hover:bg-secondary/60"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground/90 hover:text-foreground" />
                </Button>
              </div>
            </div>

            {/* Column Tasks scroll list */}
            <div className="flex-1 flex flex-col gap-3.5 overflow-y-auto no-scrollbar pb-2">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  onClick={() => onTaskClick?.(task.id)}
                  className="cursor-grab active:cursor-grabbing outline-none"
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <TaskCard {...task} />
                  </motion.div>
                </div>
              ))}

              {column.tasks.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border/80 rounded-[20px] p-6 text-center text-xs font-semibold text-muted-foreground/75 min-h-[140px]">
                  No tasks yet
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
