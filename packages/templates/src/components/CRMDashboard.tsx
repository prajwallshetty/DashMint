import * as React from 'react';
import {
  PageHeader,
  StatCard,
  AnalyticsCard,
  TeamMembersCard,
  Grid,
  Button,
} from '@dashmint/core';
import { PieChart } from '@dashmint/charts';
import { Users, TrendingUp, Award, UserPlus } from '@dashmint/icons';

export const CRMDashboard: React.FC = () => {
  const pieData = [
    { label: 'Organic Search', value: 420, color: '#4F7061' },
    { label: 'Social Media', value: 310, color: '#86A898' },
    { label: 'Referrals', value: 180, color: '#E0EADE' },
    { label: 'Paid Ads', value: 130, color: '#DDD8CD' },
  ];

  const members = [
    { id: '1', name: 'Sophia Loren', role: 'Account Executive', initials: 'SL', status: 'online' as const },
    { id: '2', name: 'James Carter', role: 'Sales Specialist', initials: 'JC', status: 'idle' as const },
    { id: '3', name: 'Anya Taylor', role: 'Lead Generation', initials: 'AT', status: 'online' as const },
    { id: '4', name: 'David Beckham', role: 'CRM Manager', initials: 'DB', status: 'offline' as const },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="CRM Portal"
        description="Inspect lead pipelines, sales conversions, and customer interactions."
        actions={
          <Button variant="outline" size="md" leftIcon={<UserPlus className="h-4 w-4" />}>
            Add Contact
          </Button>
        }
      />

      <Grid cols={3} gap="md">
        <StatCard
          title="Total Pipelines"
          value="4,820"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 14.2, label: 'vs last week', isPositive: true }}
          sparklineData={[3000, 3200, 3500, 4100, 4300, 4820]}
        />
        <StatCard
          title="Conversion Rate"
          value="3.85%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 0.65, label: 'vs last month', isPositive: true }}
          sparklineData={[3.2, 3.4, 3.3, 3.6, 3.5, 3.85]}
        />
        <StatCard
          title="Deals Won"
          value="$124,500"
          icon={<Award className="h-5 w-5" />}
          trend={{ value: 5.4, label: 'vs last week', isPositive: true }}
          sparklineData={[95000, 100000, 115000, 110000, 120000, 124500]}
        />
      </Grid>

      <Grid cols={12} gap="md">
        <div className="sm:col-span-6 lg:col-span-7 flex">
          <AnalyticsCard title="Leads by Source" subtitle="Organic search and referrals distribution." className="w-full">
            <div className="flex items-center justify-center h-full pt-4">
              <PieChart data={pieData} donut={true} height={180} />
            </div>
          </AnalyticsCard>
        </div>
        <div className="sm:col-span-6 lg:col-span-5 flex">
          <TeamMembersCard members={members} className="w-full" />
        </div>
      </Grid>
    </div>
  );
};
