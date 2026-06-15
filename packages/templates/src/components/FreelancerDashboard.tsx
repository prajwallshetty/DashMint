import * as React from 'react';
import {
  PageHeader,
  StatCard,
  CalendarWidget,
  MeetingScheduler,
  Grid,
  Button,
} from '@dashmint/core';
import { Clock, Briefcase, CreditCard } from '@dashmint/icons';

export const FreelancerDashboard: React.FC = () => {
  const calendarEvents = [
    { date: new Date().toISOString().split('T')[0], title: 'Design Review', type: 'primary' as const },
    { date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], title: 'Invoice Due', type: 'warning' as const },
  ];

  const timeSlots = [
    { time: '09:00 AM', isAvailable: true },
    { time: '11:00 AM', isAvailable: false, meeting: { title: 'Product Review', organizer: 'Anya Taylor', initials: 'AT' } },
    { time: '02:00 PM', isAvailable: true },
    { time: '04:00 PM', isAvailable: false, meeting: { title: 'Pricing Sync', organizer: 'Sophia Loren', initials: 'SL' } },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <PageHeader
        title="Freelancer Console"
        description="Plan billable hours, schedule syncs, and follow up client projects."
      />

      <Grid cols={3} gap="md">
        <StatCard
          title="Hours Tracked"
          value="32.5h"
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: 14.8, label: 'this week', isPositive: true }}
          sparklineData={[20, 24, 25, 28, 30, 32.5]}
        />
        <StatCard
          title="Active Projects"
          value="5 Contracts"
          icon={<Briefcase className="h-5 w-5" />}
          trend={{ value: 0.0, label: 'vs last week', isPositive: true }}
          sparklineData={[4, 5, 5, 5, 5, 5]}
        />
        <StatCard
          title="Pending Invoices"
          value="$8,450"
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: 8.2, label: 'vs yesterday', isPositive: false }}
          sparklineData={[9200, 9200, 8900, 8900, 8450]}
        />
      </Grid>

      <Grid cols={12} gap="md">
        <div className="sm:col-span-6 lg:col-span-6 flex">
          <CalendarWidget events={calendarEvents} className="w-full" />
        </div>
        <div className="sm:col-span-6 lg:col-span-6 flex">
          <MeetingScheduler slots={timeSlots} className="w-full" />
        </div>
      </Grid>
    </div>
  );
};
