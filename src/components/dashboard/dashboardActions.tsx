// src/components/dashboard/DashboardActions.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardActions.scss';

export const DashboardActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dh-actions">
      <button onClick={() => navigate('/onboarding')} className="dh-action-card">
        <div className="dh-icon">✏️</div>
        <span className="dh-label">Start Wizard</span>
      </button>

      <button onClick={() => navigate('/reports')} className="dh-action-card">
        <div className="dh-icon">📄</div>
        <span className="dh-label">View Reports</span>
      </button>

      <button onClick={() => navigate('/simulation')} className="dh-action-card">
        <div className="dh-icon">📈</div>
        <span className="dh-label">Simulation Preview</span>
      </button>
    </div>
  );
};
