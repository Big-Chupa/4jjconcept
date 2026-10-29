import React from 'react';
import { CheckCheck, GraduationCap, Users2, Clock4 } from 'lucide-react';
import './StatsBar.css';

const StatsBar = () => {
  const stats = [
    {
      icon: <GraduationCap size={28} className="stat-icon" />,
      number: '500+',
      label: 'Projects Analyzed',
      sub: 'B.Sc, M.Sc & Ph.D Level',
      color: 'emerald'
    },
    {
      icon: <CheckCheck size={28} className="stat-icon" />,
      number: '99.4%',
      label: 'Defense Approval',
      sub: 'Guaranteed Supervisor Clearance',
      color: 'cyan'
    },
    {
      icon: <Users2 size={28} className="stat-icon" />,
      number: '15+',
      label: 'Expert Analysts',
      sub: 'Statisticians & Methodologists',
      color: 'gold'
    },
    {
      icon: <Clock4 size={28} className="stat-icon" />,
      number: '24/7',
      label: 'Active Support',
      sub: 'Direct WhatsApp Consultation',
      color: 'rose'
    }
  ];

  return (
    <div className="stats-bar-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card stat-${stat.color}`}>
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-details">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-sub">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
