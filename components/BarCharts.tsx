export function BarCharts() {
  const topUsers = [
    { initials: 'EA', name: 'Eyyub Alakbarov', hours: 9.97, color: '#7C3AED' },
    { initials: 'MF', name: 'Mirveli Fayazzade', hours: 8.97, color: '#F86060' },
    { initials: 'EM', name: 'Elshad Muradov', hours: 8.12, color: '#0C62F9' },
    { initials: 'RM', name: 'Ramiz Murshudov', hours: 7.5, color: '#22C55E' },
    { initials: 'PC', name: 'Princess Coronel', hours: 3.2, color: '#F29937' },
  ];

  const topApps = [
    { name: 'VS Code', hours: 24.5, color: '#0C62F9' },
    { name: 'Chrome', hours: 18.2, color: '#22C55E' },
    { name: 'Figma', hours: 12.8, color: '#F29937' },
    { name: 'Slack', hours: 8.4, color: '#7C3AED' },
    { name: 'Notion', hours: 6.1, color: '#F86060' },
  ];

  const maxUserHours = Math.max(...topUsers.map(u => u.hours));
  const maxAppHours = Math.max(...topApps.map(a => a.hours));

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Top 5 Users */}
      <div className="bg-bg-secondary rounded-card border border-border-default p-6 shadow-card h-[264px]">
        <h3 className="text-[14px] font-medium text-text-primary mb-4">Top 5 Users by Worked Hours</h3>
        <div className="space-y-3">
          {topUsers.map((user, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-text-white text-[10px] font-medium flex-shrink-0"
                style={{ backgroundColor: user.color }}
              >
                {user.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-text-primary">{user.name}</span>
                  <span className="text-[10px] font-medium text-text-primary">{user.hours}h</span>
                </div>
                <div className="w-full bg-bg-tertiary rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${(user.hours / maxUserHours) * 100}%`,
                      backgroundColor: user.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Apps/Sites */}
      <div className="bg-bg-secondary rounded-card border border-border-default p-6 shadow-card h-[264px]">
        <h3 className="text-[14px] font-medium text-text-primary mb-4">Top 5 Apps/Sites</h3>
        <div className="space-y-3">
          {topApps.map((app, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-[24px] h-[24px] rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: app.color + '20' }}
              >
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: app.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-text-primary">{app.name}</span>
                  <span className="text-[10px] font-medium text-text-primary">{app.hours}h</span>
                </div>
                <div className="w-full bg-bg-tertiary rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${(app.hours / maxAppHours) * 100}%`,
                      backgroundColor: app.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
