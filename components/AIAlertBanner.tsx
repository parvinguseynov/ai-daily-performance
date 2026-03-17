'use client';

import { useState } from 'react';
import { AlertTriangle, TrendingDown, Flame, TrendingUp, BarChart3, ChevronDown, ChevronUp, Zap, CheckCircle, History, Download, Eye, Mail, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type DemoState = 'all-alerts' | 'warnings-only' | 'clean-day' | 'history';

interface UserDetail {
  initials: string;
  name: string;
  color: string;
  metric: string;
  avg7day?: string;
  avg30day?: string;
}

interface DayData {
  concerns: UserDetail[];
  warnings: UserDetail[];
  highlights: UserDetail[];
  summary: string;
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
  status: 'viewed' | 'sent' | 'emailed';
}

// Data for each day in the history
const dayDataMap: { [key: number]: DayData } = {
  0: { // Mar 1 (Today)
    concerns: [
      { initials: 'PC', name: 'Princess Coronel', color: '#F29937', metric: '52% idle', avg7day: '15%', avg30day: '18%' },
      { initials: 'RM', name: 'Ramiz Murshudov', color: '#22C55E', metric: '48% idle', avg7day: '12%', avg30day: '14%' },
      { initials: 'SG', name: 'Saba Gogiberidze', color: '#7C3AED', metric: '44% idle', avg7day: '18%', avg30day: '20%' },
      { initials: 'NA', name: 'Nurlana Ahmadova', color: '#0C62F9', metric: '8% focus', avg7day: '65%', avg30day: '60%' },
    ],
    warnings: [
      { initials: 'RH', name: 'Rinat Hajiyev', color: '#F86060', metric: '11h 4m worked', avg7day: '8% idle', avg30day: '130% of 30d avg 8h 30m' },
    ],
    highlights: [
      { initials: 'EA', name: 'Eyyub Alakbarov', color: '#10B981', metric: '100% focus, 81.6% productive' },
      { initials: 'MF', name: 'Mirveli Fayazzade', color: '#8B5CF6', metric: '1.4% idle, 44% productive' },
    ],
    summary: '5 of 5 active · 37h total · avg 7h 29m/person (30d avg: 7h 12m) · 58% productive'
  },
  1: { // Feb 28
    concerns: [
      { initials: 'RM', name: 'Ramiz Murshudov', color: '#22C55E', metric: '41% idle', avg7day: '14%', avg30day: '15%' },
      { initials: 'PC', name: 'Princess Coronel', color: '#F29937', metric: '38% idle', avg7day: '16%', avg30day: '18%' },
    ],
    warnings: [],
    highlights: [
      { initials: 'EA', name: 'Eyyub Alakbarov', color: '#10B981', metric: '95% focus, 78% productive' },
      { initials: 'MF', name: 'Mirveli Fayazzade', color: '#8B5CF6', metric: '2.1% idle' },
      { initials: 'SG', name: 'Saba Gogiberidze', color: '#7C3AED', metric: '88% focus, 72% productive' },
    ],
    summary: '5 of 5 active · 35h total · avg 7h/person (30d avg: 7h 12m) · 62% productive'
  },
  2: { // Feb 27
    concerns: [
      { initials: 'PC', name: 'Princess Coronel', color: '#F29937', metric: '46% idle', avg7day: '15%', avg30day: '17%' },
      { initials: 'NA', name: 'Nurlana Ahmadova', color: '#0C62F9', metric: '11% focus', avg7day: '60%', avg30day: '58%' },
      { initials: 'EM', name: 'Elshad Muradov', color: '#EF4444', metric: '39% idle', avg7day: '22%', avg30day: '24%' },
    ],
    warnings: [
      { initials: 'RH', name: 'Rinat Hajiyev', color: '#F86060', metric: '10h 30m worked', avg7day: '6% idle', avg30day: '124% of 30d avg 8h 30m' },
    ],
    highlights: [
      { initials: 'EA', name: 'Eyyub Alakbarov', color: '#10B981', metric: '97% focus, 80% productive' },
    ],
    summary: '4 of 5 active · 28h total · avg 7h/person (30d avg: 7h 12m) · 55% productive'
  },
  3: { // Feb 26
    concerns: [
      { initials: 'NA', name: 'Nurlana Ahmadova', color: '#0C62F9', metric: '14% focus', avg7day: '58%', avg30day: '60%' },
    ],
    warnings: [],
    highlights: [
      { initials: 'RH', name: 'Rinat Hajiyev', color: '#F86060', metric: '92% focus, 76% productive' },
      { initials: 'EA', name: 'Eyyub Alakbarov', color: '#10B981', metric: '98% focus, 85% productive' },
      { initials: 'MF', name: 'Mirveli Fayazzade', color: '#8B5CF6', metric: '1.8% idle' },
      { initials: 'SG', name: 'Saba Gogiberidze', color: '#7C3AED', metric: '91% focus' },
    ],
    summary: '5 of 5 active · 39h total · avg 7h 48m/person (30d avg: 7h 12m) · 64% productive'
  },
  4: { // Feb 25
    concerns: [
      { initials: 'PC', name: 'Princess Coronel', color: '#F29937', metric: '42% idle', avg7day: '16%', avg30day: '18%' },
      { initials: 'RM', name: 'Ramiz Murshudov', color: '#22C55E', metric: '37% idle', avg7day: '13%', avg30day: '14%' },
    ],
    warnings: [],
    highlights: [
      { initials: 'EA', name: 'Eyyub Alakbarov', color: '#10B981', metric: '94% focus' },
      { initials: 'RH', name: 'Rinat Hajiyev', color: '#F86060', metric: '79% productive' },
    ],
    summary: '5 of 5 active · 36h total · avg 7h 12m/person (30d avg: 7h 12m) · 60% productive'
  },
  5: { // Feb 24
    concerns: [
      { initials: 'PC', name: 'Princess Coronel', color: '#F29937', metric: '55% idle', avg7day: '17%', avg30day: '18%' },
      { initials: 'RM', name: 'Ramiz Murshudov', color: '#22C55E', metric: '44% idle', avg7day: '13%', avg30day: '15%' },
      { initials: 'SG', name: 'Saba Gogiberidze', color: '#7C3AED', metric: '41% idle', avg7day: '19%', avg30day: '20%' },
      { initials: 'NA', name: 'Nurlana Ahmadova', color: '#0C62F9', metric: '9% focus', avg7day: '62%', avg30day: '60%' },
      { initials: 'EM', name: 'Elshad Muradov', color: '#EF4444', metric: '36% idle', avg7day: '23%', avg30day: '24%' },
    ],
    warnings: [
      { initials: 'RH', name: 'Rinat Hajiyev', color: '#F86060', metric: '12h 10m worked', avg7day: '5% idle', avg30day: '143% of 30d avg' },
      { initials: 'EA', name: 'Eyyub Alakbarov', color: '#10B981', metric: '11h 20m worked', avg7day: '7% idle', avg30day: '126% of 30d avg' },
    ],
    highlights: [],
    summary: '3 of 5 active · 22h total · avg 7h 20m/person (30d avg: 7h 12m) · 48% productive'
  },
  6: { // Feb 23
    concerns: [
      { initials: 'PC', name: 'Princess Coronel', color: '#F29937', metric: '43% idle', avg7day: '16%', avg30day: '17%' },
      { initials: 'NA', name: 'Nurlana Ahmadova', color: '#0C62F9', metric: '15% focus', avg7day: '60%', avg30day: '59%' },
    ],
    warnings: [
      { initials: 'RH', name: 'Rinat Hajiyev', color: '#F86060', metric: '10h 45m worked', avg7day: '9% idle', avg30day: '127% of 30d avg' },
    ],
    highlights: [
      { initials: 'MF', name: 'Mirveli Fayazzade', color: '#8B5CF6', metric: '1.9% idle, 52% productive' },
    ],
    summary: '5 of 5 active · 34h total · avg 6h 48m/person (30d avg: 7h 12m) · 57% productive'
  }
};

const historyData: HistoryRow[] = [
  { date: 'Mar 1 (Today)', isToday: true, active: '5 active', totalHours: '37h', productive: '58% prod', concerns: 4, warnings: 1, highlights: 2, status: 'viewed' },
  { date: 'Feb 28', active: '5 active', totalHours: '35h', productive: '62% prod', concerns: 2, warnings: 0, highlights: 3, status: 'sent' },
  { date: 'Feb 27', active: '4 active', totalHours: '28h', productive: '55% prod', concerns: 3, warnings: 1, highlights: 1, status: 'sent' },
  { date: 'Feb 26', active: '5 active', totalHours: '39h', productive: '64% prod', concerns: 1, warnings: 0, highlights: 4, status: 'emailed' },
  { date: 'Feb 25', active: '5 active', totalHours: '36h', productive: '60% prod', concerns: 2, warnings: 0, highlights: 2, status: 'emailed' },
  { date: 'Feb 24', active: '3 active', totalHours: '22h', productive: '48% prod', concerns: 5, warnings: 2, highlights: 0, status: 'emailed' },
  { date: 'Feb 23', active: '5 active', totalHours: '34h', productive: '57% prod', concerns: 2, warnings: 1, highlights: 1, status: 'emailed' },
];

// Data for main dashboard cards (Today's alerts)
const concernsData = dayDataMap[0].concerns;
const warningsData = dayDataMap[0].warnings;
const highlightsData = dayDataMap[0].highlights;

export function AIAlertBanner() {
  const [demoState, setDemoState] = useState<DemoState>('all-alerts');
  const [expandedConcerns, setExpandedConcerns] = useState(false);
  const [expandedWarnings, setExpandedWarnings] = useState(false);
  const [expandedHighlights, setExpandedHighlights] = useState(false);
  const [selectedHistoryRow, setSelectedHistoryRow] = useState<number | null>(null);

  const showConcerns = demoState === 'all-alerts';
  const showWarnings = demoState === 'all-alerts' || demoState === 'warnings-only';
  const showHighlights = demoState === 'all-alerts';
  const showBlue = demoState !== 'history';
  const showHistory = demoState === 'history';

  const closePanel = () => {
    setSelectedHistoryRow(null);
  };

  return (
    <div className="mb-6">
      {/* Demo State Switcher */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setDemoState('all-alerts')}
          className={`flex items-center gap-2 px-[14px] py-[6px] text-[13px] font-medium rounded-[8px] transition-all duration-200 ${
            demoState === 'all-alerts'
              ? 'bg-[#0C62F9] text-white'
              : 'bg-white text-[#23262F] border border-[#E0E0E0] hover:border-[#0C62F9]'
          }`}
        >
          <Zap size={14} />
          All Alerts
        </button>
        <button
          onClick={() => setDemoState('warnings-only')}
          className={`flex items-center gap-2 px-[14px] py-[6px] text-[13px] font-medium rounded-[8px] transition-all duration-200 ${
            demoState === 'warnings-only'
              ? 'bg-[#0C62F9] text-white'
              : 'bg-white text-[#23262F] border border-[#E0E0E0] hover:border-[#0C62F9]'
          }`}
        >
          <AlertTriangle size={14} />
          Warnings Only
        </button>
        <button
          onClick={() => setDemoState('clean-day')}
          className={`flex items-center gap-2 px-[14px] py-[6px] text-[13px] font-medium rounded-[8px] transition-all duration-200 ${
            demoState === 'clean-day'
              ? 'bg-[#0C62F9] text-white'
              : 'bg-white text-[#23262F] border border-[#E0E0E0] hover:border-[#0C62F9]'
          }`}
        >
          <CheckCircle size={14} />
          Clean Day
        </button>
        <button
          onClick={() => setDemoState('history')}
          className={`flex items-center gap-2 px-[14px] py-[6px] text-[13px] font-medium rounded-[8px] transition-all duration-200 ${
            demoState === 'history'
              ? 'bg-[#0C62F9] text-white'
              : 'bg-white text-[#23262F] border border-[#E0E0E0] hover:border-[#0C62F9]'
          }`}
        >
          <History size={14} />
          History
        </button>
      </div>

      {/* History View */}
      {showHistory && (
        <div className="bg-white border border-[#EFF2F4] rounded-[8px] overflow-hidden" style={{ boxShadow: '0px 4px 6px -4px rgba(24,39,75,0.12)' }}>
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#EFF2F4] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <History size={18} className="text-text-primary" />
                <h3 className="text-[16px] font-medium text-text-primary">Alert history</h3>
              </div>
              <p className="text-[13px] text-[#7A7A7E]">Last 7 days</p>
            </div>
            <button className="flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary transition-colors">
              <Download size={14} />
              Export
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="h-[44px] bg-[#F8FAFC] border-b border-[#F4F5F6]">
                  <th className="px-6 text-left text-[10px] font-medium text-[#7A7A7E] uppercase tracking-[0.05em]">Date</th>
                  <th className="px-6 text-left text-[10px] font-medium text-[#7A7A7E] uppercase tracking-[0.05em]">Team Summary</th>
                  <th className="px-6 text-left text-[10px] font-medium text-[#7A7A7E] uppercase tracking-[0.05em]">Concerns</th>
                  <th className="px-6 text-left text-[10px] font-medium text-[#7A7A7E] uppercase tracking-[0.05em]">Warnings</th>
                  <th className="px-6 text-left text-[10px] font-medium text-[#7A7A7E] uppercase tracking-[0.05em]">Highlights</th>
                  <th className="px-6 text-left text-[10px] font-medium text-[#7A7A7E] uppercase tracking-[0.05em]">Status</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedHistoryRow(index)}
                    className={`h-[60px] border-b border-[#F4F5F6] last:border-0 hover:bg-[#FAFBFC] transition-colors cursor-pointer ${
                      selectedHistoryRow === index ? 'border-l-[3px] border-l-[#0C62F9] bg-[#F2F9FF]' : ''
                    }`}
                  >
                    <td className="px-6 text-[13px] font-medium text-text-primary">{row.date}</td>
                    <td className="px-6 text-[13px] text-text-secondary">
                      {row.active} · {row.totalHours} · {row.productive}
                    </td>
                    <td className="px-6">
                      {row.concerns > 0 ? (
                        <span className="inline-flex items-center px-[10px] py-[3px] rounded-[10px] text-[12px] font-medium" style={{ backgroundColor: 'rgba(226,75,74,0.08)', color: '#A32D2D' }}>
                          {row.concerns} flagged
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#C5C5C5]">—</span>
                      )}
                    </td>
                    <td className="px-6">
                      {row.warnings > 0 ? (
                        <span className="inline-flex items-center px-[10px] py-[3px] rounded-[10px] text-[12px] font-medium" style={{ backgroundColor: 'rgba(239,159,39,0.08)', color: '#854F0B' }}>
                          {row.warnings} burnout
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#C5C5C5]">—</span>
                      )}
                    </td>
                    <td className="px-6">
                      {row.highlights > 0 ? (
                        <span className="inline-flex items-center px-[10px] py-[3px] rounded-[10px] text-[12px] font-medium" style={{ backgroundColor: 'rgba(29,158,117,0.08)', color: '#0F6E56' }}>
                          {row.highlights} strong
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#C5C5C5]">—</span>
                      )}
                    </td>
                    <td className="px-6">
                      <div className="flex items-center gap-2">
                        {row.status === 'viewed' && (
                          <>
                            <Eye size={14} className="text-[#7A7A7E]" />
                            <span className="text-[13px] text-[#7A7A7E]">Viewed</span>
                          </>
                        )}
                        {row.status === 'sent' && (
                          <>
                            <CheckCircle size={14} className="text-[#65C366]" />
                            <span className="text-[13px] text-[#7A7A7E]">Sent</span>
                          </>
                        )}
                        {row.status === 'emailed' && (
                          <>
                            <Mail size={14} className="text-[#0C62F9]" />
                            <span className="text-[13px] text-[#7A7A7E]">Emailed</span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Side Panel - Alert History Detail */}
      {showHistory && selectedHistoryRow !== null && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/10 z-40"
            onClick={closePanel}
          />

          {/* Panel */}
          <div
            className="fixed top-0 right-0 h-full w-[460px] bg-white border-l border-[#EFF2F4] z-50 flex flex-col animate-slide-in-right"
            style={{ boxShadow: '-4px 0 16px rgba(0,0,0,0.06)' }}
          >
            {/* Panel Header */}
            <div className="px-6 pt-5 pb-4 border-b border-[#F4F5F6] flex-shrink-0" style={{ padding: '20px 24px 16px' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[16px] font-medium text-text-primary">Alert details</h3>
                <button
                  onClick={closePanel}
                  className="w-7 h-7 border border-[#EFF2F4] rounded-[6px] flex items-center justify-center hover:bg-bg-tertiary transition-colors"
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <p className="text-[14px] font-medium text-[#23262F] mb-1">
                {selectedHistoryRow === 0 ? 'March 1, 2026' : `February ${28 - selectedHistoryRow}, 2026`}
              </p>
              <p className="text-[12px] text-[#C5C5C5]">Generated at 5:00 PM</p>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto flex flex-col" style={{ padding: '16px 24px', gap: '12px' }}>
              {/* Content based on selected row */}
              {selectedHistoryRow !== null && dayDataMap[selectedHistoryRow] && (
                <>
                  {/* Concerns Card */}
                  {dayDataMap[selectedHistoryRow].concerns.length > 0 && (
                    <div className="bg-[#FEF2F2] border-l-[3px] border-l-[#F86060]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                        <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(248,96,96,0.12)' }}>
                          <AlertTriangle size={14} className="text-[#F86060]" />
                        </div>
                        <span className="text-[13px] font-medium text-text-primary">Concerns</span>
                        <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(248,96,96,0.12)', color: '#A32D2D', padding: '2px 8px' }}>
                          {dayDataMap[selectedHistoryRow].concerns.length}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {dayDataMap[selectedHistoryRow].concerns.map((user, index) => (
                          <div key={index} className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0" style={{ backgroundColor: user.color }}>
                              {user.initials}
                            </div>
                            <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>{user.name}</span>
                            <span className="text-[12px] text-[#F86060]">{user.metric}</span>
                            {user.avg7day && user.avg30day && (
                              <span className="text-[11px] text-[#C5C5C5]">7d: {user.avg7day} · 30d: {user.avg30day}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warnings Card */}
                  {dayDataMap[selectedHistoryRow].warnings.length > 0 && (
                    <div className="bg-[#FFF9F2] border-l-[3px] border-l-[#F29937]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                        <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(242,153,55,0.12)' }}>
                          <Flame size={14} className="text-[#F29937]" />
                        </div>
                        <span className="text-[13px] font-medium text-text-primary">Burnout</span>
                        <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(242,153,55,0.12)', color: '#854F0B', padding: '2px 8px' }}>
                          {dayDataMap[selectedHistoryRow].warnings.length}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {dayDataMap[selectedHistoryRow].warnings.map((user, index) => (
                          <div key={index} className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0" style={{ backgroundColor: user.color }}>
                              {user.initials}
                            </div>
                            <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>{user.name}</span>
                            <span className="text-[12px] text-[#F29937]">{user.metric}</span>
                            {user.avg7day && user.avg30day && (
                              <span className="text-[11px] text-[#C5C5C5]">{user.avg7day} · {user.avg30day}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights Card */}
                  {dayDataMap[selectedHistoryRow].highlights.length > 0 && (
                    <div className="bg-[#F0FDF4] border-l-[3px] border-l-[#22C55E]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                        <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}>
                          <TrendingUp size={14} className="text-[#22C55E]" />
                        </div>
                        <span className="text-[13px] font-medium text-text-primary">Highlights</span>
                        <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#0F6E56', padding: '2px 8px' }}>
                          {dayDataMap[selectedHistoryRow].highlights.length}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {dayDataMap[selectedHistoryRow].highlights.map((user, index) => (
                          <div key={index} className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0" style={{ backgroundColor: user.color }}>
                              {user.initials}
                            </div>
                            <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>{user.name}</span>
                            <span className="text-[12px] text-[#22C55E]">{user.metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Separator */}
                  <div className="h-[0.5px] bg-[#F4F5F6]" />

                  {/* Summary - NOT a card, just a text block */}
                  <div className="bg-[#E6F1FB] border-l-[3px] border-l-[#378ADD]" style={{ padding: '12px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-[#378ADD]" />
                      <span className="text-[12px] text-text-primary">{dayDataMap[selectedHistoryRow].summary}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Panel Footer */}
            <div className="px-6 py-4 border-t border-[#EFF2F4] flex-shrink-0 bg-white">
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#0C62F9] hover:text-[#0A56E0] transition-colors">
                View full dashboard for this day
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </>
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
