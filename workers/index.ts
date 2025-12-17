/**
 * Cloudflare Worker Entry Point
 * Handles all backend API requests for Insight Hunter Lite
 */
// src/worker/index.ts
// workers/index.ts
import { Router } from './router';
import { corsHeaders, handleCORS } from './middleware/cors';

export interface Env {
  INSIGHTS_KV?: KVNamespace;
  DB?: D1Database;
  REPORTS_BUCKET?: R2Bucket;

  // Static assets binding from wrangler.toml
  ASSETS: Fetcher;

  ENVIRONMENT?: string;
  API_VERSION?: string;

  OPENAI_API_KEY?: string;
  JWT_SECRET?: string;
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // API routes
    if (url.pathname.startsWith('/api/')) {
      try {
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
        Object.entries(corsHeaders).forEach(([k, v]) => headersWithCORS.set(k, v));

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: headersWithCORS,
        });
      } catch (err) {
        console.error('API error:', err);
        return new Response(
          JSON.stringify({
            error: 'Internal Server Error',
            message: err instanceof Error ? err.message : 'Unknown error',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }
    }

    // Everything else: serve SPA static assets
    return env.ASSETS.fetch(request);
  },
};

