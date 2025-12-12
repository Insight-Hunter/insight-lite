/**
 * API Configuration
 * Handles API base URL for different environments
 */

// Cloudflare Worker URL (update after deployment)
const WORKER_URL = import.meta.env.VITE_WORKER_URL || '';

export const API_BASE_URL = import.meta.env.PROD && WORKER_URL
  ? WORKER_URL
  : 'http://localhost:8787'; // Local Wrangler dev server

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  REFRESH: `${API_BASE_URL}/api/auth/refresh`,
  
  // Transactions
  TRANSACTIONS: `${API_BASE_URL}/api/transactions`,
  TRANSACTION_UPLOAD: `${API_BASE_URL}/api/transactions/upload`,
  
  // Forecasts
  FORECASTS: `${API_BASE_URL}/api/forecasts`,
  FORECAST_GENERATE: `${API_BASE_URL}/api/forecasts/generate`,
  
  // Reports
  REPORTS: `${API_BASE_URL}/api/reports`,
  REPORT_GENERATE: `${API_BASE_URL}/api/reports/generate`,
  
  // AI
  AI_INSIGHTS: `${API_BASE_URL}/api/ai/insights`,
  AI_ANALYZE: `${API_BASE_URL}/api/ai/analyze`,
  AI_CHAT: `${API_BASE_URL}/api/ai/chat`,
  
  // Health
  HEALTH: `${API_BASE_URL}/api/health`,
};

/**
 * Fetch wrapper with authentication
 */
export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('auth_token');
  
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(endpoint, {
    ...options,
    headers,
  });
}

/**
 * Type-safe API client
 */
export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await apiFetch(endpoint);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await apiFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await apiFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await apiFetch(endpoint, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },
};
