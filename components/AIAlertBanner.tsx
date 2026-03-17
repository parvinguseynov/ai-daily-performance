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
  status: 'viewed' | 'sent' | 'emailed';
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
  { date: 'Mar 1 (Today)', isToday: true, active: '5 active', totalHours: '37h', productive: '58% prod', concerns: 4, warnings: 1, highlights: 2, status: 'viewed' },
  { date: 'Feb 28', active: '5 active', totalHours: '35h', productive: '62% prod', concerns: 2, warnings: 0, highlights: 3, status: 'sent' },
  { date: 'Feb 27', active: '4 active', totalHours: '28h', productive: '55% prod', concerns: 3, warnings: 1, highlights: 1, status: 'sent' },
  { date: 'Feb 26', active: '5 active', totalHours: '39h', productive: '64% prod', concerns: 1, warnings: 0, highlights: 4, status: 'emailed' },
  { date: 'Feb 25', active: '5 active', totalHours: '36h', productive: '60% prod', concerns: 2, warnings: 0, highlights: 2, status: 'emailed' },
  { date: 'Feb 24', active: '3 active', totalHours: '22h', productive: '48% prod', concerns: 5, warnings: 2, highlights: 0, status: 'emailed' },
  { date: 'Feb 23', active: '5 active', totalHours: '34h', productive: '57% prod', concerns: 2, warnings: 1, highlights: 1, status: 'emailed' },
];

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
              {selectedHistoryRow === 0 && (
                <>
                  {/* Concerns Card */}
                  <div className="bg-[#FEF2F2] border-l-[3px] border-l-[#F86060]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(248,96,96,0.12)' }}>
                        <AlertTriangle size={14} className="text-[#F86060]" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">Concerns</span>
                      <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(248,96,96,0.12)', color: '#A32D2D', padding: '2px 8px' }}>
                        4
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#F29937] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">PC</div>
                        <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Princess Coronel</span>
                        <span className="text-[12px] text-[#F86060]">52% idle</span>
                        <span className="text-[11px] text-[#C5C5C5]">7d: 15% · 30d: 18%</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">RM</div>
                        <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Ramiz Murshudov</span>
                        <span className="text-[12px] text-[#F86060]">48% idle</span>
                        <span className="text-[11px] text-[#C5C5C5]">7d: 12% · 30d: 14%</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">SG</div>
                        <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Saba Gogiberidze</span>
                        <span className="text-[12px] text-[#F86060]">44% idle</span>
                        <span className="text-[11px] text-[#C5C5C5]">7d: 18% · 30d: 20%</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#0C62F9] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">NA</div>
                        <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Nurlana Ahmadova</span>
                        <span className="text-[12px] text-[#F86060]">8% focus</span>
                        <span className="text-[11px] text-[#C5C5C5]">7d: 65% · 30d: 60%</span>
                      </div>
                    </div>
                  </div>

                  {/* Warnings Card */}
                  <div className="bg-[#FFF9F2] border-l-[3px] border-l-[#F29937]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(242,153,55,0.12)' }}>
                        <Flame size={14} className="text-[#F29937]" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">Burnout</span>
                      <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(242,153,55,0.12)', color: '#854F0B', padding: '2px 8px' }}>
                        1
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                      <div className="w-6 h-6 rounded-full bg-[#F86060] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">RH</div>
                      <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Rinat Hajiyev</span>
                      <span className="text-[12px] text-[#F29937]">11h 4m worked</span>
                      <span className="text-[11px] text-[#C5C5C5]">8% idle · 130% of 30d avg</span>
                    </div>
                  </div>

                  {/* Highlights Card */}
                  <div className="bg-[#F0FDF4] border-l-[3px] border-l-[#22C55E]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}>
                        <TrendingUp size={14} className="text-[#22C55E]" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">Highlights</span>
                      <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#0F6E56', padding: '2px 8px' }}>
                        2
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">EA</div>
                        <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Eyyub Alakbarov</span>
                        <span className="text-[12px] text-[#22C55E]">100% focus, 81.6% productive</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">MF</div>
                        <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Mirveli Fayazzade</span>
                        <span className="text-[12px] text-[#22C55E]">1.4% idle, 44% productive</span>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-[0.5px] bg-[#F4F5F6]" />

                  {/* Summary - NOT a card, just a text block */}
                  <div className="bg-[#E6F1FB] border-l-[3px] border-l-[#378ADD]" style={{ padding: '12px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-[#378ADD]" />
                      <span className="text-[12px] text-text-primary">5 of 5 active · 37h total · avg 7h 29m/person (30d avg: 7h 12m) · 58% productive</span>
                    </div>
                  </div>
                </>
              )}

              {/* Feb 28 */}
              {selectedHistoryRow === 1 && (
                <>
                  <div className="bg-[#FEF2F2] border-l-[3px] border-l-[#F86060]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(248,96,96,0.12)' }}>
                        <AlertTriangle size={14} className="text-[#F86060]" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">Concerns</span>
                      <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(248,96,96,0.12)', color: '#A32D2D', padding: '2px 8px' }}>
                        2
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">RM</div>
                        <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Ramiz M.</span>
                        <span className="text-[12px] text-[#F86060]">41% idle</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#F29937] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">PC</div>
                        <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Princess C.</span>
                        <span className="text-[12px] text-[#F86060]">38% idle</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F0FDF4] border-l-[3px] border-l-[#22C55E]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}>
                        <TrendingUp size={14} className="text-[#22C55E]" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">Highlights</span>
                      <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#0F6E56', padding: '2px 8px' }}>
                        3
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">EA</div>
                        <span className="text-[12px] font-medium text-text-primary">Eyyub A.</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">MF</div>
                        <span className="text-[12px] font-medium text-text-primary">Mirveli F.</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">SG</div>
                        <span className="text-[12px] font-medium text-text-primary">Saba G.</span>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-[0.5px] bg-[#F4F5F6]" />

                  {/* Summary */}
                  <div className="bg-[#E6F1FB] border-l-[3px] border-l-[#378ADD]" style={{ padding: '12px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-[#378ADD]" />
                      <span className="text-[12px] text-text-primary">5 active · 35h total · 62% productive</span>
                    </div>
                  </div>
                </>
              )}

              {/* Feb 27 */}
              {selectedHistoryRow === 2 && (
                <>
                  <div className="bg-[#FEF2F2] border-l-[3px] border-l-[#F86060]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(248,96,96,0.12)' }}>
                        <AlertTriangle size={14} className="text-[#F86060]" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">Concerns</span>
                      <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(248,96,96,0.12)', color: '#A32D2D', padding: '2px 8px' }}>
                        3
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#F29937] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">PC</div>
                        <span className="text-[12px] font-medium text-text-primary">Princess C.</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#0C62F9] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">NA</div>
                        <span className="text-[12px] font-medium text-text-primary">Nurlana A.</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                        <div className="w-6 h-6 rounded-full bg-[#0C62F9] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">EM</div>
                        <span className="text-[12px] font-medium text-text-primary">Elshad M.</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFF9F2] border-l-[3px] border-l-[#F29937]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(242,153,55,0.12)' }}>
                        <Flame size={14} className="text-[#F29937]" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">Burnout</span>
                      <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(242,153,55,0.12)', color: '#854F0B', padding: '2px 8px' }}>
                        1
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                      <div className="w-6 h-6 rounded-full bg-[#F86060] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">RH</div>
                      <span className="text-[12px] font-medium text-text-primary" style={{ minWidth: '110px' }}>Rinat H.</span>
                      <span className="text-[12px] text-[#F29937]">10h 30m worked</span>
                    </div>
                  </div>

                  <div className="bg-[#F0FDF4] border-l-[3px] border-l-[#22C55E]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                      <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}>
                        <TrendingUp size={14} className="text-[#22C55E]" />
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">Highlights</span>
                      <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#0F6E56', padding: '2px 8px' }}>
                        1
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-[6px] hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ padding: '6px 8px' }}>
                      <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">EA</div>
                      <span className="text-[12px] font-medium text-text-primary">Eyyub A.</span>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-[0.5px] bg-[#F4F5F6]" />

                  {/* Summary */}
                  <div className="bg-[#E6F1FB] border-l-[3px] border-l-[#378ADD]" style={{ padding: '12px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-[#378ADD]" />
                      <span className="text-[12px] text-text-primary">4 active · 28h total · 55% productive</span>
                    </div>
                  </div>
                </>
              )}

              {/* Other days - simplified version */}
              {selectedHistoryRow !== null && selectedHistoryRow > 2 && (
                <>
                  {historyData[selectedHistoryRow].concerns > 0 && (
                    <div className="bg-[#FEF2F2] border-l-[3px] border-l-[#F86060]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                        <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(248,96,96,0.12)' }}>
                          <AlertTriangle size={14} className="text-[#F86060]" />
                        </div>
                        <span className="text-[13px] font-medium text-text-primary">Concerns</span>
                        <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(248,96,96,0.12)', color: '#A32D2D', padding: '2px 8px' }}>
                          {historyData[selectedHistoryRow].concerns}
                        </span>
                      </div>
                      <span className="text-[12px] text-text-secondary">Various users flagged for performance concerns</span>
                    </div>
                  )}

                  {historyData[selectedHistoryRow].warnings > 0 && (
                    <div className="bg-[#FFF9F2] border-l-[3px] border-l-[#F29937]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                        <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(242,153,55,0.12)' }}>
                          <Flame size={14} className="text-[#F29937]" />
                        </div>
                        <span className="text-[13px] font-medium text-text-primary">Burnout</span>
                        <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(242,153,55,0.12)', color: '#854F0B', padding: '2px 8px' }}>
                          {historyData[selectedHistoryRow].warnings}
                        </span>
                      </div>
                      <span className="text-[12px] text-text-secondary">Burnout risk detected</span>
                    </div>
                  )}

                  {historyData[selectedHistoryRow].highlights > 0 && (
                    <div className="bg-[#F0FDF4] border-l-[3px] border-l-[#22C55E]" style={{ padding: '14px 16px', borderRadius: 0 }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: '10px' }}>
                        <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.12)' }}>
                          <TrendingUp size={14} className="text-[#22C55E]" />
                        </div>
                        <span className="text-[13px] font-medium text-text-primary">Highlights</span>
                        <span className="inline-flex items-center rounded-[10px] text-[10px] font-medium" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#0F6E56', padding: '2px 8px' }}>
                          {historyData[selectedHistoryRow].highlights}
                        </span>
                      </div>
                      <span className="text-[12px] text-text-secondary">Strong performers recognized</span>
                    </div>
                  )}

                  {/* Separator */}
                  <div className="h-[0.5px] bg-[#F4F5F6]" />

                  {/* Summary */}
                  <div className="bg-[#E6F1FB] border-l-[3px] border-l-[#378ADD]" style={{ padding: '12px 16px', borderRadius: 0 }}>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-[#378ADD]" />
                      <span className="text-[12px] text-text-primary">
                        {historyData[selectedHistoryRow].active} · {historyData[selectedHistoryRow].totalHours} · {historyData[selectedHistoryRow].productive}
                      </span>
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
