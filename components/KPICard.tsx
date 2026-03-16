import { Clock, PenTool, Moon, Users, Calendar, Target } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: 'clock' | 'pen' | 'moon' | 'users' | 'calendar' | 'target';
  color?: string; // Keep for backwards compatibility but not used
}

const iconMap = {
  clock: Clock,
  pen: PenTool,
  moon: Moon,
  users: Users,
  calendar: Calendar,
  target: Target,
};

// Exact background colors from Figma specs
const iconBackgrounds = {
  clock: 'rgba(31, 113, 247, 0.1)', // Blue tint
  pen: 'rgba(139, 92, 246, 0.16)', // Purple tint
  moon: 'rgba(250, 162, 90, 0.1)', // Orange tint
  users: 'rgba(239, 68, 68, 0.16)', // Red tint
  calendar: 'rgba(6, 182, 212, 0.1)', // Teal tint
  target: 'rgba(236, 72, 153, 0.1)', // Pink tint
};

const iconColors = {
  clock: '#1F71F7',
  pen: '#8B5CF6',
  moon: '#FAA25A',
  users: '#EF4444',
  calendar: '#06B6D4',
  target: '#EC4899',
};

export function KPICard({ title, value, icon }: KPICardProps) {
  const Icon = iconMap[icon];
  const bgColor = iconBackgrounds[icon];
  const iconColor = iconColors[icon];

  return (
    <div className="h-[76px] bg-bg-secondary rounded-[8px] border border-border-card p-4 shadow-card transition-shadow flex items-center justify-between">
      <div>
        <div className="text-[12px] text-text-secondary mb-1">{title}</div>
        <div className="text-[24px] font-medium text-text-primary">{value}</div>
      </div>
      <div
        className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-[20px] h-[20px]" style={{ color: iconColor }} strokeWidth={2} />
      </div>
    </div>
  );
}
