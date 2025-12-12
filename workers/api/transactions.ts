/**
 * Transactions API Endpoints
 */

import { Env } from '../index';
import { requireAuth, AuthUser } from '../middleware/auth';

export async function handleTransactions(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // Require authentication for all transaction endpoints
  const authResult = await requireAuth(request, env);
  if (authResult instanceof Response) {
    return authResult;
  }
  const user = authResult as AuthUser;

  // GET /api/transactions - List all transactions
  if (path === '/api/transactions' && request.method === 'GET') {
    return getTransactions(user, env);
  }

  // POST /api/transactions - Create new transaction
  if (path === '/api/transactions' && request.method === 'POST') {
    return createTransaction(request, user, env);
  }

  // GET /api/transactions/:id - Get specific transaction
  if (path.match(/^\/api\/transactions\/[^/]+$/) && request.method === 'GET') {
    const id = path.split('/').pop()!;
    return getTransaction(id, user, env);
  }

  // PUT /api/transactions/:id - Update transaction
  if (path.match(/^\/api\/transactions\/[^/]+$/) && request.method === 'PUT') {
    const id = path.split('/').pop()!;
    return updateTransaction(id, request, user, env);
  }

  // DELETE /api/transactions/:id - Delete transaction
  if (path.match(/^\/api\/transactions\/[^/]+$/) && request.method === 'DELETE') {
    const id = path.split('/').pop()!;
    return deleteTransaction(id, user, env);
  }

  // POST /api/transactions/upload - Upload CSV
  if (path === '/api/transactions/upload' && request.method === 'POST') {
    return uploadTransactions(request, user, env);
  }

  return new Response(
    JSON.stringify({ error: 'Not Found' }),
    { status: 404, headers: { 'Content-Type': 'application/json' } }
  );
}

async function getTransactions(user: AuthUser, env: Env): Promise<Response> {
  // TODO: Query D1 database for user's transactions
  // Mock data for now
  const transactions = [
    {
      id: '1',
      userId: user.id,
      date: '2025-12-01',
      description: 'Client Payment',
      amount: 5000,
      category: 'Revenue',
      type: 'income',
    },
  ];

  return new Response(JSON.stringify(transactions), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function createTransaction(
  request: Request,
  user: AuthUser,
  env: Env
): Promise<Response> {
  try {
    const body = await request.json();
    // TODO: Validate and save to D1 database
    
    const transaction = {
      id: 'txn-' + Date.now(),
      userId: user.id,
      ...body,
      createdAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(transaction), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function getTransaction(
  id: string,
  user: AuthUser,
  env: Env
): Promise<Response> {
  // TODO: Query D1 database
  return new Response(
    JSON.stringify({ id, userId: user.id, message: 'Transaction details' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

async function updateTransaction(
  id: string,
  request: Request,
  user: AuthUser,
  env: Env
): Promise<Response> {
  try {
    const body = await request.json();
    // TODO: Update in D1 database
    
    return new Response(
      JSON.stringify({ id, userId: user.id, ...body, updatedAt: new Date().toISOString() }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function deleteTransaction(
  id: string,
  user: AuthUser,
  env: Env
): Promise<Response> {
  // TODO: Delete from D1 database
  return new Response(
    JSON.stringify({ message: 'Transaction deleted', id }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

async function uploadTransactions(
  request: Request,
  user: AuthUser,
  env: Env
): Promise<Response> {
  try {
    const body = await request.text();
    // TODO: Parse CSV and save to D1 database
    
    return new Response(
      JSON.stringify({
        message: 'Transactions uploaded successfully',
        count: body.split('\n').length - 1,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process CSV' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
