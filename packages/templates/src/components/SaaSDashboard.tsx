import * as React from 'react';
import {
  PageHeader,
  StatCard,
  AnalyticsCard,
  ActivityFeed,
  TaskCard,
  Grid,
  Button,
} from '@dashmint/core';
import { RevenueChart } from '@dashmint/charts';
import { DollarSign, Users, CheckSquare, Plus, ArrowUpRight } from '@dashmint/icons';

export const SaaSDashboard: React.FC = () => {
  const [tasks, setTasks] = React.useState([
    { id: '1', title: 'Prepare board meeting slides', description: 'Review quarterly SaaS progress and growth metrics.', dueDate: 'Today', completed: false, tags: [{ label: 'High', variant: 'destructive' as const }] },
    { id: '2', title: 'Review pipeline analytics', description: 'Inspect CRM opportunities and lead conversion rates.', dueDate: 'Tomorrow', completed: true, tags: [{ label: 'Medium', variant: 'warning' as const }] },
    { id: '3', title: 'Finalize server migration plan', description: 'Prepare checklist for database upgrade details.', dueDate: 'June 20', completed: false, tags: [{ label: 'Tech', variant: 'primary' as const }] },
  ]);

  const handleTaskComplete = (id: string, val: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: val } : t)));
  };

  const activityItems = [
    { id: '1', title: 'Lara Croft invited 3 new teammates', timestamp: '5 mins ago', user: { name: 'Lara Croft', initials: 'LC' } },
    { id: '2', title: 'Server upgrade completed successfully', timestamp: '2 hours ago', icon: <ArrowUpRight className="h-4.5 w-4.5 text-green-500" /> },
    { id: '3', title: 'Marcus Vance completed Task: Audit Logs integration', timestamp: '5 hours ago', user: { name: 'Marcus Vance', initials: 'MV' } },
  ];

  const chartData = [
    { label: 'Jan', value: 12000 },
    { label: 'Feb', value: 19000 },
    { label: 'Mar', value: 15000 },
    { label: 'Apr', value: 24000 },
    { label: 'May', value: 22000 },
    { label: 'Jun', value: 34000 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Title */}
      <PageHeader
        title="Dashboard"
        description="Welcome back, admin. Here is your SaaS workspace overview."
        actions={
          <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>
            New Action
          </Button>
        }
      />

      {/* Quick Statistics Stats Card */}
      <Grid cols={3} gap="md">
        <StatCard
          title="Monthly Recurring Revenue"
          value="$34,200"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 12.5, label: 'vs last month', isPositive: true }}
          sparklineData={[12, 14, 13, 16, 15, 19, 21]}
        />
        <StatCard
          title="Active Subscribers"
          value="1,420"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 8.3, label: 'vs last week', isPositive: true }}
          sparklineData={[1100, 1150, 1200, 1180, 1250, 1310, 1420]}
        />
        <StatCard
          title="Tasks Completed"
          value="42/60"
          icon={<CheckSquare className="h-5 w-5" />}
          trend={{ value: 4.2, label: 'vs yesterday', isPositive: false }}
          sparklineData={[30, 32, 35, 33, 38, 40, 42]}
        />
      </Grid>

      {/* Main Analytics Block */}
      <Grid cols={12} gap="md">
        <div className="sm:col-span-8 lg:col-span-8 flex">
          <AnalyticsCard title="MRR Progression" subtitle="Total sales volume and growth trends.">
            <RevenueChart data={chartData} totalRevenue="$34,200" changeRate="14.8%" />
          </AnalyticsCard>
        </div>
        <div className="sm:col-span-4 lg:col-span-4 flex flex-col gap-6">
          <ActivityFeed items={activityItems} className="flex-1" />
        </div>
      </Grid>

      {/* Tasks Block */}
      <div className="flex flex-col gap-4.5">
        <h3 className="text-base font-bold text-foreground px-1">Your Team Tasks</h3>
        <Grid cols={3} gap="md">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              tags={task.tags}
              completed={task.completed}
              onCompletedChange={(val) => handleTaskComplete(task.id, val)}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};
