// src/pages/SimulationPage.tsx
import React, { useState } from 'react';
import { api } from '../services/apiClient';
import type { SimulationInput, SimulationResult } from '../types';
import './SimulationPage.scss';

const defaultInput: SimulationInput = {
  revenueChangePct: 0,
  expenseChangePct: 0,
  dsoChangeDays: 0,
};

export const SimulationPage: React.FC = () => {
  const [input, setInput] = useState<SimulationInput>(defaultInput);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const r = await api.runSimulation(input);
      setResult(r);
    } catch (e) {
      console.error('Simulation error', e);
    } finally {
      setLoading(false);
    }
  }

  function onChange(field: keyof SimulationInput, value: number) {
    setInput((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <section className="simulation">
      <h2>Simulation Preview</h2>
      <p>Test quick scenarios before committing to a full forecast.</p>

      <div className="sim-grid">
        <div className="sim-inputs">
          <label>
            Revenue change (%)
            <input
              type="number"
              value={input.revenueChangePct}
              onChange={(e) => onChange('revenueChangePct', Number(e.target.value))}
            />
          </label>
          <label>
            Expense change (%)
            <input
              type="number"
              value={input.expenseChangePct}
              onChange={(e) => onChange('expenseChangePct', Number(e.target.value))}
            />
          </label>
          <label>
            DSO change (days)
            <input
              type="number"
              value={input.dsoChangeDays}
              onChange={(e) => onChange('dsoChangeDays', Number(e.target.value))}
            />
          </label>

          <button className="primary" onClick={run} disabled={loading}>
            {loading ? 'Running…' : 'Run Simulation'}
          </button>
        </div>

        <div className="sim-output">
          {result ? (
            <>
              <p>Horizon: {result.horizonMonths} months</p>
              <p>Projected minimum cash: ${result.projectedMinCash.toLocaleString()}</p>
              <p>Runway: {result.projectedRunwayDays} days</p>
            </>
          ) : (
            <p>No simulation yet. Configure inputs and run.</p>
          )}
        </div>
      </div>
    </section>
  );
};
