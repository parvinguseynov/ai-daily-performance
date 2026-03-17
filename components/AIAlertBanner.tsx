'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingDown, Flame, TrendingUp, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

type DemoState = 'all-alerts' | 'warnings-only' | 'clean-day' | 'history';

interface UserDetail {
  initials: string;
  name: string;
  color: string;
  metric: string;
  avg7day: string;
  avg30day: string;
}

interface HistoryRow {
  date: string;
  isToday?: boolean;
  active: string;
  totalHours: string;
  productive: string;
  concerns: number;
  warnings: number;
  highlights: number;
}

const concernsData: UserDetail[] = [
  { initials: 'PC', name: 'Princess Coronel', color: '#F29937', metric: '52% idle today', avg7day: '15%', avg30day: '18%' },
  { initials: 'RM', name: 'Ramiz Murshudov', color: '#22C55E', metric: '48% idle today', avg7day: '12%', avg30day: '14%' },
  { initials: 'SG', name: 'Saba Gogiberidze', color: '#7C3AED', metric: '44% idle today', avg7day: '18%', avg30day: '20%' },
  { initials: 'NA', name: 'Nurlana Ahmadova', color: '#0C62F9', metric: '8% focus today', avg7day: '65%', avg30day: '60%' },
];

const warningsData: UserDetail[] = [
  { initials: 'RH', name: 'Rinat Hajiyev', color: '#F86060', metric: '11h 4m worked, 8% idle', avg7day: '8h 45m', avg30day: '8h 30m' },
];

const highlightsData: UserDetail[] = [
  { initials: 'EA', name: 'Eyyub Alakbarov', color: '#10B981', metric: '100% focus, 81.6% productive, 9h 58m worked', avg7day: '', avg30day: '' },
  { initials: 'MF', name: 'Mirveli Fayazzade', color: '#8B5CF6', metric: '1.4% idle, 44% productive, 8h 58m worked', avg7day: '', avg30day: '' },
];

const historyData: HistoryRow[] = [
  { date: 'Mar 1 (Today)', isToday: true, active: '5 active', totalHours: '37h total', productive: '58% productive', concerns: 4, warnings: 1, highlights: 2 },
  { date: 'Feb 28', active: '5 active', totalHours: '35h total', productive: '62% productive', concerns: 2, warnings: 0, highlights: 3 },
  { date: 'Feb 27', active: '4 active', totalHours: '28h total', productive: '55% productive', concerns: 3, warnings: 1, highlights: 1 },
  { date: 'Feb 26', active: '5 active', totalHours: '39h total', productive: '64% productive', concerns: 1, warnings: 0, highlights: 4 },
  { date: 'Feb 25', active: '5 active', totalHours: '36h total', productive: '60% productive', concerns: 2, warnings: 0, highlights: 2 },
  { date: 'Feb 24', active: '3 active', totalHours: '22h total', productive: '48% productive', concerns: 5, warnings: 2, highlights: 0 },
  { date: 'Feb 23', active: '5 active', totalHours: '34h total', productive: '57% productive', concerns: 2, warnings: 1, highlights: 1 },
];

