// src/components/dashboard/RecentActivity.tsx
import React from 'react';
import type { ActivityItem } from '../../types';
import './RecentActivity.scss';

interface Props {
  items: ActivityItem[];
}

export const RecentActivityCard: React.FC<Props> = ({ items }) => (
  <div className="activity-card">
    <h2>Recent Activity</h2>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <span className={`status-dot status-${item.status}`} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  </div>
);
