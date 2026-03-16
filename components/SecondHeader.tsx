'use client';

import { ChevronDown, ChevronLeft, ChevronRight, Download, Users, Globe } from 'lucide-react';

export function SecondHeader() {
  return (
    <div className="h-[68px] bg-bg-secondary border-b border-border-divider flex items-center justify-between px-6">
      {/* Left Side - Page Title */}
      <div className="flex items-center gap-2">
        <h2 className="text-[20px] font-medium text-text-primary">Team dashboard</h2>
        <button className="p-1 hover:bg-bg-tertiary rounded transition-colors">
          <ChevronDown className="w-[16px] h-[16px] text-text-secondary" />
        </button>
      </div>

      {/* Right Side - Filters and Controls */}
      <div className="flex items-center gap-3">
        {/* Team Filter */}
        <button className="flex items-center gap-2 h-[36px] px-3 bg-bg-secondary border border-border-card rounded-[8px] hover:bg-bg-tertiary transition-colors">
          <Users className="w-[16px] h-[16px] text-text-secondary" />
          <span className="text-[12px] text-text-primary">All teams</span>
          <ChevronDown className="w-[14px] h-[14px] text-text-secondary" />
        </button>

        {/* Timezone */}
        <button className="flex items-center gap-2 h-[36px] px-3 bg-bg-secondary border border-border-card rounded-[8px] hover:bg-bg-tertiary transition-colors">
          <Globe className="w-[16px] h-[16px] text-text-secondary" />
          <span className="text-[12px] text-text-primary">UTC+4</span>
          <ChevronDown className="w-[14px] h-[14px] text-text-secondary" />
        </button>

        {/* Date Navigator */}
        <div className="flex items-center gap-2 h-[36px] px-3 bg-bg-secondary border border-border-card rounded-[8px]">
          <button className="p-1 hover:bg-bg-tertiary rounded transition-colors">
            <ChevronLeft className="w-[14px] h-[14px] text-text-secondary" />
          </button>
          <span className="text-[12px] font-medium text-text-primary px-2">Today</span>
          <button className="p-1 hover:bg-bg-tertiary rounded transition-colors">
            <ChevronRight className="w-[14px] h-[14px] text-text-secondary" />
          </button>
        </div>

        {/* Export Button */}
        <button className="flex items-center gap-2 h-[36px] px-3 bg-bg-secondary border border-border-card rounded-[8px] hover:bg-bg-tertiary transition-colors">
          <Download className="w-[16px] h-[16px] text-text-secondary" />
          <span className="text-[12px] text-text-primary">Export</span>
        </button>
      </div>
    </div>
  );
}