export function AIAlertBanner() {
  const [demoState, setDemoState] = useState<DemoState>('all-alerts');
  const [expandedConcerns, setExpandedConcerns] = useState(false);
  const [expandedWarnings, setExpandedWarnings] = useState(false);
  const [expandedHighlights, setExpandedHighlights] = useState(false);

  const showConcerns = demoState === 'all-alerts';
  const showWarnings = demoState === 'all-alerts' || demoState === 'warnings-only';
  const showHighlights = demoState === 'all-alerts';
  const showBlue = demoState !== 'history';
  const showHistory = demoState === 'history';

  return (
    <div className="mb-6">
      {/* Demo State Switcher */}
      <div className="flex items-center gap-2 mb-4">
        <div className="inline-flex bg-bg-secondary border border-border-card rounded-[8px] p-0.5">
          <button
            onClick={() => setDemoState('all-alerts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-200 ${
              demoState === 'all-alerts'
                ? 'bg-ai-gradient text-text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            ⚡ All Alerts
          </button>
          <button
            onClick={() => setDemoState('warnings-only')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-200 ${
              demoState === 'warnings-only'
                ? 'bg-ai-gradient text-text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            ⚠️ Warnings Only
          </button>
          <button
            onClick={() => setDemoState('clean-day')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-200 ${
              demoState === 'clean-day'
                ? 'bg-ai-gradient text-text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            ✅ Clean Day
          </button>
          <button
            onClick={() => setDemoState('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-[6px] transition-all duration-200 ${
              demoState === 'history'
                ? 'bg-ai-gradient text-text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            📊 History
          </button>
        </div>
      </div>

      {/* History View */}
      {showHistory && (
        <div className="bg-white border border-border-card rounded-[12px] overflow-hidden shadow-card">
          <div className="px-6 py-4 border-b border-border-divider">
            <h3 className="text-[16px] font-semibold text-text-primary">Alert History — Last 7 Days</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="h-[44px] bg-bg-secondary border-b border-border-divider">
                  <th className="px-6 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">Date</th>
                  <th className="px-6 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">Summary</th>
                  <th className="px-6 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">Concerns</th>
                  <th className="px-6 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">Warnings</th>
                  <th className="px-6 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">Highlights</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((row, index) => (
                  <tr
                    key={index}
                    className={`h-[56px] border-b border-border-divider last:border-0 hover:bg-bg-tertiary transition-colors cursor-pointer ${
                      row.isToday ? 'border-l-[3px] border-l-primary-blue' : ''
                    }`}
                  >
                    <td className="px-6 text-[14px] font-medium text-text-primary">{row.date}</td>
                    <td className="px-6 text-[13px] text-text-secondary">
                      {row.active}, {row.totalHours}, {row.productive}
                    </td>
                    <td className="px-6">
                      {row.concerns > 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FEF2F2] text-[#F86060]">
                          {row.concerns} users flagged
                        </span>
                      ) : (
                        <span className="text-[12px] text-text-secondary">None</span>
                      )}
                    </td>
                    <td className="px-6">
                      {row.warnings > 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#FFF9F2] text-[#F29937]">
                          {row.warnings} burnout risk{row.warnings > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[12px] text-text-secondary">None</span>
                      )}
                    </td>
                    <td className="px-6">
                      {row.highlights > 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F0FDF4] text-[#22C55E]">
                          {row.highlights} strong performer{row.highlights > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[12px] text-text-secondary">None</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stacked Cards View */}
      {!showHistory && (
        <div className="space-y-3">
          {/* 🔴 RED CARD - Concerns */}
          {showConcerns && (
            <div className="bg-[#FEF2F2] border-l-[3px] border-l-[#F86060] rounded-[12px] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} className="text-[#F86060]" />
                  <h3 className="text-[14px] font-bold text-text-primary">Performance Concerns</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F86060] text-white">
                    {concernsData.length} users
                  </span>
                </div>
                <button
                  onClick={() => setExpandedConcerns(!expandedConcerns)}
                  className="text-[12px] font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                >
                  {expandedConcerns ? 'Hide details' : 'Show details'}
                  {expandedConcerns ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <p className="text-[13px] text-text-secondary mb-2">
                {concernsData.length} users showed concerning patterns today. 3 users had idle time above 50%, significantly above their personal 7-day averages. 1 user's focus time dropped to 8%.
              </p>

              {expandedConcerns && (
                <div className="mt-4 space-y-2 pt-3 border-t border-[#FDE68A]">
                  {concernsData.map((user, index) => (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.initials}
                      </div>
                      <div className="flex-1">
                        <span className="text-[13px] font-medium text-text-primary hover:text-primary-blue cursor-pointer">
                          {user.name}
                        </span>
                        <span className="text-[13px] text-text-secondary"> — {user.metric}</span>
                        {user.avg7day && (
                          <span className="text-[12px] text-text-secondary">
                            {' '}(7-day avg: {user.avg7day}, 30-day avg: {user.avg30day})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 🟠 ORANGE CARD - Warnings */}
          {showWarnings && (
            <div className="bg-[#FFF9F2] border-l-[3px] border-l-[#F29937] rounded-[12px] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Flame size={18} className="text-[#F29937]" />
                  <h3 className="text-[14px] font-bold text-text-primary">Burnout & Overtime Warnings</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F29937] text-white">
                    {warningsData.length} user
                  </span>
                </div>
                <button
                  onClick={() => setExpandedWarnings(!expandedWarnings)}
                  className="text-[12px] font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                >
                  {expandedWarnings ? 'Hide details' : 'Show details'}
                  {expandedWarnings ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <p className="text-[13px] text-text-secondary mb-2">
                1 user may be at risk of burnout. Rinat Hajiyev worked 11h 4m with only 8% idle — this is 130% above their 30-day average of 8h 30m.
              </p>

              {expandedWarnings && (
                <div className="mt-4 space-y-2 pt-3 border-t border-[#FDE68A]">
                  {warningsData.map((user, index) => (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.initials}
                      </div>
                      <div className="flex-1">
                        <span className="text-[13px] font-medium text-text-primary hover:text-primary-blue cursor-pointer">
                          {user.name}
                        </span>
                        <span className="text-[13px] text-text-secondary">
                          {' '}— {user.metric} (30-day avg: {user.avg30day}, today is 130% of avg)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 🟢 GREEN CARD - Positive Highlights */}
          {showHighlights && (
            <div className="bg-[#F0FDF4] border-l-[3px] border-l-[#22C55E] rounded-[12px] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <TrendingUp size={18} className="text-[#22C55E]" />
                  <h3 className="text-[14px] font-bold text-text-primary">Positive Highlights</h3>
                </div>
                <button
                  onClick={() => setExpandedHighlights(!expandedHighlights)}
                  className="text-[12px] font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                >
                  {expandedHighlights ? 'Hide details' : 'Show details'}
                  {expandedHighlights ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <p className="text-[13px] text-text-secondary mb-2">
                2 users had an outstanding day. Eyyub Alakbarov maintained 100% focus with 81% productivity. Mirveli Fayazzade had minimal idle time at just 1.4%.
              </p>

              {expandedHighlights && (
                <div className="mt-4 space-y-2 pt-3 border-t border-[#BAE6FD]">
                  {highlightsData.map((user, index) => (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-medium flex-shrink-0"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.initials}
                      </div>
                      <div className="flex-1">
                        <span className="text-[13px] font-medium text-text-primary hover:text-primary-blue cursor-pointer">
                          {user.name}
                        </span>
                        <span className="text-[13px] text-text-secondary"> — {user.metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 🔵 BLUE CARD - General Summary (ALWAYS VISIBLE) */}
          {showBlue && (
            <div className="bg-[#F2F9FF] border-l-[3px] border-l-primary-blue rounded-[12px] p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <BarChart3 size={18} className="text-primary-blue mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[14px] text-text-primary leading-relaxed">
                    Today: <span className="font-semibold">5 of 5 users active</span> · <span className="font-semibold">37h 25m</span> total · avg <span className="font-semibold">7h 29m</span> per person <span className="text-text-secondary">(team 30-day avg: 7h 12m)</span> · <span className="font-semibold">58%</span> productive · <span className="text-text-secondary">next alert tomorrow at 5:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
