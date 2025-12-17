/**
 * Cloudflare Worker Entry Point
 * Handles all backend API requests for Insight Hunter Lite
 */
// src/worker/index.ts

import { Router } from './router';
import { corsHeaders, handleCORS } from './middleware/cors';

export interface Env {
  // KV Namespaces
  INSIGHTS_KV?: KVNamespace;

  // D1 Database
  DB?: D1Database;

  // R2 Buckets
  REPORTS_BUCKET?: R2Bucket;

  // Static assets binding for SPA (configured in wrangler.jsonc)
  ASSETS: Fetcher;

  // Environment Variables
  ENVIRONMENT?: string;
  API_VERSION?: string;

  // Secrets
  OPENAI_API_KEY?: string;
  JWT_SECRET?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    try {
      // API routes
      if (url.pathname.startsWith('/api/')) {
        const router = new Router(env);

        if (url.pathname === '/api/health') {
          return new Response(
            JSON.stringify({
              status: 'healthy',
              version: env.API_VERSION || 'v1',
              environment: env.ENVIRONMENT || 'production',
              timestamp: new Date().toISOString(),
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            }
          );
        }

        const response = await router.handle(request);
        const headersWithCORS = new Headers(response.headers);
        Object.entries(corsHeaders).forEach(([key, value]) => headersWithCORS.set(key, value));

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: headersWithCORS,
        });
      }

      // Serve static assets for everything else (SPA fallback)
      return env.ASSETS.fetch(request);
    } catch (error: any) {
      console.error('Worker Error:', error);
      return new Response(JSON.stringify({ error: error.message || 'Internal Error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  },
};
