'use client';

import { useState } from 'react';
import { Info, Lock, AlertCircle, Check, AlertTriangle, TrendingDown, Flame, Clock } from 'lucide-react';
import { SecondHeader } from '@/components/SecondHeader';
import { Tooltip } from '@/components/Tooltip';
import { TimePickerAMPM } from '@/components/TimePickerAMPM';

type Tab = 'profile' | 'delegation' | 'defaults' | 'ai' | 'activity';

interface ThresholdRule {
  id: string;
  emoji: string;
  title: string;
  severity: 'high' | 'medium';
  enabled: boolean;
  description: string; // Tooltip for the rule card
  fields: {
    label: string;
    value: number | string;
    unit: string;
    tooltip: string;
    type?: 'number' | 'time'; // Add field type
  }[];
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('ai');
  const [showToast, setShowToast] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [dailyAlertTime, setDailyAlertTime] = useState('17:00'); // 5:00 PM

  // Helper to get icon for alert type
  const getAlertIcon = (ruleId: string, size: number, color: string) => {
    const iconProps = { size, style: { color } };
    switch (ruleId) {
      case 'high-idle':
        return <AlertTriangle {...iconProps} />;
      case 'low-focus':
        return <TrendingDown {...iconProps} />;
      case 'burnout-risk':
        return <Flame {...iconProps} />;
      case 'late-start':
        return <Clock {...iconProps} />;
      default:
        return null;
    }
  };

