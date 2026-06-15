import * as React from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, User, RefreshCw } from '@prajwalshetty/icons';
import { cn } from '../utils/cn';
import { Button } from './Button';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

// 1. AI Typing Indicator
export const AITypingIndicator: React.FC = () => {
  const dotVariants = {
    animate: (i: number) => ({
      y: [0, -6, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.15,
      },
    }),
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-2 bg-secondary/35 border border-border/40 rounded-2xl w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={dotVariants}
          animate="animate"
          className="h-2 w-2 rounded-full bg-primary/75"
        />
      ))}
    </div>
  );
};

// 2. AI Message Bubble
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface AIMessageBubbleProps {
  message: AIMessage;
  userAvatar?: string;
  userInitials?: string;
  aiAvatar?: string;
  aiName?: string;
}

export const AIMessageBubble: React.FC<AIMessageBubbleProps> = ({
  message,
  userAvatar,
  userInitials = 'ME',
  aiAvatar,
  aiName = 'DashMint AI',
}) => {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={cn('flex items-start gap-3.5 max-w-[85%] select-none', isAssistant ? 'self-start' : 'self-end flex-row-reverse')}
    >
      {/* Sender Avatar */}
      <Avatar shape="squircle" className={cn('h-8.5 w-8.5 border-border/40 shrink-0', isAssistant ? 'bg-primary/10' : 'bg-secondary')}>
        {isAssistant ? (
          <>
            {aiAvatar && <AvatarImage src={aiAvatar} alt={aiName} />}
            <AvatarFallback className="text-[10px]"><Sparkles className="h-4.5 w-4.5 text-primary" /></AvatarFallback>
          </>
        ) : (
          <>
            {userAvatar && <AvatarImage src={userAvatar} alt="User" />}
            <AvatarFallback className="text-[10px] font-bold">{userInitials}</AvatarFallback>
          </>
        )}
      </Avatar>

      {/* Bubble Container */}
      <div className="flex flex-col gap-1.5">
        <div
          className={cn(
            'p-4 rounded-[22px] text-sm font-medium leading-relaxed shadow-soft-sm border',
            isAssistant
              ? 'bg-accent/45 text-accent-foreground border-accent-foreground/5 rounded-tl-[6px]'
              : 'bg-primary text-primary-foreground border-primary rounded-tr-[6px]'
          )}
        >
          {message.content}
        </div>
        {message.timestamp && (
          <span className={cn('text-[9px] font-bold text-muted-foreground/75 uppercase tracking-wider', !isAssistant && 'self-end')}>
            {message.timestamp}
          </span>
        )}
      </div>
    </motion.div>
  );
};

// 3. Prompt Input
export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  isLoading?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask DashMint AI anything...',
  isLoading = false,
  suggestions = [],
  onSuggestionClick,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-3.5 w-full select-none">
      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar shrink-0">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="text-[11px] font-bold px-3 py-1.5 rounded-xl border border-border/60 bg-background hover:bg-secondary/40 text-muted-foreground/90 hover:text-foreground shrink-0 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Main input wrapper */}
      <div className="relative flex items-end border border-border/80 bg-secondary/35 rounded-[22px] focus-within:bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200 p-2 min-h-12 w-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          style={{ height: 'auto', maxHeight: '160px' }}
          className="flex-1 resize-none bg-transparent outline-none border-none py-2 px-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 w-full"
        />
        <Button
          onClick={onSubmit}
          disabled={!value.trim() || isLoading}
          variant="primary"
          size="sm"
          className="rounded-[15px] h-9.5 w-9.5 p-0 shrink-0"
        >
          <Send className="h-4 w-4 text-primary-foreground" />
        </Button>
      </div>
    </div>
  );
};

// 4. AI Loading States / Skeleton
export const AILoadingStates: React.FC = () => {
  return (
    <div className="flex items-start gap-3.5 max-w-[80%] animate-pulse-slow">
      <div className="h-8.5 w-8.5 rounded-[32%] bg-secondary shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 w-40 bg-secondary rounded-lg" />
        <div className="h-3.5 w-full bg-secondary rounded-lg" />
        <div className="h-3.5 w-5/6 bg-secondary rounded-lg" />
      </div>
    </div>
  );
};

// 5. AI Chat Window
export interface AIChatWindowProps {
  messages: AIMessage[];
  value: string;
  onValueChange: (val: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (s: string) => void;
  title?: string;
  onClear?: () => void;
  userAvatar?: string;
  userInitials?: string;
  aiAvatar?: string;
  aiName?: string;
  className?: string;
}

export const AIChatWindow: React.FC<AIChatWindowProps> = ({
  messages,
  value,
  onValueChange,
  onSubmit,
  isLoading = false,
  suggestions = [],
  onSuggestionClick,
  title = 'DashMint Assistant',
  onClear,
  userAvatar,
  userInitials,
  aiAvatar,
  aiName,
  className,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      className={cn(
        'rounded-[26px] border border-border/80 bg-background/60 shadow-soft-sm backdrop-blur-sm select-none w-full flex flex-col h-[520px]',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/30 px-6 py-4.5 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground leading-tight">{title}</span>
            <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">Online & Ready</span>
          </div>
        </div>
        {onClear && messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8.5 rounded-lg text-xs hover:bg-secondary/65 font-bold"
            onClick={onClear}
          >
            Clear Conversation
          </Button>
        )}
      </div>

      {/* Messages viewport */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4.5 flex flex-col gap-5.5 no-scrollbar"
      >
        {messages.map((message) => (
          <AIMessageBubble
            key={message.id}
            message={message}
            userAvatar={userAvatar}
            userInitials={userInitials}
            aiAvatar={aiAvatar}
            aiName={aiName}
          />
        ))}

        {isLoading && <AILoadingStates />}

        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3 select-none">
            <div className="flex h-12 w-12 items-center justify-center rounded-[32%] bg-accent text-accent-foreground shadow-soft-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-0.5 max-w-sm">
              <h4 className="text-sm font-bold text-foreground">Meet {aiName || 'DashMint AI'}</h4>
              <p className="text-xs font-semibold text-muted-foreground/90">
                Ask me to summarize tasks, schedule events, check availability, or outline project milestones.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input section */}
      <div className="px-6 py-4.5 border-t border-border/30 shrink-0 bg-background/35 rounded-b-[26px]">
        <PromptInput
          value={value}
          onChange={onValueChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />
      </div>
    </div>
  );
};
