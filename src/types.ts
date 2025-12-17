// src/types.ts
export interface CompanySnapshot {
  name: string;
  role: string;
  domain: string;
  riskTolerance: string;
  lastReportDate: string;
}

export interface ActivityItem {
  id: number | string;
  label: string;
  status: 'complete' | 'pending' | 'error';
}

export interface ReportSummary {
  id: string;
  name: string;
  createdAt: string;
  status: 'ready' | 'generating' | 'error';
}

export interface SimulationInput {
  revenueChangePct: number;
  expenseChangePct: number;
  dsoChangeDays: number;
}

export interface SimulationResult extends SimulationInput {
  horizonMonths: number;
  projectedMinCash: number;
  projectedRunwayDays: number;
}
