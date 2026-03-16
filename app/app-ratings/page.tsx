'use client';

import { useState } from 'react';
import { Search, Filter, ChevronDown, X, Check, Sparkles, AlertTriangle, CheckCircle, Clock, CheckCircle2, XCircle, MinusCircle, Bot } from 'lucide-react';

type DemoState = 'uncategorized' | 'categorized';
type WizardStep = 1 | 2 | 3 | null;
type TabType = 'uncategorized' | 'productive' | 'unproductive' | 'neutral';

interface AppItem {
  name: string;
  icon: string;
  usageTime: string;
  type: 'web' | 'app';
  level: string;
  rating: 'uncategorized' | 'productive' | 'unproductive' | 'neutral';
}

interface ReviewItem {
  name: string;
  icon: string;
  usageTime: string;
  type: 'web' | 'app';
  aiSuggestion: 'productive' | 'unproductive' | 'neutral';
  confidence: number;
  userDecision: 'productive' | 'unproductive' | 'neutral';
  changed?: boolean;
}

const uncategorizedData: AppItem[] = [
  { name: 'ams.win777.us', icon: '🌐', usageTime: '265h 11m', type: 'web', level: 'Global', rating: 'uncategorized' },
  { name: 'sabuhi-yusifzade.github.com', icon: '🌐', usageTime: '77h 28m', type: 'web', level: 'Global', rating: 'uncategorized' },
  { name: 'webstorm', icon: '💻', usageTime: '66h 53m', type: 'app', level: 'Global', rating: 'uncategorized' },
  { name: 'lay.google.com', icon: '🌐', usageTime: '47h 56m', type: 'web', level: 'Global', rating: 'uncategorized' },
  { name: 'knowledge.workspace.googl...', icon: '🌐', usageTime: '47h 56m', type: 'web', level: 'Global', rating: 'uncategorized' },
  { name: 'chatgpt.com', icon: '🌐', usageTime: '38h 12m', type: 'web', level: 'Global', rating: 'uncategorized' },
];

const reviewItems: ReviewItem[] = [
  { name: 'internal-hr.thinkingit.az', icon: '🌐', usageTime: '12h 30m', type: 'web', aiSuggestion: 'productive', confidence: 72, userDecision: 'productive' },
  { name: 'coolmath-games.com', icon: '🌐', usageTime: '8h 15m', type: 'web', aiSuggestion: 'unproductive', confidence: 81, userDecision: 'unproductive' },
  { name: 'custom-crm-tool', icon: '💻', usageTime: '45h 20m', type: 'app', aiSuggestion: 'productive', confidence: 55, userDecision: 'productive' },
  { name: 'prnt.sc', icon: '🌐', usageTime: '3h 10m', type: 'web', aiSuggestion: 'neutral', confidence: 62, userDecision: 'neutral' },
  { name: 'wetransfer.com', icon: '🌐', usageTime: '5h 44m', type: 'web', aiSuggestion: 'productive', confidence: 78, userDecision: 'productive' },
  { name: 'canva.com', icon: '🌐', usageTime: '22h 05m', type: 'web', aiSuggestion: 'productive', confidence: 85, userDecision: 'productive' },
  { name: 'twitch.tv', icon: '🌐', usageTime: '14h 38m', type: 'web', aiSuggestion: 'unproductive', confidence: 88, userDecision: 'unproductive' },
  { name: 'pastebin.com', icon: '🌐', usageTime: '2h 50m', type: 'web', aiSuggestion: 'neutral', confidence: 58, userDecision: 'neutral' },
  { name: 'temp-mail.org', icon: '🌐', usageTime: '1h 22m', type: 'web', aiSuggestion: 'unproductive', confidence: 69, userDecision: 'unproductive' },
  { name: 'excalidraw.com', icon: '🌐', usageTime: '6h 15m', type: 'web', aiSuggestion: 'productive', confidence: 74, userDecision: 'productive' },
  { name: 'loom.com', icon: '🌐', usageTime: '9h 30m', type: 'web', aiSuggestion: 'productive', confidence: 82, userDecision: 'productive' },
  { name: 'miro.com', icon: '🌐', usageTime: '18h 42m', type: 'web', aiSuggestion: 'productive', confidence: 86, userDecision: 'productive' },
];

