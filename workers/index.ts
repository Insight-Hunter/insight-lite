/**
 * Cloudflare Worker Entry Point
 * Handles all backend API requests for Insight Hunter Lite
 */

import { Router } from './router';
import { corsHeaders, handleCORS } from './middleware/cors';

export interface Env {
  // KV Namespaces
  INSIGHTS_KV?: KVNamespace;
  
  // D1 Database
  DB?: D1Database;
  
  // R2 Buckets
  REPORTS_BUCKET?: R2Bucket;
  
  // Environment Variables
  ENVIRONMENT?: string;
  API_VERSION?: string;
  
  // Secrets (set via wrangler secret put)
  OPENAI_API_KEY?: string;
  JWT_SECRET?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    try {
      const url = new URL(request.url);
      const router = new Router(env);

      // Health check endpoint
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

      // Route the request
      const response = await router.handle(request);
      
      // Add CORS headers to response
      const headersWithCORS = new Headers(response.headers);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        headersWithCORS.set(key, value);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headersWithCORS,
      });
    } catch (error) {
      console.error('Worker error:', error);
      
      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error',
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
  },
};
