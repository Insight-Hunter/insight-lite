# Insight Hunter Lite - Cloudflare Workers API

This directory contains the backend API for Insight Hunter Lite, built on Cloudflare Workers.

## 📁 Structure

```
workers/
├── index.ts              # Main worker entry point
├── router.ts             # Request router
├── tsconfig.json         # TypeScript configuration
├── api/                  # API route handlers
│   ├── auth.ts          # Authentication endpoints
│   ├── transactions.ts  # Transaction management
│   ├── forecasts.ts     # Financial forecasting
│   ├── reports.ts       # Report generation
│   └── ai.ts            # AI/OpenAI integration
└── middleware/          # Middleware functions
    ├── cors.ts          # CORS headers
    └── auth.ts          # JWT authentication
```

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

Returns worker status and environment info.

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

### Transactions
```
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
POST   /api/transactions/upload  # CSV upload
```

### Forecasts
```
GET  /api/forecasts
POST /api/forecasts/generate
```

### Reports
```
GET  /api/reports
POST /api/reports/generate
```

### AI Features
```
POST /api/ai/insights
POST /api/ai/analyze
POST /api/ai/chat
```

## 🏗️ Architecture

### Cloudflare Bindings

- **D1 Database**: SQL database for persistent storage
- **KV Namespace**: Key-value store for caching and sessions
- **R2 Bucket**: Object storage for generated reports/PDFs
- **Secrets**: JWT_SECRET, OPENAI_API_KEY

### Request Flow

```
Request → CORS Middleware → Router → Auth Middleware → Handler → Response
```

### Authentication

JWT-based authentication using `Authorization: Bearer <token>` header.

Tokens are generated on login and validated on protected routes.

## 🚀 Development

### Local Development
```bash
npm run dev:worker
```

This starts Wrangler dev server on `http://localhost:8787`

### Testing Locally
```bash
# Health check
curl http://localhost:8787/api/health

# Login (returns JWT token)
curl -X POST http://localhost:8787/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Protected endpoint (replace TOKEN)
curl http://localhost:8787/api/transactions \
  -H "Authorization: Bearer TOKEN"
```

### Deploy
```bash
npm run deploy:worker
# or
wrangler deploy
```

## ⚙️ Configuration

### Environment Variables (wrangler.toml)
- `ENVIRONMENT`: production/staging/development
- `API_VERSION`: API version identifier

### Secrets (set via CLI)
```bash
wrangler secret put JWT_SECRET
wrangler secret put OPENAI_API_KEY
```

### Database Binding
D1 database is bound as `env.DB` and used throughout the API.

### KV Binding
KV namespace is bound as `env.INSIGHTS_KV` for caching.

### R2 Binding
R2 bucket is bound as `env.REPORTS_BUCKET` for file storage.

## 🔒 Security

### CORS
CORS is configured in `/middleware/cors.ts`. Update allowed origins for production:
```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-app.pages.dev',
  // ...
};
```

### Authentication Middleware
Protected routes use JWT verification from `/middleware/auth.ts`.

### Rate Limiting
Consider adding rate limiting for production:
```typescript
// Example rate limiter
const limit = new RateLimit({
  timeWindow: 60000, // 1 minute
  limit: 100,
});
```

## 📊 Database Schema

See `/db/schema.sql` for the complete D1 database schema.

Main tables:
- `users` - User accounts
- `transactions` - Financial transactions
- `forecasts` - Cash flow forecasts
- `reports` - Generated reports

## 🧪 Testing

### Manual Testing
```bash
# Set up test environment
wrangler dev

# Run test requests
curl http://localhost:8787/api/health
```

### Integration Tests
Add integration tests in `/tests` directory (future enhancement).

## 📝 Adding New Endpoints

1. Create handler in `/api/` directory
2. Add route in `/router.ts`
3. Add middleware if needed (auth, validation)
4. Update API types in `/types/index.ts`
5. Test locally with `wrangler dev`
6. Deploy with `wrangler deploy`

Example:
```typescript
// workers/api/example.ts
export async function handleExample(
  request: Request,
  env: Env
): Promise<Response> {
  return new Response(JSON.stringify({ message: 'Hello' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// workers/router.ts
if (pathname === '/api/example') {
  return handleExample(request, this.env);
}
```

## 🐛 Debugging

### View Logs
```bash
wrangler tail
```

### Common Issues

**CORS Errors:**
- Update allowed origin in `/middleware/cors.ts`
- Redeploy worker

**Database Connection:**
- Verify D1 database exists: `wrangler d1 list`
- Check binding in `wrangler.toml`

**Secrets Not Found:**
- List secrets: `wrangler secret list`
- Add missing: `wrangler secret put SECRET_NAME`

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [KV Storage Docs](https://developers.cloudflare.com/kv/)
- [R2 Storage Docs](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

## 🔄 CI/CD

GitHub Actions workflow is configured in `/.github/workflows/deploy.yml`.

Required secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 📈 Monitoring

### Analytics
View in Cloudflare Dashboard → Workers & Pages → insight-hunter-lite-api → Analytics

### Performance
- Check request duration
- Monitor error rates
- Track CPU time

### Alerts
Set up alerts for:
- High error rates
- Increased latency
- Resource limits

---

**Note:** This is a serverless API running on Cloudflare's edge network with automatic global distribution and scaling.
