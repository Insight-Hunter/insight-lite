import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, Sparkles } from 'lucide-react';
import { mockKPIs, mockAlerts, monthlyRevenueData, expenseBreakdown, aiInsights } from '../utils/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's your financial overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">Last updated</p>
          <p className="font-medium text-slate-900">December 11, 2025</p>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold mb-2">AI-Generated Insights</h2>
            <ul className="space-y-2">
              {aiInsights.map((insight, idx) => (
                <li key={idx} className="text-sm text-blue-50 flex items-start gap-2">
                  <span className="text-blue-200 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">{kpi.label}</p>
              <DollarSign className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-2">{kpi.value}</p>
            <div className="flex items-center gap-1">
              {kpi.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : kpi.trend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-red-600" />
              ) : null}
              <span
                className={`text-sm ${
                  kpi.trend === 'up'
                    ? 'text-green-600'
                    : kpi.trend === 'down'
                    ? 'text-red-600'
                    : 'text-slate-600'
                }`}
              >
                {kpi.change > 0 ? '+' : ''}{kpi.change}%
              </span>
              <span className="text-sm text-slate-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              <Bar dataKey="expenses" fill="#8b5cf6" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${((entry.value / expenseBreakdown.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Alerts & Notifications</h2>
        <div className="space-y-3">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-4 rounded-lg border ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : alert.type === 'success'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'warning'
                    ? 'text-yellow-600'
                    : alert.type === 'success'
                    ? 'text-green-600'
                    : 'text-blue-600'
                }`}
              />
              <div className="flex-1">
                <p className="font-medium text-slate-900">{alert.title}</p>
                <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
              </div>
              <p className="text-xs text-slate-500">
                {new Date(alert.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
