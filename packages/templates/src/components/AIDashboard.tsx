import * as React from 'react';
import {
  PageHeader,
  StatCard,
  AnalyticsCard,
  AIChatWindow,
  AIMessage,
  Grid,
  Button,
} from '@prajwalshetty/core';
import { GrowthChart } from '@prajwalshetty/charts';
import { Cpu, CpuIcon, Sparkles } from '@prajwalshetty/icons';

export const AIDashboard: React.FC = () => {
  const [prompt, setPrompt] = React.useState('');
  const [messages, setMessages] = React.useState<AIMessage[]>([
    { id: '1', role: 'assistant', content: "Hello! I am DashMint AI, your automated workflow assistant. What task can I help you coordinate today?", timestamp: '10:02 AM' },
    { id: '2', role: 'user', content: 'Outline my team meetings for this Friday.', timestamp: '10:03 AM' },
    { id: '3', role: 'assistant', content: "You have 3 meetings scheduled for this Friday:\n1. 09:00 AM - Sprint Planning with James (30m)\n2. 11:30 AM - Marketing Sync with Sophia (1h)\n3. 03:00 PM - CRM Integration audit with Anya (45m)\nAll slots have been synced to your Calendar Widget.", timestamp: '10:03 AM' },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;

    const userMsg: AIMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: prompt,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    setTimeout(() => {
      const responseMsg: AIMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: `I've analyzed your request: "${userMsg.content}". I've queued a background sync to allocate your resources accordingly. Let me know if you need anything else!`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, responseMsg]);
      setIsLoading(false);
    }, 1200);
  };

  const suggestions = [
    'Check my free slots today',
    'Summarize sprint roadmap',
    'Email team warning alerts',
  ];

  const comparativeData = [
    { label: 'Mon', actual: 40, target: 50 },
    { label: 'Tue', actual: 55, target: 50 },
    { label: 'Wed', actual: 68, target: 50 },
    { label: 'Thu', actual: 48, target: 50 },
    { label: 'Fri', actual: 72, target: 50 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="AI Assistant Workspace"
        description="Interact with DashMint AI and monitor background token processing."
      />

      <Grid cols={12} gap="md">
        {/* Left Column: Chat Console */}
        <div className="sm:col-span-7 lg:col-span-8 flex">
          <AIChatWindow
            messages={messages}
            value={prompt}
            onValueChange={setPrompt}
            onSubmit={handleSendPrompt}
            isLoading={isLoading}
            suggestions={suggestions}
            onSuggestionClick={(s) => setPrompt(s)}
            className="w-full flex-1"
          />
        </div>

        {/* Right Column: AI Analytics */}
        <div className="sm:col-span-5 lg:col-span-4 flex flex-col gap-6">
          <StatCard
            title="AI Compute Power"
            value="98.4 GigaFLOPS"
            icon={<Cpu className="h-5 w-5" />}
            trend={{ value: 2.1, label: 'vs last hour', isPositive: true }}
            sparklineData={[92, 94, 91, 95, 96, 98.4]}
          />
          <AnalyticsCard title="Model Output Tokens" subtitle="Actual tokens vs targeted efficiency." className="flex-1">
            <div className="pt-2">
              <GrowthChart data={comparativeData} height={200} />
            </div>
          </AnalyticsCard>
        </div>
      </Grid>
    </div>
  );
};
