/**
 * Reports API Endpoints
 */

import { Env } from '../index';
import { requireAuth, AuthUser } from '../middleware/auth';

export async function handleReports(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  const authResult = await requireAuth(request, env);
  if (authResult instanceof Response) {
    return authResult;
  }
  const user = authResult as AuthUser;

  // POST /api/reports/generate - Generate a report
  if (path === '/api/reports/generate' && request.method === 'POST') {
    return generateReport(request, user, env);
  }

  // GET /api/reports - List all reports
  if (path === '/api/reports' && request.method === 'GET') {
    return listReports(user, env);
  }

  // GET /api/reports/:id - Get specific report
  if (path.match(/^\/api\/reports\/[^/]+$/) && request.method === 'GET') {
    const id = path.split('/').pop()!;
    return getReport(id, user, env);
  }

  return new Response(
    JSON.stringify({ error: 'Not Found' }),
    { status: 404, headers: { 'Content-Type': 'application/json' } }
  );
}

async function generateReport(
  request: Request,
  user: AuthUser,
  env: Env
): Promise<Response> {
  try {
    const body = await request.json();
    const { reportType, dateRange } = body as {
      reportType: string;
      dateRange: { start: string; end: string };
    };

    // TODO: Generate report based on type and date range
    // For PDF reports, you could store them in R2 bucket
    
    const report = {
      id: 'report-' + Date.now(),
      userId: user.id,
      type: reportType,
      dateRange,
      generatedAt: new Date().toISOString(),
      url: `/api/reports/report-${Date.now()}.pdf`, // Would be R2 URL in production
      status: 'completed',
    };

    // Optionally store report metadata in D1
    // Optionally upload PDF to R2 bucket: env.REPORTS_BUCKET.put()

    return new Response(JSON.stringify(report), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function listReports(user: AuthUser, env: Env): Promise<Response> {
  // TODO: Query D1 database for user's reports
  const reports = [
    {
      id: 'report-1',
      userId: user.id,
      type: 'monthly',
      generatedAt: new Date().toISOString(),
      status: 'completed',
    },
  ];

  return new Response(JSON.stringify(reports), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function getReport(id: string, user: AuthUser, env: Env): Promise<Response> {
  // TODO: Fetch report from D1 and potentially the PDF from R2
  return new Response(
    JSON.stringify({
      id,
      userId: user.id,
      message: 'Report details',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
