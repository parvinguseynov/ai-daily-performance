'use client';

import { Bell, Plus, Search } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-[60px] bg-bg-secondary border-b border-border-divider flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="relative w-[320px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-text-secondary" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-[36px] pl-10 pr-4 bg-bg-secondary border border-border-card rounded-[8px] text-[12px] text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary-blue transition-colors"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Invite Button */}
        <button className="flex items-center gap-2 px-4 h-[36px] bg-primary-blue hover:bg-[#0A56E0] text-text-white rounded-[8px] transition-colors text-[12px] font-medium">
          <Plus className="w-[16px] h-[16px]" />
          Invite
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-bg-tertiary rounded-[8px] transition-colors">
          <Bell className="w-[18px] h-[18px] text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-red rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border-divider">
          <div className="w-[32px] h-[32px] bg-primary-blue rounded-full flex items-center justify-center text-text-white text-[12px] font-medium">
            PH
          </div>
          <div>
            <div className="text-[12px] font-medium text-text-primary">Parvin Huseynov</div>
            <div className="text-[10px] text-text-secondary">Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
}
