'use client';

import { KPICard } from '@/components/KPICard';
import { AIAlertBanner } from '@/components/AIAlertBanner';
import { UserTable } from '@/components/UserTable';
import { PieCharts } from '@/components/PieCharts';
import { BarCharts } from '@/components/BarCharts';
import { SecondHeader } from '@/components/SecondHeader';

export default function DashboardPage() {
  return (
    <>
      <SecondHeader />
      <div className="p-6 max-w-[1435px] mx-auto">
        {/* KPI Cards - Row 1 */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <KPICard
            title="Total Worked Hours"
            value="37h 25m"
            icon="clock"
            color="#0C62F9"
          />
          <KPICard
            title="Average Hours/User"
            value="7h 29m"
            icon="pen"
            color="#22C55E"
          />
          <KPICard
            title="Idle Time"
            value="12h 25m"
            icon="moon"
            color="#F29937"
          />
        </div>

        {/* KPI Cards - Row 2 */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <KPICard
            title="User Count"
            value="5"
            icon="users"
            color="#7C3AED"
          />
          <KPICard
            title="Attendance Rate"
            value="100%"
            icon="calendar"
            color="#22C55E"
          />
          <KPICard
            title="Focus Time"
            value="65.8%"
            icon="target"
            color="#0C62F9"
          />
        </div>

        {/* AI Alert Banner */}
        <AIAlertBanner />

        {/* Summary Bar */}
        <div className="h-[59px] bg-bg-secondary border border-border-card rounded-[8px] px-6 flex items-center gap-6 mb-2 shadow-card">
          <span className="text-[12px] text-text-primary">
            <span className="font-medium">5</span> users shown
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success-green rounded-full" />
            <span className="text-[12px] text-text-primary">
              <span className="font-medium">2</span> Online
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-text-secondary rounded-full" />
            <span className="text-[12px] text-text-primary">
              <span className="font-medium">3</span> offline
            </span>
          </div>
          <span className="text-[12px] text-text-secondary ml-auto">
            <span className="font-medium">0m</span> manual total
          </span>
        </div>

        {/* User Table */}
        <div className="mb-2">
          <UserTable />
        </div>

        {/* Pie Charts */}
        <PieCharts />

        {/* Bar Charts */}
        <BarCharts />
      </div>
    </>
  );
}
