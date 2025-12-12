import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, AlertCircle, PieChart } from 'lucide-react';
import { monthlyRevenueData, expenseBreakdown } from '../utils/mockData';

export default function Summary() {
  const totalRevenue = monthlyRevenueData.reduce((acc, d) => acc + d.revenue, 0);
  const totalExpenses = monthlyRevenueData.reduce((acc, d) => acc + d.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Financial Summary</h1>
        <p className="text-slate-600 mt-1">High-level overview of your financial performance</p>
      </div>

      {/* Executive Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl p-8 text-white">
        <h2 className="text-xl font-semibold mb-6">Executive Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-slate-300 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-slate-300 text-sm mb-1">Total Expenses</p>
            <p className="text-3xl font-bold">${totalExpenses.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-slate-300 text-sm mb-1">Net Profit</p>
            <p className="text-3xl font-bold text-green-400">${netProfit.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-slate-300 text-sm mb-1">Profit Margin</p>
            <p className="text-3xl font-bold">{profitMargin}%</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              +12.5%
            </span>
          </div>
          <p className="text-sm text-slate-600">Avg Monthly Revenue</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            ${(totalRevenue / monthlyRevenueData.length).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              +8.3%
            </span>
          </div>
          <p className="text-sm text-slate-600">Growth Rate</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">15.8%</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
              +5.2%
            </span>
          </div>
          <p className="text-sm text-slate-600">Avg Monthly Expenses</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            ${(totalExpenses / monthlyRevenueData.length).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              Healthy
            </span>
          </div>
          <p className="text-sm text-slate-600">Expense Ratio</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {((totalExpenses / totalRevenue) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend (6 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyRevenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Categories */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Expense Categories</h2>
        <div className="space-y-4">
          {expenseBreakdown.map((expense, idx) => {
            const total = expenseBreakdown.reduce((acc, e) => acc + e.value, 0);
            const percentage = ((expense.value / total) * 100).toFixed(1);
            return (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">{expense.name}</span>
                  <span className="text-slate-600">${expense.value.toLocaleString()} ({percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: expense.fill,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Key Insights</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-slate-900">Strong Revenue Growth</p>
              <p className="text-sm text-slate-600 mt-1">
                Revenue has increased by 15.8% over the past 6 months, indicating strong business momentum.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-slate-900">Healthy Profit Margins</p>
              <p className="text-sm text-slate-600 mt-1">
                Your profit margin of {profitMargin}% is above industry average, showing efficient cost management.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2" />
            <div>
              <p className="font-medium text-slate-900">Monitor Expense Growth</p>
              <p className="text-sm text-slate-600 mt-1">
                Expenses have grown 5.2% this period. Consider reviewing discretionary spending to maintain margins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
