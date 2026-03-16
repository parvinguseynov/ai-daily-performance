'use client';

import { useState } from 'react';
import { Info, Lock, AlertCircle, Check } from 'lucide-react';
import { SecondHeader } from '@/components/SecondHeader';

type Tab = 'profile' | 'delegation' | 'defaults' | 'ai' | 'activity';

interface ThresholdRule {
  id: string;
  emoji: string;
  title: string;
  severity: 'high' | 'medium';
  enabled: boolean;
  fields: {
    label: string;
    value: number;
    unit: string;
    tooltip: string;
  }[];
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('ai');
  const [showToast, setShowToast] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);

  const [rules, setRules] = useState<ThresholdRule[]>([
    {
      id: 'high-idle',
      emoji: '🔴',
      title: 'High Idle',
      severity: 'high',
      enabled: true,
      fields: [
        { label: 'IDLE % ABOVE', value: 35, unit: '%', tooltip: 'Trigger when idle percentage exceeds this threshold' },
        { label: '× ABOVE 7-DAY AVG', value: 2.0, unit: '×', tooltip: 'Multiply factor compared to 7-day average' },
      ],
    },
    {
      id: 'low-focus',
      emoji: '🔴',
      title: 'Low Focus',
      severity: 'high',
      enabled: true,
      fields: [
        { label: 'FOCUS % BELOW', value: 20, unit: '%', tooltip: 'Trigger when focus percentage drops below this threshold' },
      ],
    },
    {
      id: 'burnout-risk',
      emoji: '🟡',
      title: 'Burnout Risk',
      severity: 'medium',
      enabled: true,
      fields: [
        { label: 'WORKED HOURS ABOVE', value: 10, unit: 'h', tooltip: 'Trigger when worked hours exceed this amount' },
        { label: 'IDLE % BELOW', value: 10, unit: '%', tooltip: 'AND idle percentage is below this threshold' },
      ],
    },
    {
      id: 'late-start',
      emoji: '🟡',
      title: 'Late Start',
      severity: 'medium',
      enabled: true,
      fields: [
        { label: 'HOURS LATER THAN USUAL', value: 3, unit: 'h', tooltip: 'Trigger when start time is this many hours later than usual' },
      ],
    },
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const updateField = (ruleId: string, fieldIndex: number, value: number) => {
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

  const resetToDefaults = () => {
    setRules([
      {
        id: 'high-idle',
        emoji: '🔴',
        title: 'High Idle',
        severity: 'high',
        enabled: true,
        fields: [
          { label: 'IDLE % ABOVE', value: 35, unit: '%', tooltip: 'Trigger when idle percentage exceeds this threshold' },
          { label: '× ABOVE 7-DAY AVG', value: 2.0, unit: '×', tooltip: 'Multiply factor compared to 7-day average' },
        ],
      },
      {
        id: 'low-focus',
        emoji: '🔴',
        title: 'Low Focus',
        severity: 'high',
        enabled: true,
        fields: [
          { label: 'FOCUS % BELOW', value: 20, unit: '%', tooltip: 'Trigger when focus percentage drops below this threshold' },
        ],
      },
      {
        id: 'burnout-risk',
        emoji: '🟡',
        title: 'Burnout Risk',
        severity: 'medium',
        enabled: true,
        fields: [
          { label: 'WORKED HOURS ABOVE', value: 10, unit: 'h', tooltip: 'Trigger when worked hours exceed this amount' },
          { label: 'IDLE % BELOW', value: 10, unit: '%', tooltip: 'AND idle percentage is below this threshold' },
        ],
      },
      {
        id: 'late-start',
        emoji: '🟡',
        title: 'Late Start',
        severity: 'medium',
        enabled: true,
        fields: [
          { label: 'HOURS LATER THAN USUAL', value: 3, unit: 'h', tooltip: 'Trigger when start time is this many hours later than usual' },
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
                {rules.map((rule) => (
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
                        <span className="text-[20px]">{rule.emoji}</span>
                        <h3 className="text-[14px] font-medium text-text-primary">{rule.title}</h3>
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
                              <div className="relative group">
                                <input
                                  type="number"
                                  value={field.value}
                                  onChange={(e) => updateField(rule.id, idx, parseFloat(e.target.value))}
                                  step={field.unit === '×' ? 0.1 : 1}
                                  className="w-20 px-3 py-1.5 border border-border-default rounded-element text-[12px] font-medium text-text-primary focus:border-primary-blue focus:outline-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-medium text-text-secondary pointer-events-none">
                                  {field.unit}
                                </span>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                  <div className="bg-text-primary text-text-white text-[10px] rounded-element py-2 px-3 whitespace-nowrap">
                                    {field.tooltip}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-primary" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule & Delivery Section */}
            <div className="bg-bg-secondary rounded-card border border-border-default p-6 shadow-card">
              <h2 className="text-[14px] font-medium text-text-primary mb-4">Schedule & Delivery</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-[12px] font-medium text-text-primary">Daily alert time:</label>
                  <input
                    type="time"
                    value="17:00"
                    readOnly
                    className="px-4 py-2 border border-border-default rounded-element text-[12px] font-medium bg-bg-tertiary"
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
