/**
 * Cloudflare Pages Functions Middleware
 * Alternative to Workers - these run automatically with Pages deployment
 */

export async function onRequest(context: {
  request: Request;
  env: any;
  next: () => Promise<Response>;
}): Promise<Response> {
  const { request, next } = context;

  // Add CORS headers
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Get response from next handler
  const response = await next();

  // Add CORS headers to all API responses
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Access-Control-Allow-Origin', '*');
  newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
