/**
 * API Router for Insight Hunter Lite
 * Handles routing to different API endpoints
 */
// workers/router.ts

import type { Env } from './index';

export class Router {
  constructor(private env: Env) {}

  async handle(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/api/company') {
      return this.company();
    }

    if (request.method === 'GET' && url.pathname === '/api/activity') {
      return this.activity();
    }

    if (request.method === 'GET' && url.pathname === '/api/reports') {
      return this.reports();
    }

    if (request.method === 'POST' && url.pathname === '/api/simulations') {
      return this.simulation(request);
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private async company(): Promise<Response> {
    // Stub – replace with DB/D1 later
    const data = {
      name: 'Acme Liquidity Co.',
      role: 'Treasurer',
      domain: 'Liquidity',
      riskTolerance: 'Moderate',
      lastReportDate: 'Dec 12',
    };
    return Response.json(data);
  }

  private async activity(): Promise<Response> {
    const data = [
      { id: 1, label: 'Quiz submitted', status: 'complete' },
      { id: 2, label: 'Preview seeded', status: 'complete' },
      { id: 3, label: 'Report generated', status: 'complete' },
    ];
    return Response.json(data);
  }

  private async reports(): Promise<Response> {
    const data = [
      {
        id: 'rpt_001',
        name: 'Liquidity Snapshot - December',
        createdAt: '2025-12-12',
        status: 'ready',
      },
    ];
    return Response.json(data);
  }

  private async simulation(request: Request): Promise<Response> {
    const body = await request.json().catch(() => ({}));
    const result = {
      ...body,
      horizonMonths: 6,
      projectedMinCash: 120000,
      projectedRunwayDays: 185,
    };
    return Response.json(result);
  }
}