  const [rules, setRules] = useState<ThresholdRule[]>([
    {
      id: 'high-idle',
      emoji: '🔴',
      title: 'High Idle',
      severity: 'high',
      enabled: true,
      description: "Idle% exceeds threshold AND is above personal 7-day average",
      fields: [
        { label: 'IDLE % ABOVE', value: 35, unit: '%', tooltip: 'Min idle% to trigger', type: 'number' },
        { label: '× ABOVE 7-DAY AVG', value: 2.0, unit: '×', tooltip: "Multiplier vs user's average", type: 'number' },
      ],
    },
    {
      id: 'low-focus',
      emoji: '🔴',
      title: 'Low Focus',
      severity: 'high',
      enabled: true,
      description: 'Focus% drops below threshold today',
      fields: [
        { label: 'FOCUS % BELOW', value: 20, unit: '%', tooltip: 'Min focus% threshold', type: 'number' },
      ],
    },
    {
      id: 'burnout-risk',
      emoji: '🟡',
      title: 'Burnout Risk',
      severity: 'medium',
      enabled: true,
      description: 'High hours + very low idle = potential burnout',
      fields: [
        { label: 'WORKED HOURS ABOVE', value: 10, unit: 'h', tooltip: 'Daily hours limit', type: 'number' },
        { label: 'IDLE % BELOW', value: 10, unit: '%', tooltip: 'Max idle% for burnout', type: 'number' },
      ],
    },
    {
      id: 'late-start',
      emoji: '🟡',
      title: 'Late Start',
      severity: 'medium',
      enabled: true,
      description: 'First activity after expected start + threshold',
      fields: [
        { label: 'EXPECTED START TIME', value: '09:00', unit: '', tooltip: 'Company work start time', type: 'time' },
        { label: 'LATE THRESHOLD', value: 3, unit: 'h', tooltip: 'Hours late = alert', type: 'number' },
      ],
    },
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const updateField = (ruleId: string, fieldIndex: number, value: number | string) => {
    setRules(rules.map(rule =>
      rule.id === ruleId
        ? {
            ...rule,
            fields: rule.fields.map((field, idx) =>
              idx === fieldIndex ? { ...field, value } : field
            )
          }
        : rule
    ));
  };

  // Helper function to calculate late start alert time
  const calculateLateStartTime = (expectedStartTime: string, hoursThreshold: number): string => {
    const [hours, minutes] = expectedStartTime.split(':').map(Number);

    // Convert threshold to total minutes and add to start time
    const thresholdMinutes = hoursThreshold * 60;
    const totalMinutes = hours * 60 + minutes + thresholdMinutes;

    // Calculate final hour and minute
    const alertHour = Math.floor(totalMinutes / 60) % 24;
    const alertMinutes = Math.floor(totalMinutes % 60);

    const period = alertHour >= 12 ? 'PM' : 'AM';
    const displayHour = alertHour > 12 ? alertHour - 12 : (alertHour === 0 ? 12 : alertHour);

    return `${displayHour}:${alertMinutes.toString().padStart(2, '0')} ${period}`;
  };

  const resetToDefaults = () => {
    setRules([
      {
        id: 'high-idle',
        emoji: '🔴',
        title: 'High Idle',
        severity: 'high',
        enabled: true,
        description: "Idle% exceeds threshold AND is above personal 7-day average",
        fields: [
          { label: 'IDLE % ABOVE', value: 35, unit: '%', tooltip: 'Min idle% to trigger', type: 'number' },
          { label: '× ABOVE 7-DAY AVG', value: 2.0, unit: '×', tooltip: "Multiplier vs user's average", type: 'number' },
        ],
      },
      {
        id: 'low-focus',
        emoji: '🔴',
        title: 'Low Focus',
        severity: 'high',
        enabled: true,
        description: 'Focus% drops below threshold today',
        fields: [
          { label: 'FOCUS % BELOW', value: 20, unit: '%', tooltip: 'Min focus% threshold', type: 'number' },
        ],
      },
      {
        id: 'burnout-risk',
        emoji: '🟡',
        title: 'Burnout Risk',
        severity: 'medium',
        enabled: true,
        description: 'High hours + very low idle = potential burnout',
        fields: [
          { label: 'WORKED HOURS ABOVE', value: 10, unit: 'h', tooltip: 'Daily hours limit', type: 'number' },
          { label: 'IDLE % BELOW', value: 10, unit: '%', tooltip: 'Max idle% for burnout', type: 'number' },
        ],
      },
      {
        id: 'late-start',
        emoji: '🟡',
        title: 'Late Start',
        severity: 'medium',
        enabled: true,
        description: 'First activity after expected start + threshold',
        fields: [
          { label: 'EXPECTED START TIME', value: '09:00', unit: '', tooltip: 'Company work start time', type: 'time' },
          { label: 'LATE THRESHOLD', value: 3, unit: 'h', tooltip: 'Hours late = alert', type: 'number' },
        ],
      },
    ]);
    setEmailDigest(true);
  };

  const saveChanges = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <div className="bg-bg-secondary border-b border-border-divider px-6 py-4">
        <h1 className="text-[20px] font-medium text-text-primary">Company Settings</h1>
      </div>
      <div className="p-6 max-w-[1435px] mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-border-divider mb-6">
          <TabButton
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            Company Profile
          </TabButton>
          <TabButton
            active={activeTab === 'delegation'}
            onClick={() => setActiveTab('delegation')}
          >
            Access Delegation
          </TabButton>
          <TabButton
            active={activeTab === 'defaults'}
            onClick={() => setActiveTab('defaults')}
          >
            Company-Wide Defaults
          </TabButton>
          <TabButton
            active={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
          >
            AI & Automation
            <span className="ml-2 px-2 py-0.5 text-[10px] font-medium bg-ai-gradient text-text-white rounded uppercase">
              New
            </span>
          </TabButton>
          <TabButton
            active={activeTab === 'activity'}
            onClick={() => setActiveTab('activity')}
          >
            Company Activity Log
          </TabButton>
        </div>

        {/* Tab Content */}
        {activeTab !== 'ai' ? (
          <div className="bg-bg-secondary rounded-card border border-border-default p-12 text-center shadow-card">
            <p className="text-text-secondary">This tab is for demo purposes only.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Performance Alert Thresholds Section */}
            <div className="bg-bg-secondary rounded-card border border-border-default p-6 shadow-card">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-[14px] font-medium text-text-primary">Performance Alert Thresholds</h2>
                <button className="p-1 hover:bg-bg-tertiary rounded transition-colors" title="Learn more about alert thresholds">
                  <Info className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <p className="text-[12px] text-text-secondary mb-6">
                Configure when team members are flagged for performance anomalies.
              </p>

              <div className="space-y-4">
                {rules.map((rule) => {
                  // Get Late Start values for helper text
                  const lateStartExpectedTime = rule.id === 'late-start' ? String(rule.fields[0]?.value || '09:00') : '';
                  const lateStartThreshold = rule.id === 'late-start' ? Number(rule.fields[1]?.value || 3) : 0;
                  const lateStartAlertTime = rule.id === 'late-start'
                    ? calculateLateStartTime(lateStartExpectedTime, lateStartThreshold)
                    : '';

                  // Get icon color and background
                  const iconColor = rule.severity === 'high' ? '#F86060' : '#F29937';
                  const iconBg = rule.severity === 'high' ? 'rgba(248, 96, 96, 0.12)' : 'rgba(242, 153, 55, 0.12)';

                  return (
                    <div
                      key={rule.id}
                      className={`border rounded-card p-5 transition-all ${
                        rule.enabled
                          ? 'border-border-default bg-bg-secondary'
                          : 'border-border-divider bg-bg-tertiary opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-[6px] flex items-center justify-center"
                            style={{ backgroundColor: iconBg }}
                          >
                            {getAlertIcon(rule.id, 16, iconColor)}
                          </div>
                          <h3 className="text-[14px] font-medium text-text-primary">{rule.title}</h3>
                          <Tooltip content={rule.description}>
                            <Info className="w-4 h-4 text-text-secondary cursor-help" />
                          </Tooltip>
                        </div>
                        <button
                          onClick={() => toggleRule(rule.id)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            rule.enabled ? 'bg-primary-blue' : 'bg-text-secondary/30'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-text-white transition-transform ${
                              rule.enabled ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>

                      {rule.enabled && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-4 flex-wrap">
                            {rule.fields.map((field, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                {idx > 0 && (
                                  <span className="text-[10px] font-medium text-text-secondary uppercase px-2">
                                    AND
                                  </span>
                                )}
                                <div className="flex items-center gap-2">
                                  <label className="text-[10px] font-medium text-text-secondary uppercase tracking-wide">
                                    {field.label}:
                                  </label>
                                  <Tooltip content={field.tooltip}>
                                    {field.type === 'time' ? (
                                      <TimePickerAMPM
                                        value={String(field.value)}
                                        onChange={(newValue) => updateField(rule.id, idx, newValue)}
                                      />
                                    ) : (
                                      <div className="relative">
                                        <input
                                          type="number"
                                          value={field.value}
                                          onChange={(e) => updateField(rule.id, idx, parseFloat(e.target.value))}
                                          step={field.unit === '×' ? 0.1 : (field.label === 'LATE THRESHOLD' ? 0.5 : 1)}
                                          min={field.label === 'LATE THRESHOLD' ? 0.5 : undefined}
                                          className="w-20 px-3 py-1.5 border border-border-default rounded-element text-[12px] font-medium text-text-primary focus:border-primary-blue focus:outline-none"
                                        />
                                        {field.unit && (
                                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-text-secondary pointer-events-none">
                                            {field.unit}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </Tooltip>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Helper text for Late Start */}
                          {rule.id === 'late-start' && (
                            <p className="text-[11px] text-text-secondary italic">
                              Alert if first activity is after {lateStartAlertTime}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schedule & Delivery Section */}
            <div className="bg-bg-secondary rounded-card border border-border-default p-6 shadow-card">
              <h2 className="text-[14px] font-medium text-text-primary mb-4">Schedule & Delivery</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-[12px] font-medium text-text-primary">Daily alert time:</label>
                  <TimePickerAMPM
                    value={dailyAlertTime}
                    onChange={setDailyAlertTime}
                  />
                  <span className="text-[12px] text-text-secondary">Asia/Baku (UTC +4)</span>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-border-divider">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-medium text-text-primary">Send email digest</span>
                  </div>
                  <button
                    onClick={() => setEmailDigest(!emailDigest)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      emailDigest ? 'bg-primary-blue' : 'bg-text-secondary/30'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-text-white transition-transform ${
                        emailDigest ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-bg-ice border border-primary-blue/20 rounded-card p-4 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-primary-blue flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-text-primary">
                    Emails are sent only when anomalies are detected.
                  </p>
                </div>
              </div>
            </div>

            {/* Access Note */}
            <div className="bg-bg-linen border border-warning-amber/30 rounded-card p-4 flex items-start gap-3">
              <Lock className="w-4 h-4 text-warning-alt flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-text-primary">
                Only <strong>Owner</strong> and <strong>Admin</strong> can edit. Managers can view alerts but not modify thresholds.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border-divider">
              <button
                onClick={resetToDefaults}
                className="px-5 py-2.5 border border-border-default rounded-card text-[12px] font-medium text-text-primary hover:bg-bg-tertiary transition-colors"
              >
                Reset to Defaults
              </button>
              <button
                onClick={saveChanges}
                className="px-6 py-2.5 bg-primary-blue hover:bg-[#0A56E0] text-text-white rounded-card text-[12px] font-medium transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-success-green text-text-white px-6 py-4 rounded-card shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom">
            <div className="w-6 h-6 bg-success-alt rounded-full flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium text-[12px]">Settings saved successfully</span>
          </div>
        )}
      </div>
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-[12px] font-medium transition-all border-b-2 flex items-center ${
        active
          ? 'text-primary-blue border-primary-blue'
          : 'text-text-secondary border-transparent hover:text-text-primary'
      }`}
    >
      {children}
    </button>
  );
}
