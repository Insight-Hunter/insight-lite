import { useState, useEffect } from 'react';
import { Building2, DollarSign, Calendar, Briefcase, Save, CheckCircle } from 'lucide-react';
import type { BusinessInfo } from '../types';

export default function Settings() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    legalName: '',
    currency: 'USD',
    fiscalYearEnd: 'December 31',
    industry: '',
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('businessInfo');
    if (saved) {
      setBusinessInfo(JSON.parse(saved));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    localStorage.setItem('businessInfo', JSON.stringify(businessInfo));
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Consulting',
    'Real Estate',
    'Other',
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your business information and preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Information */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">Business Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Legal Business Name
              </label>
              <input
                type="text"
                value={businessInfo.legalName}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, legalName: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Industry
                </div>
              </label>
              <select
                value={businessInfo.industry}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, industry: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Financial Settings */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold text-slate-900">Financial Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Currency
              </label>
              <select
                value={businessInfo.currency}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, currency: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Fiscal Year End
                </div>
              </label>
              <input
                type="text"
                value={businessInfo.fiscalYearEnd}
                onChange={(e) =>
                  setBusinessInfo({ ...businessInfo, fiscalYearEnd: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="December 31"
              />
              <p className="text-sm text-slate-500 mt-1">
                Enter the month and day your fiscal year ends (e.g., "December 31" or "June 30")
              </p>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Notification Preferences</h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-medium text-slate-900">Cash Flow Alerts</p>
                <p className="text-sm text-slate-600">Get notified when cash flow drops below threshold</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-medium text-slate-900">Revenue Milestones</p>
                <p className="text-sm text-slate-600">Celebrate when you hit revenue targets</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-medium text-slate-900">Expense Warnings</p>
                <p className="text-sm text-slate-600">Alert when expenses exceed budget</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-medium text-slate-900">Weekly Reports</p>
                <p className="text-sm text-slate-600">Receive weekly summary emails</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          {saveStatus === 'saved' && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span>Settings saved successfully</span>
            </div>
          )}
          <button
            type="submit"
            disabled={saveStatus === 'saving'}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
