/**
 * Health Check Endpoint - Cloudflare Pages Function
 * GET /api/health
 */

export async function onRequestGet(): Promise<Response> {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      service: 'Insight Hunter Lite API',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
