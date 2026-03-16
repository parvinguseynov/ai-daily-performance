'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Clock,
  FolderKanban,
  BarChart3,
  Users,
  Settings,
  FileText,
  ChevronDown,
  Moon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', iconColor: '#4074E7' },
  { icon: Clock, label: 'Time', href: '#', iconColor: '#6E56CF' },
  { icon: FolderKanban, label: 'Projects', href: '#', iconColor: '#0091FF' },
  { icon: BarChart3, label: 'Reporting', href: '#', iconColor: '#11A594' },
  { icon: Users, label: 'People', href: '#', iconColor: '#FFC53D' },
  { icon: Settings, label: 'Settings', href: '/settings', iconColor: '#F76809' },
  { icon: FileText, label: 'Logs', href: '#', iconColor: '#E93D81' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  return (
    <aside className="w-[280px] bg-bg-secondary flex flex-col border-r border-border-card">
      {/* Logo */}
      <div className="h-[60px] flex items-center px-5 border-b border-border-divider">
        <h1 className="text-[20px] font-medium text-text-primary">StaffCo</h1>
      </div>

      {/* Company Switcher */}
      <div className="px-5 py-4 border-b border-border-divider">
        <p className="text-[12px] font-medium text-text-secondary uppercase tracking-wider mb-2">
          YOU'RE WORKING IN
        </p>
        <button className="w-full flex items-center justify-between p-2 bg-[#F7F9F9] border border-border-divider rounded-[8px] hover:bg-bg-tertiary transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-blue rounded flex items-center justify-center">
              <span className="text-text-white text-[12px] font-medium">S</span>
            </div>
            <div className="text-left">
              <p className="text-[12px] font-medium text-text-primary">StaffCo</p>
              <p className="text-[10px] text-text-secondary">Tap to switch company</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-text-secondary" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex items-center gap-2 w-[240px] h-[36px] px-2 rounded-[8px] transition-all
                ${isActive
                  ? 'bg-bg-tertiary text-text-primary'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                }
              `}
            >
              <div
                className="w-5 h-5 rounded-[6px] flex items-center justify-center border shadow-icon-square"
                style={{
                  backgroundColor: item.iconColor,
                  borderColor: 'rgba(45, 52, 57, 0.04)'
                }}
              >
                <Icon className="w-[14px] h-[14px] text-white" strokeWidth={2} />
              </div>
              <span className="text-[14px] font-normal">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Light/Dark Mode Toggle */}
      <div className="px-5 py-4 border-t border-border-divider">
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-full flex items-center justify-center gap-3 p-2 bg-bg-tertiary rounded-[10px] hover:bg-[#E8EAEB] transition-colors"
        >
          {isDark ? (
            <>
              <Moon className="w-[18px] h-[18px] text-text-secondary" />
              <span className="text-[14px] text-text-secondary">Dark mode</span>
            </>
          ) : (
            <>
              <Sun className="w-[18px] h-[18px] text-text-secondary" />
              <span className="text-[14px] text-text-secondary">Light mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
