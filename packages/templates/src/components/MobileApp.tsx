import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Home,
  Calendar as CalendarIcon,
  TrendingUp,
  Bell,
  Clock,
  CheckCircle,
  Plus,
  Send,
  User,
  Activity,
  ArrowUpRight
} from '@dashmint/icons';

// Simple class merger helper
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export const MobileApp: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'home' | 'calendar' | 'chat' | 'analytics'>('home');
  const [aiMessage, setAiMessage] = React.useState('');
  const [messages, setMessages] = React.useState([
    { id: '1', role: 'assistant', content: 'Hi! I am DashMint AI. What can I do for you today?', time: '10:02 AM' }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const handleSendAiMessage = () => {
    if (!aiMessage.trim()) return;
    const userMsg = { id: Math.random().toString(), role: 'user' as const, content: aiMessage, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setAiMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMsg = {
        id: Math.random().toString(),
        role: 'assistant' as const,
        content: `I've registered your task: "${userMsg.content}". I've queued this for your focus block.`,
        time: 'Just now'
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1200);
  };

  // 1. Home View
  const renderHomeView = () => {
    const progressPercent = 75; // 12 / 16
    const radius = 36;
    const strokeDashoffset = 2 * Math.PI * radius * (1 - progressPercent / 100);

    return (
      <div className="flex flex-col gap-5.5 overflow-y-auto h-full pb-16 pt-2.5 px-4 no-scrollbar">
        {/* Header Profile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/25 border border-primary/20 flex items-center justify-center font-bold text-primary select-none">
              PS
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-muted-foreground/85">Welcome back,</span>
              <span className="text-sm font-extrabold text-foreground leading-tight">Prajwal Shetty</span>
            </div>
          </div>
          <button className="h-9 w-9 rounded-full bg-secondary/35 border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground relative">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-background" />
          </button>
        </div>

        {/* Circular Progress Circle Widget */}
        <div className="bg-primary text-primary-foreground p-5 rounded-[24px] shadow-soft-sm flex items-center justify-between gap-4 select-none relative overflow-hidden">
          <div className="flex flex-col gap-1 z-10 max-w-[60%]">
            <span className="text-[10px] font-bold text-accent tracking-wider uppercase">Today's Focus</span>
            <h4 className="text-base font-extrabold tracking-tight">Finish Core Milestones</h4>
            <p className="text-[11px] text-primary-foreground/80 leading-normal mt-1">12 of 16 daily tasks logged successfully.</p>
          </div>
          <div className="relative flex items-center justify-center shrink-0 z-10">
            <svg width="88" height="88" className="transform -rotate-90">
              <circle cx="44" cy="44" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="transparent" />
              <circle
                cx="44"
                cy="44"
                r={radius}
                stroke="var(--color-accent, #C3DEC5)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * radius}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute text-xs font-black text-accent">{progressPercent}%</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-background border border-border/80 p-4 rounded-[20px] shadow-soft-sm flex flex-col gap-1.5 select-none">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground/80 uppercase">Focus Time</span>
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-black text-foreground">4.5h</span>
            <span className="text-[9px] font-bold text-green-600 leading-none flex items-center gap-0.5">
              +1.2h vs yesterday
            </span>
          </div>
          <div className="bg-background border border-border/80 p-4 rounded-[20px] shadow-soft-sm flex flex-col gap-1.5 select-none">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground/80 uppercase">Tasks</span>
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-black text-foreground">12/16</span>
            <span className="text-[9px] font-bold text-muted-foreground/80 leading-none">
              4 pending reviews
            </span>
          </div>
        </div>

        {/* Active Collaborators */}
        <div className="flex flex-col gap-2">
          <h5 className="text-[11px] font-bold text-muted-foreground/85 uppercase tracking-wider px-1">Active Collaborators</h5>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 shrink-0">
            {['Lara Croft', 'Anya Taylor', 'Marcus Vance', 'James Carter'].map((name, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="h-9 w-9 rounded-full bg-secondary border border-border/60 flex items-center justify-center text-[10px] font-extrabold text-foreground">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-[9px] font-semibold text-muted-foreground/90 max-w-[50px] truncate text-center">{name.split(' ')[0]}</span>
              </div>
            ))}
            <button className="h-9 w-9 rounded-full border border-dashed border-border/90 hover:bg-secondary/45 flex items-center justify-center shrink-0 text-muted-foreground">
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 2. Calendar View
  const renderCalendarView = () => {
    const days = [
      { day: 'Sun', date: 14, active: false },
      { day: 'Mon', date: 15, active: true },
      { day: 'Tue', date: 16, active: false },
      { day: 'Wed', date: 17, active: false },
      { day: 'Thu', date: 18, active: false },
      { day: 'Fri', date: 19, active: false },
      { day: 'Sat', date: 20, active: false },
    ];

    const events = [
      { time: '09:00 AM', title: 'UX/UI Sprint Kickoff', dur: '45m', type: 'primary' },
      { time: '11:30 AM', title: 'Client Consultation Sync', dur: '1h', type: 'accent' },
      { time: '03:00 PM', title: 'Mobile App Deploy Check', dur: '30m', type: 'warning' },
    ];

    return (
      <div className="flex flex-col gap-5 overflow-y-auto h-full pb-16 pt-2.5 px-4 no-scrollbar">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-extrabold text-foreground tracking-tight">Schedule Dashboard</h4>
          <span className="text-xs font-bold text-muted-foreground/90">June 2026</span>
        </div>

        {/* Days Horizontal Slider */}
        <div className="flex items-center justify-between gap-1 py-1 bg-secondary/35 border border-border/30 rounded-2xl px-2">
          {days.map((d, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col items-center p-2 rounded-xl text-center select-none flex-1 transition-all duration-200',
                d.active ? 'bg-primary text-primary-foreground shadow-soft-sm' : 'hover:bg-secondary/40'
              )}
            >
              <span className={cn('text-[9px] font-bold uppercase', d.active ? 'text-accent' : 'text-muted-foreground/75')}>{d.day}</span>
              <span className="text-xs font-extrabold mt-0.5">{d.date}</span>
            </div>
          ))}
        </div>

        {/* Mobile Agenda List */}
        <div className="flex flex-col gap-3">
          <h5 className="text-[11px] font-bold text-muted-foreground/85 uppercase tracking-wider px-1">Today's Timeline</h5>
          <div className="flex flex-col gap-3">
            {events.map((e, i) => (
              <div key={i} className="flex gap-3.5 items-start p-3.5 bg-background border border-border/80 rounded-2xl shadow-soft-sm">
                <div className="flex flex-col shrink-0 min-w-[60px]">
                  <span className="text-[10px] font-extrabold text-foreground leading-tight">{e.time}</span>
                  <span className="text-[8px] font-bold text-muted-foreground/80 mt-0.5">{e.dur}</span>
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-foreground leading-snug">{e.title}</span>
                  <span className={cn(
                    'text-[8px] font-bold uppercase tracking-wider w-fit px-1.5 py-0.5 rounded-full mt-1.5',
                    e.type === 'primary' && 'bg-primary/10 text-primary',
                    e.type === 'accent' && 'bg-accent/30 text-accent-foreground',
                    e.type === 'warning' && 'bg-red-50 text-red-500 border border-red-100'
                  )}>
                    {e.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 3. AI Chat View
  const renderChatView = () => {
    return (
      <div className="flex flex-col h-full pb-16 pt-2 px-3 justify-between">
        {/* Messages viewport */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-1 py-1 no-scrollbar min-h-[300px]">
          {messages.map((m) => {
            const isAi = m.role === 'assistant';
            return (
              <div key={m.id} className={cn('flex items-start gap-2 max-w-[85%]', isAi ? 'self-start' : 'self-end flex-row-reverse')}>
                <div className={cn('h-7.5 w-7.5 rounded-full shrink-0 flex items-center justify-center text-[8px] font-extrabold', isAi ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground')}>
                  {isAi ? <Sparkles className="h-3.5 w-3.5 text-accent" /> : 'ME'}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className={cn(
                    'p-3 rounded-2xl text-[11px] font-medium leading-relaxed border shadow-soft-sm',
                    isAi ? 'bg-accent/45 text-accent-foreground border-accent-foreground/5 rounded-tl-sm' : 'bg-primary text-primary-foreground border-primary rounded-tr-sm'
                  )}>
                    {m.content}
                  </div>
                  <span className={cn('text-[8px] font-bold text-muted-foreground/75 mt-0.5 px-1', !isAi && 'self-end')}>
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-secondary/35 border border-border/40 rounded-xl w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/75 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/75 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/75 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center border border-border/80 bg-secondary/35 rounded-2xl p-1.5 gap-1.5 shrink-0">
          <input
            value={aiMessage}
            onChange={(e) => setAiMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
            placeholder="Ask AI anything..."
            className="flex-1 bg-transparent text-xs font-semibold px-2.5 outline-none border-none py-1.5 text-foreground placeholder:text-muted-foreground/60 w-full"
          />
          <button
            onClick={handleSendAiMessage}
            disabled={!aiMessage.trim()}
            className="h-8 w-8 rounded-xl bg-primary hover:bg-primary/95 flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5 text-primary-foreground" />
          </button>
        </div>
      </div>
    );
  };

  // 4. Analytics View
  const renderAnalyticsView = () => {
    return (
      <div className="flex flex-col gap-5 overflow-y-auto h-full pb-16 pt-2.5 px-4 no-scrollbar">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-extrabold text-foreground tracking-tight">Active Analytics</h4>
          <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" /> +14% growth
          </span>
        </div>

        {/* SVG Mini Area Chart */}
        <div className="bg-background border border-border/80 p-4.5 rounded-[24px] shadow-soft-sm flex flex-col gap-4 select-none relative">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground/80 uppercase">Weekly Focus Time</span>
            <span className="text-xl font-black text-foreground mt-0.5">24.5 Hours</span>
          </div>
          
          {/* Custom SVG representation */}
          <div className="w-full h-24 pt-2">
            <svg viewBox="0 0 200 80" width="100%" height="100%" className="overflow-visible">
              <defs>
                <linearGradient id="mobile-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary, #0C270E)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--color-primary, #0C270E)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Guides */}
              <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" className="text-border/30" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" className="text-border/30" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="200" y2="75" stroke="currentColor" className="text-border/50" />
              
              {/* Area path */}
              <path d="M 0 65 Q 33 45, 66 55 T 132 25 T 200 15 L 200 75 L 0 75 Z" fill="url(#mobile-area-grad)" />
              {/* Line path */}
              <path d="M 0 65 Q 33 45, 66 55 T 132 25 T 200 15" fill="none" stroke="var(--color-primary, #0C270E)" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Markers */}
              <circle cx="132" cy="25" r="4.5" fill="var(--color-accent, #C3DEC5)" stroke="var(--color-primary, #0C270E)" strokeWidth="2" />
              <circle cx="200" cy="15" r="4.5" fill="var(--color-accent, #C3DEC5)" stroke="var(--color-primary, #0C270E)" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="flex items-center justify-between text-[8px] font-bold text-muted-foreground/80 px-1 border-t border-border/30 pt-2.5">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
          </div>
        </div>

        {/* Small Activities Widget */}
        <div className="flex flex-col gap-2">
          <h5 className="text-[11px] font-bold text-muted-foreground/85 uppercase tracking-wider px-1">Weekly Metrics</h5>
          <div className="bg-secondary/35 border border-border/40 p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-primary" />
              <span className="text-xs font-bold text-foreground">Completion Index</span>
            </div>
            <span className="text-xs font-extrabold text-primary">82% Positive</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center w-full py-6">
      {/* Smartphone Mockup Outer Container */}
      <div className="w-[330px] h-[670px] border-[10px] border-primary rounded-[46px] bg-background shadow-soft-lg relative overflow-hidden flex flex-col font-sans select-none border-t-[12px] border-b-[12px]">
        {/* Notch Status Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5.5 bg-primary rounded-b-2xl z-30 flex items-center justify-between px-4 text-white font-bold select-none">
          <span className="text-[8.5px] font-extrabold select-none">9:41</span>
          <div className="flex items-center gap-1 shrink-0">
            {/* Battery / signal symbols */}
            <span className="text-[8.5px]">📶</span>
            <span className="text-[8.5px]">🔋</span>
          </div>
        </div>

        {/* Status bar spacer */}
        <div className="h-6.5 shrink-0 bg-transparent" />

        {/* Primary Screen View Area */}
        <div className="flex-1 relative overflow-hidden bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="h-full"
            >
              {activeTab === 'home' && renderHomeView()}
              {activeTab === 'calendar' && renderCalendarView()}
              {activeTab === 'chat' && renderChatView()}
              {activeTab === 'analytics' && renderAnalyticsView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Tab Navigation Bar */}
        <div className="absolute bottom-4 left-4 right-4 bg-background/85 border border-border/80 p-2.5 rounded-[22px] shadow-soft-md backdrop-blur-md z-30 flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={cn('p-2.5 rounded-xl transition-all duration-200 cursor-pointer', activeTab === 'home' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
          >
            <Home className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={cn('p-2.5 rounded-xl transition-all duration-200 cursor-pointer', activeTab === 'calendar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
          >
            <CalendarIcon className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={cn('p-2.5 rounded-xl transition-all duration-200 cursor-pointer', activeTab === 'chat' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
          >
            <Sparkles className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={cn('p-2.5 rounded-xl transition-all duration-200 cursor-pointer', activeTab === 'analytics' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
          >
            <TrendingUp className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Home Indicator line */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-muted-foreground/45 rounded-full z-30" />
      </div>
    </div>
  );
};
