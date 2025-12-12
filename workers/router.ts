/**
 * API Router for Insight Hunter Lite
 * Handles routing to different API endpoints
 */

import { Env } from './index';
import { handleAuth } from './api/auth';
import { handleTransactions } from './api/transactions';
import { handleForecasts } from './api/forecasts';
import { handleReports } from './api/reports';
import { handleAI } from './api/ai';

export class Router {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Authentication endpoints
    if (path.startsWith('/api/auth')) {
      return handleAuth(request, this.env);
    }

    // Transactions endpoints
    if (path.startsWith('/api/transactions')) {
      return handleTransactions(request, this.env);
    }

    // Forecasts endpoints
    if (path.startsWith('/api/forecasts')) {
      return handleForecasts(request, this.env);
    }

    // Reports endpoints
    if (path.startsWith('/api/reports')) {
      return handleReports(request, this.env);
    }

    // AI endpoints
    if (path.startsWith('/api/ai')) {
      return handleAI(request, this.env);
    }

    // 404 Not Found
    return new Response(
      JSON.stringify({
        error: 'Not Found',
        message: `Endpoint ${path} not found`,
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
