import * as React from 'react';
import {
  // Foundation
  Button,
  Input,
  Textarea,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  Switch,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  ToastProvider,
  useToast,
  // Layouts
  Container,
  Grid,
  DashboardLayout,
  Sidebar as LocalSidebar,
  Navbar as LocalNavbar,
  PageHeader as LocalPageHeader,
  // Productivity
  StatCard,
  AnalyticsCard,
  ActivityFeed,
  CalendarWidget,
  MeetingScheduler,
  TaskCard,
  KanbanBoard,
  KanbanColumn,
  ProjectOverview,
  TeamMembersCard,
  Timeline,
  NotificationCenter,
  // AI
  AIChatWindow,
  PromptInput,
  AIMessage,
  AIMessageBubble,
  AITypingIndicator,
  AILoadingStates,
} from '@dashmint/core';

import {
  AreaChart,
  BarChart,
  PieChart,
  RevenueChart,
  GrowthChart,
} from '@dashmint/charts';

import {
  SaaSDashboard,
  CRMDashboard,
  AIDashboard,
  FreelancerDashboard,
  StartupAdminPanel,
  MobileApp,
} from '@dashmint/templates';

import {
  Sparkles,
  Layers,
  Layout,
  Plus,
  Moon,
  Sun,
  Copy,
  Check,
  Code,
  Eye,
  Heart,
  Terminal,
} from '@dashmint/icons';

