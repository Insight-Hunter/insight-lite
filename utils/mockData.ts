import type { Transaction, Forecast, KPI, Alert, ChartData } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-12-01',
    description: 'Client Payment - Website Development',
    amount: 5000,
    category: 'Revenue',
    type: 'income',
  },
  {
    id: '2',
    date: '2025-12-03',
    description: 'Office Supplies',
    amount: -250,
    category: 'Operating Expenses',
    type: 'expense',
  },
  {
    id: '3',
    date: '2025-12-05',
    description: 'Software Subscriptions',
    amount: -299,
    category: 'Technology',
    type: 'expense',
  },
  {
    id: '4',
    date: '2025-12-07',
    description: 'Consulting Services',
    amount: 3500,
    category: 'Revenue',
    type: 'income',
  },
  {
    id: '5',
    date: '2025-12-10',
    description: 'Marketing Campaign',
    amount: -1200,
    category: 'Marketing',
    type: 'expense',
  },
];

export const mockForecasts: Forecast[] = [
  {
    id: 'f1',
    userId: 'user-1',
    month: 'Jan 2026',
    revenue: 45000,
    expenses: 28000,
    cashFlow: 17000,
    confidence: 85,
  },
  {
    id: 'f2',
    userId: 'user-1',
    month: 'Feb 2026',
    revenue: 48000,
    expenses: 29500,
    cashFlow: 18500,
    confidence: 82,
  },
  {
    id: 'f3',
    userId: 'user-1',
    month: 'Mar 2026',
    revenue: 52000,
    expenses: 31000,
    cashFlow: 21000,
    confidence: 78,
  },
  {
    id: 'f4',
    userId: 'user-1',
    month: 'Apr 2026',
    revenue: 55000,
    expenses: 32500,
    cashFlow: 22500,
    confidence: 75,
  },
  {
    id: 'f5',
    userId: 'user-1',
    month: 'May 2026',
    revenue: 58000,
    expenses: 34000,
    cashFlow: 24000,
    confidence: 72,
  },
  {
    id: 'f6',
    userId: 'user-1',
    month: 'Jun 2026',
    revenue: 62000,
    expenses: 35500,
    cashFlow: 26500,
    confidence: 70,
  },
];

export const mockKPIs: KPI[] = [
  {
    label: 'Total Revenue',
    value: '$42,350',
    change: 12.5,
    trend: 'up',
  },
  {
    label: 'Total Expenses',
    value: '$18,230',
    change: -5.2,
    trend: 'down',
  },
  {
    label: 'Net Profit',
    value: '$24,120',
    change: 8.3,
    trend: 'up',
  },
  {
    label: 'Cash Flow',
    value: '$32,890',
    change: 15.7,
    trend: 'up',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    type: 'warning',
    title: 'Cash Flow Alert',
    message: 'Projected cash flow may drop below $15,000 in March 2026',
    timestamp: '2025-12-10T10:30:00Z',
  },
  {
    id: 'a2',
    type: 'info',
    title: 'Expense Trend',
    message: 'Marketing expenses increased by 25% this month',
    timestamp: '2025-12-09T14:20:00Z',
  },
  {
    id: 'a3',
    type: 'success',
    title: 'Revenue Milestone',
    message: 'You\'ve reached 85% of your quarterly revenue target',
    timestamp: '2025-12-08T09:15:00Z',
  },
];

export const monthlyRevenueData: ChartData[] = [
  { name: 'Jul', revenue: 35000, expenses: 22000 },
  { name: 'Aug', revenue: 38000, expenses: 24000 },
  { name: 'Sep', revenue: 36500, expenses: 23500 },
  { name: 'Oct', revenue: 41000, expenses: 25000 },
  { name: 'Nov', revenue: 39500, expenses: 24800 },
  { name: 'Dec', revenue: 42350, expenses: 18230 },
];

export const expenseBreakdown: ChartData[] = [
  { name: 'Salaries', value: 8500, fill: '#3b82f6' },
  { name: 'Marketing', value: 3200, fill: '#8b5cf6' },
  { name: 'Technology', value: 2100, fill: '#06b6d4' },
  { name: 'Operations', value: 2800, fill: '#10b981' },
  { name: 'Other', value: 1630, fill: '#f59e0b' },
];

export const aiInsights = [
  'Revenue increased 12.5% compared to last month, driven by new client acquisitions.',
  'Marketing expenses are trending upward. Consider reviewing campaign ROI.',
  'Cash reserves are healthy at $32,890, providing 6+ months of runway.',
  'Q4 performance is on track to exceed targets by 8.3%.',
];

export function generateMockCSVData(): string {
  return `Date,Description,Amount,Category,Type
2025-11-01,Client Payment - App Development,8500,Revenue,income
2025-11-03,Cloud Hosting,450,Technology,expense
2025-11-05,Freelance Designer,1200,Operating Expenses,expense
2025-11-08,Consulting Services,4200,Revenue,income
2025-11-10,Marketing Ads,800,Marketing,expense
2025-11-15,Client Payment - Website,3500,Revenue,income
2025-11-18,Office Rent,2200,Operating Expenses,expense
2025-11-22,Software Licenses,350,Technology,expense
2025-11-25,Retainer Payment,5000,Revenue,income
2025-11-28,Legal Fees,750,Professional Services,expense`;
}