export default function AppRatingsPage() {
  const [demoState, setDemoState] = useState<DemoState>('uncategorized');
  const [activeTab, setActiveTab] = useState<TabType>('uncategorized');
  const [wizardStep, setWizardStep] = useState<WizardStep>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingSteps, setProcessingSteps] = useState({
    matching: false,
    classifying: false,
    preparing: false,
  });
  const [reviewData, setReviewData] = useState<ReviewItem[]>(reviewItems);

  const tabCounts = {
    uncategorized: demoState === 'uncategorized' ? 1526 : 0,
    productive: demoState === 'uncategorized' ? 18 : 941,
    unproductive: demoState === 'uncategorized' ? 13 : 527,
    neutral: demoState === 'uncategorized' ? 0 : 89,
  };

  const openWizard = () => {
    setWizardStep(1);
    setProcessingProgress(0);
    setProcessingSteps({ matching: false, classifying: false, preparing: false });

    // Simulate processing
    setTimeout(() => {
      setProcessingProgress(33);
      setProcessingSteps({ matching: true, classifying: false, preparing: false });
    }, 800);

    setTimeout(() => {
      setProcessingProgress(66);
      setProcessingSteps({ matching: true, classifying: true, preparing: false });
    }, 1600);

    setTimeout(() => {
      setProcessingProgress(100);
      setProcessingSteps({ matching: true, classifying: true, preparing: true });
    }, 2400);

    setTimeout(() => {
      setWizardStep(2);
    }, 3000);
  };

  const closeWizard = () => {
    setWizardStep(null);
  };

  const finishWizard = () => {
    setWizardStep(3);
  };

  const completeWizard = () => {
    setDemoState('categorized');
    setActiveTab('productive');
    closeWizard();
  };

  const updateReviewDecision = (index: number, decision: 'productive' | 'unproductive' | 'neutral') => {
    const updated = [...reviewData];
    updated[index].userDecision = decision;
    updated[index].changed = decision !== updated[index].aiSuggestion;
    setReviewData(updated);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'productive': return '#22C55E';
      case 'unproductive': return '#F86060';
      case 'neutral': return '#F29937';
      default: return '#7A7A7E';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return '#22C55E';
    if (confidence >= 60) return '#F29937';
    return '#F86060';
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-primary overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border-card bg-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[20px] font-medium text-text-primary mb-1">
              App & Website Ratings Management
            </h1>
            <p className="text-[14px] text-text-secondary">
              Manage and categorize apps and websites to track team productivity.
            </p>
          </div>
          <div className="px-3 py-1.5 border border-border-default rounded-full text-[12px] font-medium text-text-primary">
            Company Ratings
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 border-b border-border-card bg-white">
        <div className="flex gap-6">
          {[
            { key: 'uncategorized' as TabType, label: 'Uncategorized', color: '#0C62F9', count: tabCounts.uncategorized },
            { key: 'productive' as TabType, label: 'Productive', color: '#22C55E', count: tabCounts.productive },
            { key: 'unproductive' as TabType, label: 'Unproductive', color: '#F86060', count: tabCounts.unproductive },
            { key: 'neutral' as TabType, label: 'Neutral', color: '#7A7A7E', count: tabCounts.neutral },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-primary-blue'
                  : 'border-transparent'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tab.color }}
              />
              <span className={`text-[14px] font-medium ${
                activeTab === tab.key ? 'text-text-primary' : 'text-text-secondary'
              }`}>
                {tab.label}
              </span>
              <span className="text-[14px] font-medium text-text-secondary">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* AI Warning Banner (only on uncategorized tab when count > 0) */}
        {activeTab === 'uncategorized' && demoState === 'uncategorized' && (
          <div className="mb-6 bg-gradient-to-r from-[#FFF9F2] to-[#FEF3C7] border border-[#FDE68A] rounded-[12px] p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-warning-amber/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning-amber" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#92400E] mb-1">
                  1,526 apps & websites are uncategorized
                </p>
                <p className="text-[13px] text-[#A16207]">
                  This affects the accuracy of all productivity metrics, reports, and alerts.
                </p>
              </div>
            </div>
            <button
              onClick={openWizard}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0C62F9] to-[#7C3AED] text-white text-[14px] font-medium rounded-[10px] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              Auto-Categorize with AI
            </button>
          </div>
        )}

        {/* Success Banner (after wizard completes) */}
        {demoState === 'categorized' && (
          <div className="mb-6 bg-bg-mint border border-success-green rounded-[8px] p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-success-green/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-green" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-text-primary">
                All apps categorized successfully. You can change any category manually at any time.
              </p>
            </div>
          </div>
        )}

        {/* Search Bar + Filter */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search apps and websites..."
              className="w-full h-[40px] pl-10 pr-4 border border-border-default rounded-[8px] text-[14px] text-text-primary placeholder:text-text-secondary focus:border-primary-blue focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 h-[40px] px-4 border border-border-default rounded-[8px] text-[14px] font-medium text-text-secondary hover:text-text-primary hover:border-border-card transition-colors">
            <Filter className="w-4 h-4" />
            All
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-border-card rounded-[12px] overflow-hidden shadow-card">
          <table className="w-full">
            <thead>
              <tr className="h-[44px] bg-bg-secondary border-b border-border-divider">
                <th className="w-12 px-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-border-default" />
                </th>
                <th className="px-4 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">
                  Resource Name
                </th>
                <th className="px-4 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">
                  Usage Time
                </th>
                <th className="px-4 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">
                  Type
                </th>
                <th className="px-4 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">
                  Categorization Level
                </th>
                <th className="px-4 text-left text-[12px] font-medium text-text-secondary uppercase tracking-wide">
                  Current Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {uncategorizedData.map((item, index) => (
                <tr key={index} className="h-[72px] border-b border-border-divider last:border-0 hover:bg-bg-tertiary transition-colors">
                  <td className="px-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-border-default" />
                  </td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px]">{item.icon}</span>
                      <span className="text-[14px] font-medium text-text-primary">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 text-[14px] text-text-secondary">{item.usageTime}</td>
                  <td className="px-4">
                    <span className="text-[12px] text-text-secondary capitalize">{item.type}</span>
                  </td>
                  <td className="px-4 text-[14px] text-text-secondary">{item.level}</td>
                  <td className="px-4">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-border-default rounded-[6px] hover:bg-bg-tertiary transition-colors">
                      <span className="w-2 h-2 rounded-full bg-text-secondary" />
                      <span className="text-[14px] text-text-secondary capitalize">{item.rating}</span>
                      <ChevronDown className="w-4 h-4 text-text-secondary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Demo Controls */}
        <div className="mt-8 flex items-center gap-2">
          <div className="inline-flex bg-bg-secondary border border-border-card rounded-[8px] p-0.5">
            <button
              onClick={openWizard}
              className="px-3 py-1.5 text-[12px] font-medium rounded-[6px] text-text-secondary hover:text-text-primary transition-colors"
            >
              Open Wizard
            </button>
            <button
              onClick={() => setDemoState(demoState === 'uncategorized' ? 'categorized' : 'uncategorized')}
              className="px-3 py-1.5 text-[12px] font-medium rounded-[6px] text-text-secondary hover:text-text-primary transition-colors"
            >
              {demoState === 'uncategorized' ? 'Show Categorized State' : 'Reset to Uncategorized'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Wizard Modal */}
      {wizardStep !== null && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-[16px] shadow-2xl max-w-[780px] w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-8 py-6 border-b border-border-divider">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-[18px] font-bold text-text-primary flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-blue" />
                    Auto-Categorize Apps & Websites
                  </h2>
                  <p className="text-[14px] text-text-secondary mt-1">
                    {wizardStep === 1 && 'AI is analyzing your apps and websites...'}
                    {wizardStep === 2 && 'Review and approve AI suggestions'}
                    {wizardStep === 3 && 'Categorization complete!'}
                  </p>
                </div>
                <button
                  onClick={closeWizard}
                  className="p-1 hover:bg-bg-tertiary rounded transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-all ${
                        wizardStep > step
                          ? 'bg-success-green text-white'
                          : wizardStep === step
                          ? 'bg-primary-blue text-white'
                          : 'bg-[#E2E8F0] text-text-secondary'
                      }`}
                    >
                      {wizardStep > step ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-16 h-0.5 mx-1 ${
                          wizardStep > step ? 'bg-success-green' : 'bg-[#E2E8F0]'
                        }`}
                      />
                    )}
                  </div>
                ))}
                <div className="ml-3 flex gap-6 text-[12px]">
                  <span className={wizardStep >= 1 ? 'text-text-primary font-medium' : 'text-text-secondary'}>
                    Processing
                  </span>
                  <span className={wizardStep >= 2 ? 'text-text-primary font-medium' : 'text-text-secondary'}>
                    Review
                  </span>
                  <span className={wizardStep >= 3 ? 'text-text-primary font-medium' : 'text-text-secondary'}>
                    Done
                  </span>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-auto p-8">
              {/* STEP 1 - Processing */}
              {wizardStep === 1 && (
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] font-medium text-text-primary">Processing...</span>
                      <span className="text-[14px] font-medium text-primary-blue">{processingProgress}%</span>
                    </div>
                    <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0C62F9] to-[#7C3AED] transition-all duration-500"
                        style={{ width: `${processingProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {processingSteps.matching ? (
                        <CheckCircle className="w-5 h-5 text-success-green" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
                      )}
                      <span className="text-[14px] text-text-primary">
                        Matching against known database...
                        {processingSteps.matching && (
                          <span className="text-success-green font-medium"> ✓ 1,068 matched</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {processingSteps.classifying ? (
                        <CheckCircle className="w-5 h-5 text-success-green" />
                      ) : processingSteps.matching ? (
                        <div className="w-5 h-5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-[#E2E8F0] rounded-full" />
                      )}
                      <span className="text-[14px] text-text-primary">
                        Classifying remaining apps...
                        {processingSteps.classifying && (
                          <span className="text-success-green font-medium"> ✓ 316 classified</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {processingSteps.preparing ? (
                        <CheckCircle className="w-5 h-5 text-success-green" />
                      ) : processingSteps.classifying ? (
                        <div className="w-5 h-5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-[#E2E8F0] rounded-full" />
                      )}
                      <span className="text-[14px] text-text-primary">Preparing review...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 - Review */}
              {wizardStep === 2 && (
                <div className="space-y-6">
                  {/* Summary Card */}
                  <div className="bg-bg-mint border border-success-green rounded-[8px] p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-success-green" />
                      <span className="text-[14px] font-bold text-text-primary">
                        1,384 auto-applied (confidence ≥ 90%)
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[12px] ml-8">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-success-green" />
                        812 Productive
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F86060' }} />
                        489 Unproductive
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-warning-amber" />
                        83 Neutral
                      </span>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="flex items-center justify-between p-4 bg-[#FFF9F2] border border-[#FDE68A] rounded-[8px]">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-warning-amber" />
                      <span className="text-[14px] font-medium text-text-primary">
                        12 items need review
                        <span className="text-text-secondary ml-2">confidence &lt; 90%</span>
                      </span>
                    </div>
                    <button className="text-[12px] font-medium text-primary-blue hover:text-[#0A56E0] transition-colors">
                      Accept All AI Suggestions
                    </button>
                  </div>

                  {/* Review Table */}
                  <div className="border border-border-card rounded-[8px] overflow-hidden">
                    <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-bg-secondary">
                          <tr className="h-[44px] border-b border-border-divider">
                            <th className="px-4 text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide">
                              Resource Name
                            </th>
                            <th className="px-4 text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide">
                              Usage Time
                            </th>
                            <th className="px-4 text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide">
                              Type
                            </th>
                            <th className="px-4 text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide">
                              AI Suggests
                            </th>
                            <th className="px-4 text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide">
                              Confidence
                            </th>
                            <th className="px-4 text-left text-[11px] font-medium text-text-secondary uppercase tracking-wide">
                              Your Decision
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviewData.map((item, index) => (
                            <tr
                              key={index}
                              className={`h-[60px] border-b border-border-divider last:border-0 transition-colors ${
                                item.changed ? 'bg-[#FFF9F2]' : 'bg-white hover:bg-bg-tertiary'
                              }`}
                            >
                              <td className="px-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px]">{item.icon}</span>
                                  <span className="text-[13px] font-medium text-text-primary">{item.name}</span>
                                </div>
                              </td>
                              <td className="px-4 text-[13px] text-text-secondary">{item.usageTime}</td>
                              <td className="px-4 text-[12px] text-text-secondary capitalize">{item.type}</td>
                              <td className="px-4">
                                <span
                                  className="inline-flex px-2 py-1 rounded-full text-[11px] font-medium capitalize"
                                  style={{
                                    backgroundColor: `${getRatingColor(item.aiSuggestion)}20`,
                                    color: getRatingColor(item.aiSuggestion),
                                  }}
                                >
                                  {item.aiSuggestion}
                                </span>
                              </td>
                              <td className="px-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full"
                                      style={{
                                        width: `${item.confidence}%`,
                                        backgroundColor: getConfidenceColor(item.confidence),
                                      }}
                                    />
                                  </div>
                                  <span className="text-[12px] font-medium text-text-secondary w-8">
                                    {item.confidence}%
                                  </span>
                                </div>
                              </td>
                              <td className="px-4">
                                <select
                                  value={item.userDecision}
                                  onChange={(e) => updateReviewDecision(index, e.target.value as any)}
                                  className="px-3 py-1.5 border border-border-default rounded-[6px] text-[13px] font-medium capitalize focus:border-primary-blue focus:outline-none"
                                  style={{ color: getRatingColor(item.userDecision) }}
                                >
                                  <option value="productive">● Productive</option>
                                  <option value="unproductive">● Unproductive</option>
                                  <option value="neutral">● Neutral</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 - Done */}
              {wizardStep === 3 && (
                <div className="text-center space-y-8 py-8">
                  {/* Animated Success Checkmark */}
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22C55E] to-[#10B981] flex items-center justify-center animate-scale-in shadow-lg">
                      <CheckCircle2 size={40} className="text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-[24px] font-bold text-text-primary mb-2">
                      All 1,526 apps categorized!
                    </h3>
                    <p className="text-[14px] text-text-secondary">
                      Productivity metrics are now calculated with complete data.
                    </p>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {/* Productive Card */}
                    <div className="bg-[#F0FDF4] border-l-[3px] border-success-green rounded-[12px] p-5 shadow-sm animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={20} className="text-success-green" />
                      </div>
                      <div className="text-[28px] font-bold text-success-green mb-1">923</div>
                      <div className="text-[13px] text-text-primary font-medium">Productive</div>
                    </div>

                    {/* Unproductive Card */}
                    <div className="bg-[#FEF2F2] border-l-[3px] rounded-[12px] p-5 shadow-sm animate-fade-in-up" style={{ borderLeftColor: '#F86060', animationDelay: '100ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle size={20} style={{ color: '#F86060' }} />
                      </div>
                      <div className="text-[28px] font-bold mb-1" style={{ color: '#F86060' }}>514</div>
                      <div className="text-[13px] text-text-primary font-medium">Unproductive</div>
                    </div>

                    {/* Neutral Card */}
                    <div className="bg-[#FFF9F2] border-l-[3px] border-warning-amber rounded-[12px] p-5 shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <MinusCircle size={20} className="text-warning-amber" />
                      </div>
                      <div className="text-[28px] font-bold text-warning-amber mb-1">89</div>
                      <div className="text-[13px] text-text-primary font-medium">Neutral</div>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="max-w-2xl mx-auto space-y-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-success-green animate-progress-fill"
                        style={{ width: '60.5%', animationDelay: '400ms' }}
                      />
                      <div
                        className="h-full animate-progress-fill"
                        style={{ width: '33.7%', backgroundColor: '#F86060', animationDelay: '500ms' }}
                      />
                      <div
                        className="h-full bg-warning-amber animate-progress-fill"
                        style={{ width: '5.8%', animationDelay: '600ms' }}
                      />
                    </div>
                    <p className="text-[12px] text-text-secondary">
                      60.5% Productive · 33.7% Unproductive · 5.8% Neutral
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-border-divider flex items-center justify-between">
              {wizardStep === 1 && (
                <>
                  <div />
                  <button
                    onClick={closeWizard}
                    className="px-4 py-2 border border-border-default rounded-[8px] text-[14px] font-medium text-text-secondary hover:text-text-primary hover:border-border-card transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              {wizardStep === 2 && (
                <>
                  <button
                    onClick={closeWizard}
                    className="px-4 py-2 text-[14px] font-medium text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={finishWizard}
                    className="px-5 py-2 bg-primary-blue text-white text-[14px] font-medium rounded-[8px] hover:bg-[#0A56E0] transition-colors"
                  >
                    Apply 12 & Finish
                  </button>
                </>
              )}
              {wizardStep === 3 && (
                <>
                  <button
                    onClick={closeWizard}
                    className="px-4 py-2 border border-border-default rounded-[8px] text-[14px] font-medium text-text-secondary hover:text-text-primary hover:border-border-card transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={completeWizard}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#0C62F9] to-[#7C3AED] text-white text-[14px] font-medium rounded-[8px] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                  >
                    View Results
                    <span>→</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
