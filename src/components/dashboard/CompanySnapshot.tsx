// src/components/dashboard/CompanySnapshot.tsx
import React from 'react';
import type { CompanySnapshot } from '../../types';
import './CompanySnapshot.scss';

interface Props {
  company?: CompanySnapshot;
}

export const CompanySnapshotCard: React.FC<Props> = ({ company }) => {
  return (
    <div className="snapshot-card">
      <h2>Company Snapshot</h2>
      <div className="snapshot-grid">
        <div>
          <span className="label">Role</span>
          <span className="value">{company?.role ?? 'Treasurer'}</span>
        </div>
        <div>
          <span className="label">Domain</span>
          <span className="value">{company?.domain ?? 'Liquidity'}</span>
        </div>
        <div>
          <span className="label">Risk tolerance</span>
          <span className="value">{company?.riskTolerance ?? 'Moderate'}</span>
        </div>
        <div>
          <span className="label">Last report</span>
          <span className="value">
            {company?.lastReportDate ?? 'Dec 12'}{' '}
            <button className="link-btn" type="button">
              Download
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
