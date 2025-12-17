// workers/middleware/cors.ts
export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export function handleCORS(_request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
