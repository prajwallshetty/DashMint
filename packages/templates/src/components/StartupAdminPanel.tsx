import * as React from 'react';
import {
  PageHeader,
  StatCard,
  ProjectOverview,
  Grid,
} from '@prajwalshetty/core';
import { AreaChart } from '@prajwalshetty/charts';
import { Activity, ShieldAlert, Cpu } from '@prajwalshetty/icons';

export const StartupAdminPanel: React.FC = () => {
  const members = [
    { name: 'Marcus Vance', initials: 'MV' },
    { name: 'James Carter', initials: 'JC' },
    { name: 'Anya Taylor', initials: 'AT' },
  ];

  const requestStats = [
    { label: '00:00', value: 820 },
    { label: '04:00', value: 400 },
    { label: '08:00', value: 1200 },
    { label: '12:00', value: 1900 },
    { label: '16:00', value: 1500 },
    { label: '20:00', value: 2400 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Admin Control Center"
        description="Monitor system nodes, startup objectives, and server resources."
      />

      <Grid cols={3} gap="md">
        <StatCard
          title="CPU Usage"
          value="42.5%"
          icon={<Cpu className="h-5 w-5" />}
          trend={{ value: 3.2, label: 'vs last hour', isPositive: false }}
          sparklineData={[35, 38, 41, 39, 44, 42.5]}
        />
        <StatCard
          title="API Requests / min"
          value="2,400 rq"
          icon={<Activity className="h-5 w-5" />}
          trend={{ value: 18.5, label: 'vs last 10m', isPositive: true }}
          sparklineData={[1500, 1700, 1850, 2000, 2100, 2400]}
        />
        <StatCard
          title="Active System Alerts"
          value="0 Warnings"
          icon={<ShieldAlert className="h-5 w-5" />}
          trend={{ value: 100, label: 'clear', isPositive: true }}
          sparklineData={[2, 1, 1, 0, 0, 0]}
        />
      </Grid>

      <Grid cols={12} gap="md">
        {/* Project roadmap overview */}
        <div className="sm:col-span-6 lg:col-span-5 flex">
          <ProjectOverview
            name="v1.2 Platform Scale"
            description="Upgrade backend database adapters, deploy cluster scaling, rewrite hooks."
            progress={75}
            tasksCount={{ completed: 15, total: 20 }}
            dueDate="June 30"
            members={members}
            status="active"
            className="w-full"
          />
        </div>

        {/* Server requests volume */}
        <div className="sm:col-span-6 lg:col-span-7 flex flex-col bg-background/60 border border-border/80 p-6 rounded-[26px] shadow-soft-sm backdrop-blur-sm select-none">
          <h3 className="text-sm font-bold text-foreground mb-4">API Hit Rate Distribution</h3>
          <div className="flex-1 min-h-[180px] pt-4">
            <AreaChart data={requestStats} height={180} />
          </div>
        </div>
      </Grid>
    </div>
  );
};
