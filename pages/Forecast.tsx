import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { mockForecasts } from '../utils/mockData';

export default function Forecast() {
  const avgConfidence = mockForecasts.reduce((acc, f) => acc + f.confidence, 0) / mockForecasts.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Financial Forecast</h1>
        <p className="text-slate-600 mt-1">AI-powered predictions for the next 6 months</p>
      </div>

      {/* Confidence Score */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Forecast Confidence</h2>
            </div>
            <p className="text-purple-100">
              Our AI model is {avgConfidence.toFixed(0)}% confident in these predictions based on historical data and market trends.
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{avgConfidence.toFixed(0)}%</div>
            <div className="text-sm text-purple-100">Avg. Confidence</div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <p className="text-sm text-slate-600">Projected Revenue (6mo)</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${mockForecasts.reduce((acc, f) => acc + f.revenue, 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <p className="text-sm text-slate-600">Projected Expenses (6mo)</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${mockForecasts.reduce((acc, f) => acc + f.expenses, 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-slate-600">Net Cash Flow (6mo)</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${mockForecasts.reduce((acc, f) => acc + f.cashFlow, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Revenue & Expenses Forecast */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue & Expenses Forecast</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={mockForecasts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Revenue"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              name="Expenses"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="cashFlow"
              stroke="#10b981"
              strokeWidth={2}
              name="Cash Flow"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Confidence by Month */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Forecast Confidence by Month</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mockForecasts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="confidence" fill="#8b5cf6" name="Confidence %" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-slate-600 mt-4">
          * Confidence decreases for longer-term forecasts due to increased market uncertainty
        </p>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Monthly Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Month</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Expenses</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Cash Flow</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {mockForecasts.map((forecast) => (
                <tr key={forecast.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-900">{forecast.month}</td>
                  <td className="py-3 px-4 text-right text-slate-900">
                    ${forecast.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-900">
                    ${forecast.expenses.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">
                    ${forecast.cashFlow.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {forecast.confidence}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
