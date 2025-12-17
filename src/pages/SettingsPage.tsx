// src/pages/SettingsPage.tsx
import React from 'react';
import './SettingsPage.scss';

export const SettingsPage: React.FC = () => {
  return (
    <section className="settings">
      <h2>Settings</h2>
      <p>Manage your Lite AFP preferences.</p>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Risk tolerance</h3>
          <select defaultValue="moderate">
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>

        <div className="settings-card">
          <h3>Upgrade</h3>
          <p>Need automation, multi-entity, and deeper analytics?</p>
          <a
            className="primary-link"
            href="https://app.insighthunter.app"
            target="_blank"
            rel="noreferrer"
          >
            View paid plans
          </a>
        </div>
      </div>
    </section>
  );
};
