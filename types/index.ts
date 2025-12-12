// Shared TypeScript interfaces for Insight Hunter Lite

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface BusinessInfo {
  legalName: string;
  currency: string;
  fiscalYearEnd: string;
  industry: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface Forecast {
  id: string;
  userId: string;
  month: string;
  revenue: number;
  expenses: number;
  cashFlow: number;
  confidence: number;
}

export interface KPI {
  label: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface Report {
  id: string;
  title: string;
  type: 'pl' | 'balance' | 'cashflow';
  generatedAt: string;
  period: string;
  data: any;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  title: string;
  message: string;
  timestamp: string;
}
