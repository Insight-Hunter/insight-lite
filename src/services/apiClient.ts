// src/services/apiClient.ts
import type {
  CompanySnapshot,
  ActivityItem,
  ReportSummary,
  SimulationInput,
  SimulationResult,
} from '../types';

const API_BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return (await res.json()) as T;
}

export const api = {
  getCompany: () => request<CompanySnapshot>('/company'),
  getActivity: () => request<ActivityItem[]>('/activity'),
  getReports: () => request<ReportSummary[]>('/reports'),
  runSimulation: (payload: SimulationInput) =>
    request<SimulationResult>('/simulations', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
