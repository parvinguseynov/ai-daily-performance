'use client';

interface User {
  initials: string;
  name: string;
  color: string;
  worked: string;
  workedProgress: number;
  productive: number;
  unproductive: number;
  neutral: number;
  idleTime: string;
  idlePercent: number;
  focus: number;
  manualTime: string;
  manualPercent: number;
  status: string;
  isOnline?: boolean;
}

const users: User[] = [
  {
    initials: 'EA',
    name: 'Eyyub Alakbarov',
    color: '#7C3AED',
    worked: '9h 58m',
    workedProgress: 83,
    productive: 81.59,
    unproductive: 0,
    neutral: 18.41,
    idleTime: '3h 19m',
    idlePercent: 33,
    focus: 100,
    manualTime: '0m',
    manualPercent: 0,
    status: '1m ago',
  },
  {
    initials: 'MF',
    name: 'Mirveli Fayazzade',
    color: '#F86060',
    worked: '8h 58m',
    workedProgress: 75,
    productive: 44.04,
    unproductive: 0,
    neutral: 55.96,
    idleTime: '7m',
    idlePercent: 1,
    focus: 45,
    manualTime: '0m',
    manualPercent: 0,
    status: 'Online',
    isOnline: true,
  },
  {
    initials: 'EM',
    name: 'Elshad Muradov',
    color: '#0C62F9',
    worked: '8h 7m',
    workedProgress: 68,
    productive: 24.81,
    unproductive: 0,
    neutral: 75.19,
    idleTime: '2h 4m',
    idlePercent: 26,
    focus: 33,
    manualTime: '0m',
    manualPercent: 0,
    status: '12m ago',
  },
  {
    initials: 'PC',
    name: 'Princess Coronel',
    color: '#F29937',
    worked: '3h 12m',
    workedProgress: 27,
    productive: 18.2,
    unproductive: 12.5,
    neutral: 69.3,
    idleTime: '5h 40m',
    idlePercent: 52,
    focus: 12,
    manualTime: '0m',
    manualPercent: 0,
    status: '3h ago',
  },
  {
    initials: 'RM',
    name: 'Ramiz Murshudov',
    color: '#22C55E',
    worked: '7h 30m',
    workedProgress: 63,
    productive: 65.5,
    unproductive: 5.2,
    neutral: 29.3,
    idleTime: '1h 15m',
    idlePercent: 17,
    focus: 78,
    manualTime: '0m',
    manualPercent: 0,
    status: 'Online',
    isOnline: true,
  },
];

function DonutChart({ percentage, size = 36 }: { percentage: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  let color = '#22C55E';
  if (percentage < 40) color = '#F86060';
  else if (percentage < 70) color = '#FFC53D';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width="100%" height="100%">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="#E0E0E0"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-medium text-text-primary">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}

export function UserTable() {
  return (
    <div className="bg-bg-secondary rounded-[8px] border border-border-card overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bg-tertiary border-b border-border-divider">
            <tr className="h-[44px]">
              <th className="px-6 py-3 text-left text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                USER
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                WORKED
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                PRODUCTIVITY
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                IDLE
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                FOCUS
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                MANUAL TIME
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-divider">
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="h-[72px] hover:bg-bg-tertiary transition-colors"
              >
                {/* User */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-[32px] h-[32px] rounded-full flex items-center justify-center text-text-white text-[12px] font-medium"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.initials}
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-[11px] h-[11px] bg-success-green border-2 border-bg-secondary rounded-full" />
                      )}
                    </div>
                    <span className="text-[12px] font-medium text-text-primary">{user.name}</span>
                  </div>
                </td>

                {/* Worked */}
                <td className="px-6 py-4">
                  <div className="space-y-1.5">
                    <div className="text-[12px] font-medium text-text-primary">{user.worked}</div>
                    <div className="w-24 bg-bg-tertiary rounded-full h-1">
                      <div
                        className="bg-primary-blue h-1 rounded-full"
                        style={{ width: `${user.workedProgress}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Productivity */}
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <div className="w-1.5 h-1.5 bg-success-green rounded-full" />
                        <div className="w-1.5 h-1.5 bg-danger-red rounded-full" />
                        <div className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
                      </div>
                      <span className="text-[12px] font-medium text-text-primary">
                        {user.productive.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-32 bg-bg-tertiary rounded-full h-1.5 flex overflow-hidden">
                      <div
                        className="bg-success-green"
                        style={{ width: `${user.productive}%` }}
                      />
                      <div
                        className="bg-danger-red"
                        style={{ width: `${user.unproductive}%` }}
                      />
                      <div
                        className="bg-text-secondary/30"
                        style={{ width: `${user.neutral}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Idle */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <DonutChart percentage={100 - user.idlePercent} size={36} />
                    <div>
                      <div className="text-[12px] font-medium text-text-primary">{user.idleTime}</div>
                      <div className="text-[10px] text-text-secondary">{user.idlePercent}%</div>
                    </div>
                  </div>
                </td>

                {/* Focus */}
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <DonutChart percentage={user.focus} size={36} />
                  </div>
                </td>

                {/* Manual Time */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <DonutChart percentage={user.manualPercent} size={36} />
                    <span className="text-[12px] font-medium text-text-primary">{user.manualTime}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {user.isOnline ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-success-green text-text-white">
                      Online
                    </span>
                  ) : (
                    <span className="text-[10px] text-text-secondary">{user.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
