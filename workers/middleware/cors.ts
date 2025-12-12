/**
 * CORS Middleware for Cloudflare Workers
 */

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Update with your domain in production
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export function handleCORS(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export function withCORS(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
