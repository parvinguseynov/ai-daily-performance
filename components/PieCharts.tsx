export function PieCharts() {
  const projects = [
    { name: 'StaffCo Dashboard', percentage: 35, color: '#0C62F9' },
    { name: 'Mobile App', percentage: 25, color: '#22C55E' },
    { name: 'API Development', percentage: 20, color: '#F29937' },
    { name: 'Client Portal', percentage: 12, color: '#7C3AED' },
    { name: 'Documentation', percentage: 8, color: '#F86060' },
  ];

  const categories = [
    { name: 'Productive', percentage: 58, color: '#22C55E' },
    { name: 'Unproductive', percentage: 8, color: '#F86060' },
    { name: 'Neutral', percentage: 24, color: '#7A7A7E' },
    { name: 'Uncategorized', percentage: 10, color: '#E0E0E0' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-2">
      {/* Top 5 Projects */}
      <div className="bg-bg-secondary rounded-card border border-border-default p-6 shadow-card h-[354px]">
        <h3 className="text-[14px] font-medium text-text-primary mb-4">Top 5 Projects</h3>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="transform -rotate-90" width="100%" height="100%">
              {(() => {
                let currentAngle = 0;
                return projects.map((project, idx) => {
                  const angle = (project.percentage / 100) * 360;
                  const startX = 80 + 70 * Math.cos((currentAngle * Math.PI) / 180);
                  const startY = 80 + 70 * Math.sin((currentAngle * Math.PI) / 180);
                  const endX = 80 + 70 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                  const endY = 80 + 70 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  const path = `M 80 80 L ${startX} ${startY} A 70 70 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
                  currentAngle += angle;
                  return (
                    <path key={idx} d={path} fill={project.color} />
                  );
                });
              })()}
              <circle cx="80" cy="80" r="50" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          {projects.map((project, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: project.color }} />
                <span className="text-[12px] text-text-primary">{project.name}</span>
              </div>
              <span className="text-[12px] font-medium text-text-primary">{project.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-bg-secondary rounded-card border border-border-default p-6 shadow-card h-[354px]">
        <h3 className="text-[14px] font-medium text-text-primary mb-4">Category Breakdown</h3>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="transform -rotate-90" width="100%" height="100%">
              {(() => {
                let currentAngle = 0;
                return categories.map((category, idx) => {
                  const angle = (category.percentage / 100) * 360;
                  const startX = 80 + 70 * Math.cos((currentAngle * Math.PI) / 180);
                  const startY = 80 + 70 * Math.sin((currentAngle * Math.PI) / 180);
                  const endX = 80 + 70 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                  const endY = 80 + 70 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  const path = `M 80 80 L ${startX} ${startY} A 70 70 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
                  currentAngle += angle;
                  return (
                    <path key={idx} d={path} fill={category.color} />
                  );
                });
              })()}
              <circle cx="80" cy="80" r="50" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          {categories.map((category, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: category.color }} />
                <span className="text-[12px] text-text-primary">{category.name}</span>
              </div>
              <span className="text-[12px] font-medium text-text-primary">{category.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