// Component mapping for the documentation
export function App() {
  const [activeTab, setActiveTab] = React.useState('intro');
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  // Theme toggle utility
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200">
        
        {/* Navigation Navbar */}
        <LocalNavbar
          leftContent={
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-black text-primary flex items-center gap-1.5">
                🍃 DashMint
              </span>
              <Badge variant="primary" className="text-[10px] font-bold">v1.0.0-beta</Badge>
            </div>
          }
          rightContent={
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-9.5 w-9.5 p-0 rounded-full"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9.5 rounded-xl text-xs gap-1.5"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                Github
              </Button>
            </div>
          }
        />

        {/* Core Layout Split */}
        <div className="flex-1 flex max-w-[1440px] mx-auto w-full">
          {/* Docs Sidebar navigation */}
          <aside className="w-68 border-r border-border/60 p-6 flex flex-col gap-6 overflow-y-auto hidden md:block select-none shrink-0">
            
            {/* Group: Getting Started */}
            <div className="flex flex-col gap-1.5">
              <h5 className="text-[10px] font-bold text-muted-foreground/75 px-1 uppercase tracking-wider">Getting Started</h5>
              <div className="flex flex-col gap-0.5">
                <SidebarButton active={activeTab === 'intro'} onClick={() => setActiveTab('intro')}>Introduction</SidebarButton>
                <SidebarButton active={activeTab === 'install'} onClick={() => setActiveTab('install')}>Installation</SidebarButton>
                <SidebarButton active={activeTab === 'theme'} onClick={() => setActiveTab('theme')}>Theme customizer</SidebarButton>
              </div>
            </div>

            {/* Group: Foundation */}
            <div className="flex flex-col gap-1.5">
              <h5 className="text-[10px] font-bold text-muted-foreground/75 px-1 uppercase tracking-wider">Foundation</h5>
              <div className="flex flex-col gap-0.5">
                <SidebarButton active={activeTab === 'button'} onClick={() => setActiveTab('button')}>Button</SidebarButton>
                <SidebarButton active={activeTab === 'input'} onClick={() => setActiveTab('input')}>Inputs & Textarea</SidebarButton>
                <SidebarButton active={activeTab === 'toggle'} onClick={() => setActiveTab('toggle')}>Switch & Toggles</SidebarButton>
                <SidebarButton active={activeTab === 'overlays'} onClick={() => setActiveTab('overlays')}>Modals & Overlays</SidebarButton>
                <SidebarButton active={activeTab === 'badge'} onClick={() => setActiveTab('badge')}>Badge & Avatar</SidebarButton>
              </div>
            </div>

            {/* Group: Productivity */}
            <div className="flex flex-col gap-1.5">
              <h5 className="text-[10px] font-bold text-muted-foreground/75 px-1 uppercase tracking-wider">Productivity</h5>
              <div className="flex flex-col gap-0.5">
                <SidebarButton active={activeTab === 'stat'} onClick={() => setActiveTab('stat')}>Stat & Analytics Card</SidebarButton>
                <SidebarButton active={activeTab === 'task'} onClick={() => setActiveTab('task')}>Task & Kanban</SidebarButton>
                <SidebarButton active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')}>Calendar & Scheduler</SidebarButton>
                <SidebarButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')}>Timeline & Activity</SidebarButton>
              </div>
            </div>

            {/* Group: AI Components */}
            <div className="flex flex-col gap-1.5">
              <h5 className="text-[10px] font-bold text-muted-foreground/75 px-1 uppercase tracking-wider">AI Components</h5>
              <div className="flex flex-col gap-0.5">
                <SidebarButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')}>AI Chat Console</SidebarButton>
              </div>
            </div>

            {/* Group: Charts */}
            <div className="flex flex-col gap-1.5">
              <h5 className="text-[10px] font-bold text-muted-foreground/75 px-1 uppercase tracking-wider">Charts</h5>
              <div className="flex flex-col gap-0.5">
                <SidebarButton active={activeTab === 'charts'} onClick={() => setActiveTab('charts')}>Interactive SVG Charts</SidebarButton>
              </div>
            </div>

            {/* Group: Templates */}
            <div className="flex flex-col gap-1.5">
              <h5 className="text-[10px] font-bold text-muted-foreground/75 px-1 uppercase tracking-wider">Dashboard Templates</h5>
              <div className="flex flex-col gap-0.5">
                <SidebarButton active={activeTab === 'tpl-saas'} onClick={() => setActiveTab('tpl-saas')}>SaaS Dashboard</SidebarButton>
                <SidebarButton active={activeTab === 'tpl-crm'} onClick={() => setActiveTab('tpl-crm')}>CRM Dashboard</SidebarButton>
                <SidebarButton active={activeTab === 'tpl-ai'} onClick={() => setActiveTab('tpl-ai')}>AI Workspace</SidebarButton>
                <SidebarButton active={activeTab === 'tpl-free'} onClick={() => setActiveTab('tpl-free')}>Freelancer Console</SidebarButton>
                <SidebarButton active={activeTab === 'tpl-startup'} onClick={() => setActiveTab('tpl-startup')}>Startup Admin Panel</SidebarButton>
                <SidebarButton active={activeTab === 'tpl-mobile'} onClick={() => setActiveTab('tpl-mobile')}>Mobile App</SidebarButton>
              </div>
            </div>

          </aside>

          {/* Main Docs Content Panel */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            {activeTab === 'intro' && <IntroductionDoc />}
            {activeTab === 'install' && <InstallationDoc />}
            {activeTab === 'theme' && <ThemeCustomizerDoc />}
            
            {/* Foundation Previews */}
            {activeTab === 'button' && <ButtonDocs />}
            {activeTab === 'input' && <InputDocs />}
            {activeTab === 'toggle' && <ToggleDocs />}
            {activeTab === 'badge' && <BadgeDocs />}
            {activeTab === 'overlays' && (
              <OverlayDocs
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}

            {/* Productivity Previews */}
            {activeTab === 'stat' && <StatDocs />}
            {activeTab === 'task' && <TaskDocs />}
            {activeTab === 'schedule' && <ScheduleDocs />}
            {activeTab === 'timeline' && <TimelineDocs />}

            {/* AI Previews */}
            {activeTab === 'ai' && <AIDocs />}

            {/* Charts Previews */}
            {activeTab === 'charts' && <ChartsDocs />}

            {/* Templates Previews */}
            {activeTab === 'tpl-saas' && <SaaSDashboard />}
            {activeTab === 'tpl-crm' && <CRMDashboard />}
            {activeTab === 'tpl-ai' && <AIDashboard />}
            {activeTab === 'tpl-free' && <FreelancerDashboard />}
            {activeTab === 'tpl-startup' && <StartupAdminPanel />}
            {activeTab === 'tpl-mobile' && <MobileAppDocs />}
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/40 py-6 text-center text-xs font-semibold text-muted-foreground select-none">
          Made with <Heart className="inline h-3.5 w-3.5 text-red-500 fill-current" /> for modern developers of DashMint by Prajwall Shetty.
        </footer>
      </div>
    </ToastProvider>
  );
}

// Helper: Sidebar nav button
interface SidebarButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
const SidebarButton: React.FC<SidebarButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 ${
      active
        ? 'bg-accent text-accent-foreground shadow-soft-sm'
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/35'
    }`}
  >
    {children}
  </button>
);

// Helper: Code display box
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-3.5 rounded-2xl border border-border/80 bg-secondary/25 p-4.5 font-mono text-xs text-foreground overflow-x-auto select-all">
      <button
        onClick={copyToClipboard}
        className="absolute right-4 top-4 rounded-xl border border-border bg-background p-1.5 text-muted-foreground/80 hover:text-foreground shadow-soft-sm hover:bg-secondary/40 transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre>{code}</pre>
    </div>
  );
};

// 1. Introduction Doc
const IntroductionDoc = () => (
  <div className="flex flex-col gap-4 max-w-3xl">
    <LocalPageHeader title="DashMint" description="The shadcn/ui for SaaS dashboards and productivity applications." />
    <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
      DashMint is a premium, accessibility-first React 19 component library styled with Tailwind CSS v4 and Framer Motion. 
      It features a minimalist, Soft UI aesthetic (rounded corners, warm cream/beige tones, sage green branding, elegant shadows) 
      designed specifically to help developers build gorgeous dashboards, SaaS interfaces, and collaborative productivity applications.
    </p>
    <div className="mt-4 p-4.5 rounded-[22px] border border-accent-foreground/5 bg-accent/45 text-accent-foreground flex gap-3.5 items-start">
      <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex flex-col">
        <h4 className="text-sm font-bold">Design Philosophy</h4>
        <p className="text-xs font-semibold mt-1 leading-relaxed">
          Inspired by top-tier SaaS layout tools like Linear, Cron, and Notion. We favor 24px+ rounded corners, ample whitespace, 
          harmonious light pastels, dark mode toggles, and responsive canvas sizing.
        </p>
      </div>
    </div>
  </div>
);

// 2. Installation Doc
const InstallationDoc = () => (
  <div className="flex flex-col gap-4 max-w-3xl">
    <LocalPageHeader title="Installation Guide" description="Step by step setup instructions for your React/Tailwind workspace." />
    <h3 className="text-base font-bold text-foreground mt-4">1. Install Dependencies</h3>
    <p className="text-sm font-semibold text-muted-foreground">Add core dependencies to your React project:</p>
    <CodeBlock code="npm install @dashmint/core @dashmint/themes @dashmint/icons framer-motion @radix-ui/react-dialog @radix-ui/react-select" />
    
    <h3 className="text-base font-bold text-foreground mt-6">2. Configure Tailwind CSS v4</h3>
    <p className="text-sm font-semibold text-muted-foreground">Import the DashMint styling directives directly into your global CSS file:</p>
    <CodeBlock code="@import 'tailwindcss';\n@import '@dashmint/themes';" />
  </div>
);

// 3. Theme Customizer Doc
const ThemeCustomizerDoc = () => {
  const [radius, setRadius] = React.useState('24px');
  const [primaryColor, setPrimaryColor] = React.useState('#4F7061');

  const generatedCss = `@theme {\n  --color-primary: ${primaryColor};\n  --radius-xl: ${radius};\n}`;

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <LocalPageHeader title="Theme Customizer" description="Interactively style and export your custom DashMint colors." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-border/80 rounded-[26px] bg-secondary/15">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Primary Sage Tone</label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-10 w-full border border-border rounded-xl cursor-pointer p-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Border Radius (xl)</label>
            <div className="flex gap-2">
              {['16px', '20px', '24px', '28px'].map((r) => (
                <Button
                  key={r}
                  variant={radius === r ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setRadius(r)}
                  className="rounded-xl h-9.5 text-xs font-bold"
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Export Theme CSS</label>
          <pre className="font-mono text-xs p-4 bg-background border border-border/80 rounded-2xl overflow-auto select-all">
            {generatedCss}
          </pre>
        </div>
      </div>
    </div>
  );
};

// 4. Button Docs
const ButtonDocs = () => {
  const { toast } = useToast();
  return (
    <div className="flex flex-col gap-6">
      <LocalPageHeader title="Button" description="Interactive actions with spring transitions and multiple variants." />
      
      <div className="p-8 border border-border/80 rounded-[28px] bg-secondary/15 flex flex-wrap gap-4 items-center justify-center">
        <Button variant="primary" onClick={() => toast({ title: 'Success', description: 'Action completed.', variant: 'success' })}>Primary Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary" isLoading>Loading</Button>
      </div>

      <CodeBlock code="import { Button } from '@dashmint/core';\n\n<Button variant='primary'>Primary</Button>" />
    </div>
  );
};

// 5. Input Docs
const InputDocs = () => (
  <div className="flex flex-col gap-6">
    <LocalPageHeader title="Inputs & Textarea" description="Text fields supporting validation alerts and clean accessories." />
    
    <div className="p-8 border border-border/80 rounded-[28px] bg-secondary/15 flex flex-col gap-4 max-w-lg mx-auto w-full">
      <Input label="Workspace Name" placeholder="e.g. My Workspace" />
      <Input label="API Secret Token" error="This API key has expired." defaultValue="sk_proj_98s2" />
      <Textarea label="Milestone Description" placeholder="Describe critical deliverables..." />
    </div>

    <CodeBlock code="import { Input, Textarea } from '@dashmint/core';\n\n<Input label='Workspace' placeholder='Name' />" />
  </div>
);

// 6. Toggle Docs
const ToggleDocs = () => (
  <div className="flex flex-col gap-6">
    <LocalPageHeader title="Switch & Toggles" description="Custom toggles wrapping Radix UI Switch, Checkbox, and Radio." />
    
    <div className="p-8 border border-border/80 rounded-[28px] bg-secondary/15 flex flex-col gap-6 max-w-md mx-auto w-full">
      <Switch label="Enable Push Notifications" defaultChecked />
      <Checkbox label="Send automated warning logs" defaultChecked />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-muted-foreground/80">Allocation Strategy</span>
        <RadioGroup defaultValue="automated">
          <RadioGroupItem value="automated" label="Automated resource scaling" />
          <RadioGroupItem value="manual" label="Manual selection" />
        </RadioGroup>
      </div>
    </div>

    <CodeBlock code="import { Switch, Checkbox } from '@dashmint/core';\n\n<Switch label='Enable notifications' />" />
  </div>
);

// 7. Badge Docs
const BadgeDocs = () => (
  <div className="flex flex-col gap-6">
    <LocalPageHeader title="Badge & Avatar" description="Status labels and circular profile visuals." />
    
    <div className="p-8 border border-border/80 rounded-[28px] bg-secondary/15 flex flex-col gap-6 items-center justify-center">
      <div className="flex gap-2">
        <Badge variant="primary">Active</Badge>
        <Badge variant="success">Completed</Badge>
        <Badge variant="warning">On hold</Badge>
        <Badge variant="destructive">Failed</Badge>
      </div>
      <div className="flex gap-4">
        <Avatar shape="squircle" className="h-12 w-12">
          <AvatarFallback>MV</AvatarFallback>
        </Avatar>
        <Avatar shape="circle" className="h-12 w-12">
          <AvatarFallback>SL</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </div>
);

// 8. Overlay Docs
interface OverlayDocsProps {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (val: boolean) => void;
}
const OverlayDocs: React.FC<OverlayDocsProps> = ({
  isModalOpen,
  setIsModalOpen,
  isDrawerOpen,
  setIsDrawerOpen,
}) => (
  <div className="flex flex-col gap-6">
    <LocalPageHeader title="Modals & Overlays" description="Spring-animated Radix overlays for dialog sheets and slide drawers." />
    
    <div className="p-8 border border-border/80 rounded-[28px] bg-secondary/15 flex gap-4 items-center justify-center">
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>Open Modal Dialog</Button>
      <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>Open Drawer Sheet</Button>
    </div>

    {/* Modal Component */}
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
      <ModalHeader>
        <ModalTitle>Sync Project Nodes</ModalTitle>
        <ModalDescription>This coordinates active team progress timelines and links milestones.</ModalDescription>
      </ModalHeader>
      <div className="py-4">
        <Input label="Target Hostname" defaultValue="cluster-aws-02.dashmint.io" />
      </div>
      <ModalFooter>
        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        <Button variant="primary" onClick={() => setIsModalOpen(false)}>Sync Node</Button>
      </ModalFooter>
    </Modal>

    {/* Drawer Component */}
    <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} side="right" size="md">
      <DrawerHeader>
        <DrawerTitle>System Audit Logs</DrawerTitle>
        <DrawerDescription>Inspect background token limits and database commits.</DrawerDescription>
      </DrawerHeader>
      <div className="flex-1 flex flex-col gap-4 py-4 overflow-y-auto">
        <div className="p-3 border rounded-xl bg-secondary/15 font-mono text-[10px]">
          [10:02:15 AM] DB Query committed: updated_milestones (20ms)<br />
          [10:02:18 AM] Sparkles agent linked with token volume check
        </div>
      </div>
      <DrawerFooter>
        <Button variant="primary" className="w-full" onClick={() => setIsDrawerOpen(false)}>Close Inspector</Button>
      </DrawerFooter>
    </Drawer>
  </div>
);

// 9. Stat Docs
const StatDocs = () => {
  const stats = [
    { label: 'Conversion', value: '4.8%', change: '+0.5% today', isPositive: true },
    { label: 'Active Leads', value: '1,240', change: '+12% this week', isPositive: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      <LocalPageHeader title="Stat & Analytics Card" description="High visual KPI reporting containers and metric filters." />
      
      <Grid cols={2} gap="md">
        <StatCard
          title="Revenue Generated"
          value="$14,580"
          trend={{ value: 8.4, label: 'vs yesterday', isPositive: true }}
          sparklineData={[10, 11, 9, 12, 11, 14.58]}
        />
        <AnalyticsCard title="Lead Progression Summary" summaryMetrics={stats}>
          <div className="flex items-center justify-center h-full text-xs font-semibold text-muted-foreground">
            Chart Preview Placeholder
          </div>
        </AnalyticsCard>
      </Grid>
    </div>
  );
};

// 10. Task Docs
const TaskDocs = () => {
  const [tasks, setTasks] = React.useState([
    { id: '1', title: 'Prepare project presentation', completed: false, tags: [{ label: 'High', variant: 'destructive' as const }] },
  ]);

  const [columns, setColumns] = React.useState<KanbanColumn[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 't1', title: 'Rewrite database API hooks', dueDate: 'June 25', tags: [{ label: 'High', variant: 'destructive' as const }] },
        { id: 't2', title: 'Design billing page assets', dueDate: 'June 28', tags: [{ label: 'Design', variant: 'primary' as const }] },
      ],
    },
    {
      id: 'active',
      title: 'In Progress',
      tasks: [
        { id: 't3', title: 'Audit server security logs', dueDate: 'Today', tags: [{ label: 'Security', variant: 'warning' as const }] },
      ],
    },
  ]);

  const handleCardMove = (taskId: string, sourceColId: string, targetColId: string) => {
    setColumns((prev) => {
      const sourceCol = prev.find((c) => c.id === sourceColId);
      if (!sourceCol) return prev;
      const card = sourceCol.tasks.find((t) => t.id === taskId);
      if (!card) return prev;

      return prev.map((col) => {
        if (col.id === sourceColId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== taskId),
          };
        }
        if (col.id === targetColId) {
          return {
            ...col,
            tasks: [...col.tasks, card],
          };
        }
        return col;
      });
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <LocalPageHeader title="Task & Kanban Board" description="SaaS task trackers with column flows and priority tags." />
      <div className="flex flex-col gap-4">
        <TaskCard
          title={tasks[0].title}
          completed={tasks[0].completed}
          onCompletedChange={(val) => setTasks([{ ...tasks[0], completed: val }])}
          dueDate="June 24"
        />
        <div className="mt-4">
          <KanbanBoard columns={columns} onCardMove={handleCardMove} />
        </div>
      </div>
    </div>
  );
};

// 11. Schedule Docs
const ScheduleDocs = () => {
  const calendarEvents = [
    { date: new Date().toISOString().split('T')[0], title: 'Design Review', type: 'primary' as const },
  ];

  const timeSlots = [
    { time: '09:00 AM', isAvailable: true },
    { time: '11:00 AM', isAvailable: false, meeting: { title: 'Pricing Sync', organizer: 'Marcus Vance', initials: 'MV' } },
  ];

  return (
    <div className="flex flex-col gap-6">
      <LocalPageHeader title="Calendar & Scheduler" description="Interactive meeting slot selectors and date highlight markers." />
      <Grid cols={2} gap="md">
        <CalendarWidget events={calendarEvents} />
        <MeetingScheduler slots={timeSlots} />
      </Grid>
    </div>
  );
};

// 12. Timeline Docs
const TimelineDocs = () => {
  const timelineMilestones = [
    { id: '1', title: 'Platform kick-off', date: 'Jan 10', isCompleted: true },
    { id: '2', title: 'Beta deployment', date: 'May 12', isCompleted: true },
    { id: '3', title: 'Database optimization check', date: 'June 20', isCompleted: false },
  ];

  const activityItems = [
    { id: '1', title: 'James Carter updated pricing model', timestamp: '10 mins ago', user: { name: 'James Carter', initials: 'JC' } },
  ];

  return (
    <div className="flex flex-col gap-6">
      <LocalPageHeader title="Timeline & Activity Feed" description="Milestone indicators and team action lists." />
      <Grid cols={2} gap="md">
        <Timeline milestones={timelineMilestones} />
        <ActivityFeed items={activityItems} />
      </Grid>
    </div>
  );
};

// 13. AI Docs
const AIDocs = () => {
  const [prompt, setPrompt] = React.useState('');
  const [messages, setMessages] = React.useState<AIMessage[]>([
    { id: '1', role: 'assistant', content: 'Hello! Ask me to schedule calls or track startup milestones.', timestamp: 'Just now' },
  ]);

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { id: 'u', role: 'user', content: prompt, timestamp: 'Just now' }]);
    setPrompt('');
  };

  return (
    <div className="flex flex-col gap-6">
      <LocalPageHeader title="AI Chat Window" description="Interact with assistants using bubbles and prompt logs." />
      <div className="max-w-xl mx-auto w-full">
        <AIChatWindow
          messages={messages}
          value={prompt}
          onValueChange={setPrompt}
          onSubmit={handleSendPrompt}
        />
      </div>
    </div>
  );
};

// 14. Charts Docs
const ChartsDocs = () => {
  const chartData = [
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 240 },
    { label: 'Mar', value: 180 },
    { label: 'Apr', value: 320 },
  ];

  const comparativeData = [
    { label: 'Mon', actual: 42, target: 50 },
    { label: 'Tue', actual: 58, target: 50 },
  ];

  const pieData = [
    { label: 'Direct', value: 300, color: '#4F7061' },
    { label: 'Referral', value: 150, color: '#E0EADE' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <LocalPageHeader title="Interactive SVG Charts" description="Lightweight, animated responsive vector diagrams." />
      <Grid cols={2} gap="md">
        <div className="bg-background border p-6 rounded-[26px]">
          <h4 className="text-xs font-bold text-muted-foreground uppercase mb-4">Area Chart</h4>
          <AreaChart data={chartData} />
        </div>
        <div className="bg-background border p-6 rounded-[26px]">
          <h4 className="text-xs font-bold text-muted-foreground uppercase mb-4">Bar Chart</h4>
          <BarChart data={chartData} />
        </div>
        <div className="bg-background border p-6 rounded-[26px]">
          <h4 className="text-xs font-bold text-muted-foreground uppercase mb-4">Pie Chart</h4>
          <PieChart data={pieData} donut={true} />
        </div>
        <div className="bg-background border p-6 rounded-[26px]">
          <h4 className="text-xs font-bold text-muted-foreground uppercase mb-4">Comparative Growth Chart</h4>
          <GrowthChart data={comparativeData} />
        </div>
      </Grid>
    </div>
  );
};

// 13. Mobile App Template Docs
const MobileAppDocs = () => {
  const codeString = `import { MobileApp } from '@dashmint/templates';\n\n// Render this directly in your responsive viewport\n<MobileApp />`;

  return (
    <div className="flex flex-col gap-6">
      <LocalPageHeader
        title="Mobile App Dashboard"
        description="A premium, self-contained smartphone mockup template optimized for productivity, schedules, and analytics."
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mock phone preview */}
        <div className="lg:col-span-5 flex justify-center bg-secondary/15 border border-border/60 rounded-[32px] p-6">
          <MobileApp />
        </div>

        {/* Info & Code */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-background border p-6 rounded-[26px] flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground">Interactive Mock Features</h3>
            <ul className="text-xs font-semibold text-muted-foreground/90 space-y-2 list-disc list-inside">
              <li>Self-contained CSS smartphone frame with status bar and notch.</li>
              <li>Fully animated bottom tab transitions utilizing Framer Motion springs.</li>
              <li>Interactive AI assistant simulator with dynamic keyboard input replies.</li>
              <li>Responsive SVG vector charts and circular task completion widgets.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-muted-foreground/85 uppercase">Usage Example</span>
            <CodeBlock code={codeString} />
          </div>
        </div>
      </div>
    </div>
  );
};

