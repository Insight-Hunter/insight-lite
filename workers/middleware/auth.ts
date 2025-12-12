/**
 * Authentication Middleware
 * JWT token validation and user authentication
 */

import { Env } from '../index';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export async function verifyToken(token: string, env: Env): Promise<AuthUser | null> {
  try {
    // TODO: Implement JWT verification using env.JWT_SECRET
    // For now, this is a placeholder implementation
    
    // Parse the token (simplified - use a proper JWT library in production)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode payload
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiration
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export async function requireAuth(request: Request, env: Env): Promise<AuthUser | Response> {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const token = authHeader.substring(7);
  const user = await verifyToken(token, env);

  if (!user) {
    return new Response(
      JSON.stringify({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return user;
}
