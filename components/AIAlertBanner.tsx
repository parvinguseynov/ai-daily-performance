'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, X, Settings, Zap, CheckCircle, Clock, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';
import { Tooltip } from './Tooltip';

type DemoState = 'alerts' | 'clear' | 'pending';

interface AlertUser {
  initials: string;
  name: string;
  metric: string;
  usual: string;
  color: string;
}

interface AlertSection {
  id: string;
  title: string;
  count: number;
  severity: 'high' | 'medium';
  users: AlertUser[];
  defaultOpen: boolean;
  tooltip: string; // Tooltip description for the section
}

const alertData: AlertSection[] = [
  {
    id: 'high-idle',
    title: 'HIGH IDLE',
    count: 3,
    severity: 'high',
    defaultOpen: true,
    tooltip: 'Idle time significantly above personal average',
    users: [
      { initials: 'PC', name: 'Princess Coronel', metric: '52% idle', usual: '15%', color: '#F29937' },
      { initials: 'RM', name: 'Ramiz Murshudov', metric: '48% idle', usual: '12%', color: '#22C55E' },
      { initials: 'SG', name: 'Saba Gogiberidze', metric: '44% idle', usual: '18%', color: '#7C3AED' },
    ],
  },
  {
    id: 'low-focus',
    title: 'LOW FOCUS',
    count: 1,
    severity: 'high',
    defaultOpen: false,
    tooltip: 'Focus time critically low today',
    users: [
      { initials: 'NA', name: 'Nurlana Ahmadova', metric: '8% focus today', usual: '', color: '#0C62F9' },
    ],
  },
  {
    id: 'burnout-risk',
    title: 'BURNOUT RISK',
    count: 1,
    severity: 'medium',
    defaultOpen: false,
    tooltip: 'Excessive hours with minimal breaks',
    users: [
      { initials: 'RH', name: 'Rinat Hajiyev', metric: '11h 4m worked, 8% idle', usual: '', color: '#F86060' },
    ],
  },
  {
    id: 'late-start',
    title: 'LATE START',
    count: 2,
    severity: 'medium',
    defaultOpen: false,
    tooltip: 'First activity later than expected',
    users: [
      { initials: 'EM', name: 'Elshad Muradov', metric: 'started 12:30 PM', usual: '9:00 AM', color: '#0C62F9' },
      { initials: 'FI', name: 'Fidan Ismayilova', metric: 'started 1:00 PM', usual: '9:00 AM', color: '#F86060' },
    ],
  },
];

