import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from '@prajwalshetty/icons';
import { cn } from '../utils/cn';

export type ToastVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback(({ title, description, variant = 'info', duration = 4000 }: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastCard key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

interface ToastCardProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ item, onDismiss }) => {
  const { id, title, description, variant = 'info' } = item;

  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    destructive: <AlertCircle className="h-5 w-5 text-red-500" />,
  };

  const borderColors = {
    info: 'border-l-blue-400',
    success: 'border-l-green-400',
    warning: 'border-l-amber-400',
    destructive: 'border-l-red-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -5 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={cn(
        'flex w-full items-start gap-3.5 border-l-4 rounded-xl border border-border/80 bg-background/95 backdrop-blur-md p-4 shadow-soft-md pointer-events-auto select-none overflow-hidden relative',
        borderColors[variant]
      )}
    >
      <span className="mt-0.5 shrink-0">{icons[variant]}</span>
      <div className="flex flex-col gap-0.5 flex-1 pr-4">
        <h4 className="text-sm font-bold text-foreground leading-tight">{title}</h4>
        {description && (
          <p className="text-xs font-semibold text-muted-foreground/90 leading-normal">{description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="absolute right-3.5 top-3.5 text-muted-foreground/80 hover:text-foreground hover:bg-secondary/65 p-1 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
};
