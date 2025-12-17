// src/components/layout/AppLayout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AppLayout.scss';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-primary">INSIGHT</span>
          <span className="logo-accent">HUNTER</span>
        </div>
        <div className="app-header-right">
          <span className="tier-pill">Lite AFP</span>
          <button className="avatar-btn" aria-label="Account">
            <span className="avatar-icon">👤</span>
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="app-card">
          <div className="app-card-header">
            <div>
              <h1>Welcome to InsightHunter</h1>
              <p>Your enterprise financial nervous system.</p>
            </div>
            <nav className="app-nav">
              <Link
                to="/dashboard"
                className={location.pathname.startsWith('/dashboard') ? 'active' : ''}
              >
                Dashboard
              </Link>
              <Link
                to="/reports"
                className={location.pathname.startsWith('/reports') ? 'active' : ''}
              >
                Reports
              </Link>
              <Link
                to="/simulation"
                className={location.pathname.startsWith('/simulation') ? 'active' : ''}
              >
                Simulation
              </Link>
              <Link
                to="/settings"
                className={location.pathname.startsWith('/settings') ? 'active' : ''}
              >
                Settings
              </Link>
            </nav>
          </div>

          {children}

          <footer className="app-footer">
            <a href="https://docs.insighthunter.app" target="_blank" rel="noreferrer">
              Docs
            </a>
            <a href="mailto:support@insighthunter.app">Support</a>
            <a href="/admin">Admin</a>
          </footer>
        </div>
      </main>
    </div>
  );
};