export function AIAlertBanner() {
  const [demoState, setDemoState] = useState<DemoState>('alerts');
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(alertData.filter(s => s.defaultOpen).map(s => s.id))
  );

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalIssues = alertData.reduce((sum, section) => sum + section.count, 0);

  return (
    <div className="mb-6">
      {/* Demo State Switcher */}
      <div className="flex items-center gap-2 mb-3">
        <div className="inline-flex bg-bg-secondary border border-border-card rounded-[8px] p-0.5">
          <button
            onClick={() => setDemoState('alerts')}
            className={`px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-200 ${
              demoState === 'alerts'
                ? 'bg-ai-gradient text-text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            ⚡ Alerts
          </button>
          <button
            onClick={() => setDemoState('clear')}
            className={`px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-200 ${
              demoState === 'clear'
                ? 'bg-ai-gradient text-text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            ✅ Clear
          </button>
          <button
            onClick={() => setDemoState('pending')}
            className={`px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-200 ${
              demoState === 'pending'
                ? 'bg-ai-gradient text-text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            ⏳ Pending
          </button>
        </div>
      </div>

      {/* Clear State */}
      {demoState === 'clear' && (
        <div className="bg-bg-mint border border-success-green rounded-[8px] p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-success-green/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-success-green" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-text-primary">
              No anomalies detected. Team performance is within normal range.
            </p>
          </div>
        </div>
      )}

      {/* Pending State */}
      {demoState === 'pending' && (
        <div className="bg-bg-tertiary border border-border-card rounded-[8px] p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-bg-secondary rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-text-secondary" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-text-primary">
              First alert will be generated today at 5:00 PM. Requires 7 days of data.
            </p>
          </div>
        </div>
      )}

      {/* Alerts State */}
      {demoState === 'alerts' && (
        <div className="bg-bg-linen border border-warning-amber rounded-[8px] overflow-hidden shadow-card">
          {/* Collapsed Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full min-h-[44px] px-4 py-2 flex items-center gap-3 hover:bg-bg-linen/80 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-ai-gradient rounded-full flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-text-white" fill="currentColor" />
            </div>

            <div className="flex-1 flex items-center gap-2 text-left flex-wrap">
              <span className="text-[14px] font-medium text-text-primary">
                {totalIssues} performance issues detected
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full" style={{ backgroundColor: 'rgba(248, 96, 96, 0.1)', color: '#F86060' }}>
                  {alertData[0].count} high idle
                </span>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full" style={{ backgroundColor: 'rgba(248, 96, 96, 0.1)', color: '#F86060' }}>
                  {alertData[1].count} low focus
                </span>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full" style={{ backgroundColor: 'rgba(255, 197, 61, 0.1)', color: '#F29937' }}>
                  {alertData[2].count} burnout risk
                </span>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full" style={{ backgroundColor: 'rgba(255, 197, 61, 0.1)', color: '#F29937' }}>
                  {alertData[3].count} late start
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-normal text-text-secondary">Today, 5:00 PM</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-text-secondary" />
              ) : (
                <ChevronDown className="w-4 h-4 text-text-secondary" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-1 hover:bg-warning-amber/30 rounded transition-colors duration-200"
              >
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </button>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="border-t border-warning-amber/30 bg-bg-secondary">
              {alertData.map((section) => {
                const isOpen = openSections.has(section.id);
                const severityIcon = section.severity === 'high' ? '🔴' : '🟡';

                return (
                  <div key={section.id} className="border-b border-border-divider last:border-0">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-5 py-3 flex items-center gap-3 hover:bg-bg-tertiary transition-all duration-200"
                    >
                      <span className="text-[12px]">{severityIcon}</span>
                      <span className="text-[12px] font-medium text-text-primary tracking-wide">
                        {section.title} — {section.count}
                      </span>
                      <Tooltip content={section.tooltip}>
                        <Info className="w-3.5 h-3.5 text-text-secondary cursor-help" />
                      </Tooltip>
                      <ChevronDown
                        className={`w-4 h-4 text-text-secondary ml-auto transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="bg-bg-secondary animate-accordion">
                        {section.users.map((user, idx) => (
                          <div
                            key={idx}
                            className="px-5 py-3 flex items-center gap-3 hover:bg-bg-tertiary transition-colors duration-200 border-t border-border-divider"
                          >
                            <div
                              className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-text-white text-[12px] font-medium"
                              style={{ backgroundColor: user.color }}
                            >
                              {user.initials}
                            </div>
                            <div className="flex-1">
                              <span className="text-[12px] font-medium text-text-primary hover:text-primary-blue cursor-pointer">
                                {user.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className="text-[12px] font-medium"
                                style={{ color: section.severity === 'high' ? '#F86060' : '#F29937' }}
                              >
                                {user.metric}
                              </span>
                              {user.usual && (
                                <span className="text-[12px] text-text-secondary">
                                  {section.id === 'late-start' ? 'expected by:' : 'usual:'} {user.usual}
                                </span>
                              )}
                              <ArrowRight className="w-4 h-4 text-text-secondary" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Footer */}
              <div className="px-5 py-3 bg-bg-tertiary border-t border-border-divider">
                <Link
                  href="/settings"
                  className="inline-flex items-center gap-2 text-[12px] font-medium text-primary-blue hover:text-[#0A56E0] transition-colors duration-200"
                >
                  <Settings className="w-4 h-4" />
                  Alert Settings
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
