import { useState } from 'react';
import { FileText, Download, Upload, CheckCircle } from 'lucide-react';
import { exportReportToPDF } from '../utils/pdfExport';
import type { Report } from '../types';

export default function Reports() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success'>('idle');
  const [generatedReports, setGeneratedReports] = useState<Report[]>([
    {
      id: 'r1',
      title: 'Q4 2025 Profit & Loss',
      type: 'pl',
      generatedAt: '2025-12-11T10:30:00Z',
      period: 'Oct - Dec 2025',
      data: {
        revenue: {
          'Product Sales': 85000,
          'Consulting Services': 42000,
          'Subscription Revenue': 18000,
        },
        expenses: {
          'Salaries': 51000,
          'Marketing': 19200,
          'Technology': 12600,
          'Operations': 16800,
          'Professional Services': 4500,
        },
        netProfit: 40900,
      },
    },
    {
      id: 'r2',
      title: 'November 2025 Cash Flow',
      type: 'cashflow',
      generatedAt: '2025-12-01T09:15:00Z',
      period: 'November 2025',
      data: {
        openingBalance: 45000,
        cashInflow: 38500,
        cashOutflow: 24800,
        closingBalance: 58700,
      },
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setUploadStatus('idle');
    }
  };

  const handleUpload = () => {
    if (csvFile) {
      // Mock CSV processing
      setTimeout(() => {
        setUploadStatus('success');
        // In a real app, parse CSV and generate report
        const newReport: Report = {
          id: `r${generatedReports.length + 1}`,
          title: `${csvFile.name} Analysis`,
          type: 'pl',
          generatedAt: new Date().toISOString(),
          period: 'Custom Period',
          data: {
            revenue: { 'CSV Import': 0 },
            expenses: { 'CSV Import': 0 },
            netProfit: 0,
          },
        };
        setGeneratedReports([newReport, ...generatedReports]);
      }, 1500);
    }
  };

  const handleDownload = (report: Report) => {
    exportReportToPDF(report);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600 mt-1">Generate and download financial reports</p>
      </div>

      {/* CSV Upload Section */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-900">Upload CSV Data</h2>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Upload bank transactions, P&L, or balance sheet CSVs to generate automated AI-powered reports.
        </p>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-medium text-slate-900 mb-1">Click to upload CSV</p>
              <p className="text-sm text-slate-600">
                Supports bank transactions, P&L statements, and balance sheets
              </p>
            </label>
          </div>

          {csvFile && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-slate-900">{csvFile.name}</p>
                  <p className="text-sm text-slate-600">{(csvFile.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800">Report generated successfully!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Generate */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Generate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <FileText className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-slate-900">P&L Statement</p>
            <p className="text-sm text-slate-600 mt-1">Generate current period P&L</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <FileText className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium text-slate-900">Balance Sheet</p>
            <p className="text-sm text-slate-600 mt-1">Current financial position</p>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <FileText className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-slate-900">Cash Flow</p>
            <p className="text-sm text-slate-600 mt-1">Cash movement analysis</p>
          </button>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Generated Reports</h2>
        <div className="space-y-3">
          {generatedReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{report.title}</p>
                  <p className="text-sm text-slate-600">
                    {report.period} • Generated {new Date(report.generatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(report)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Format Info */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold text-slate-900 mb-2">CSV Format Requirements</h3>
        <p className="text-sm text-slate-600 mb-3">
          Your CSV file should include the following columns for best results:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-slate-700">Date (YYYY-MM-DD)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-slate-700">Description</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-slate-700">Amount (numeric)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-slate-700">Category</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-slate-700">Type (income/expense)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
