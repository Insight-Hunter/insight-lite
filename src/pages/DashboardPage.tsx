// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { DashboardActions } from '../components/dashboard/DashboardActions';
import { CompanySnapshotCard } from '../components/dashboard/CompanySnapshot';
import { RecentActivityCard } from '../components/dashboard/RecentActivity';
import { api } from '../services/apiClient';
import type { CompanySnapshot, ActivityItem } from '../types';
import './DashboardPage.scss';

export const DashboardPage: React.FC = () => {
  const [company, setCompany] = useState<CompanySnapshot | undefined>();
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [c, a] = await Promise.all([api.getCompany(), api.getActivity()]);
        setCompany(c);
        setActivity(a);
      } catch (err) {
        console.error('Dashboard load error', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="dashboard">
      <DashboardActions />

      <div className="dashboard-lower">
        <CompanySnapshotCard company={company} />
        <RecentActivityCard items={activity} />
      </div>

      {loading && <div className="dashboard-loading">Loading…</div>}
    </section>
  );
};
