# Cloudflare Deployment Guide - Insight Hunter Lite

This guide walks you through deploying Insight Hunter Lite on Cloudflare's platform with 100% Cloudflare infrastructure.

## Architecture Overview

- **Frontend**: Cloudflare Pages (React SPA)
- **Backend API**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQL database)
- **Key-Value Store**: Cloudflare KV
- **File Storage**: Cloudflare R2 (for PDF reports)
- **CDN**: Cloudflare's global CDN (automatic)

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install Cloudflare's CLI tool

```bash
npm install -g wrangler
```

3. **Login to Cloudflare**:

```bash
npm run cf:login
# or
wrangler login
```

## Step 1: Create Cloudflare Resources

### 1.1 Create D1 Database

```bash
npm run cf:d1:create
# or
wrangler d1 create insight-hunter-db
```

Copy the database ID and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "insight-hunter-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 1.2 Initialize Database Schema

```bash
wrangler d1 execute insight-hunter-db --file=./db/schema.sql
```

### 1.3 Create KV Namespace

```bash
npm run cf:kv:create
# or
wrangler kv:namespace create INSIGHTS_KV
```

Update `wrangler.toml` with the KV namespace ID.

### 1.4 Create R2 Bucket (for PDF storage)

```bash
npm run cf:r2:create
# or
wrangler r2 bucket create insight-hunter-reports
```

Update `wrangler.toml` with the R2 bucket name.

### 1.5 Set Environment Secrets

```bash
# Set JWT secret for authentication
wrangler secret put JWT_SECRET

# Set OpenAI API key (if using AI features)
wrangler secret put OPENAI_API_KEY
```

## Step 2: Update Configuration

### 2.1 Update wrangler.toml

Edit `/wrangler.toml` and add your:
- Account ID
- Database ID
- KV Namespace ID
- R2 Bucket name

### 2.2 Update CORS Origins

In `/workers/middleware/cors.ts`, update the allowed origin:

```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-app.pages.dev', // Your Pages URL
  // ...
};
```

## Step 3: Deploy Backend (Workers)

### Development

```bash
npm run dev:worker
# or
wrangler dev
```

### Production Deployment

```bash
npm run deploy:worker
# or
wrangler deploy
```

After deployment, you'll get a Worker URL like:
`https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev`

## Step 4: Deploy Frontend (Pages)

### 4.1 Build the Frontend

```bash
npm run build
```

### 4.2 Deploy to Cloudflare Pages

```bash
npm run deploy:pages
# or
wrangler pages deploy dist
```

### 4.3 Configure Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. Select your project
3. Go to Settings → Environment Variables
4. Add any frontend environment variables if needed

### 4.4 Configure Custom Domain (Optional)

1. In Pages settings, go to Custom Domains
2. Add your domain (e.g., `app.yourdomain.com`)
3. Follow DNS configuration instructions

## Step 5: Connect Frontend to Backend

### Update API Proxy

Edit `/public/_redirects`:

```
/api/*  https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev/:splat  200
```

Or create an API configuration file in your frontend:

```typescript
// src/config/api.ts
export const API_BASE_URL = 
  import.meta.env.PROD 
    ? 'https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev'
    : 'http://localhost:8787';
```

## Step 6: Test the Deployment

### Health Check

```bash
curl https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev/api/health
```

### Frontend

Visit your Pages URL: `https://insight-hunter-lite.pages.dev`

## Deployment Scripts

### Quick Deployment (Both Frontend & Backend)

```bash
npm run deploy
```

This will:
1. Build the frontend
2. Deploy to Cloudflare Pages
3. Deploy Workers API

### Individual Deployments

```bash
# Frontend only
npm run deploy:pages

# Backend only
npm run deploy:worker
```

## Monitoring & Logs

### View Worker Logs

```bash
wrangler tail
```

### View Analytics

1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages → Your worker
3. Check Analytics tab for metrics

### View D1 Database

```bash
# Query database
wrangler d1 execute insight-hunter-db --command="SELECT * FROM users LIMIT 5"

# Export data
wrangler d1 export insight-hunter-db
```

## Environment-Specific Deployments

### Staging Environment

```bash
wrangler deploy --env staging
```

### Production Environment

```bash
wrangler deploy --env production
```

## Performance Optimization

### 1. Enable Cloudflare Features

- **Auto Minify**: Enable in Cloudflare Dashboard → Speed → Optimization
- **Brotli Compression**: Automatically enabled
- **HTTP/3**: Enable in Network settings
- **Argo Smart Routing**: Optional, for faster global routing

### 2. Cache Configuration

Headers are already configured in `/public/_headers` for optimal caching.

### 3. Image Optimization

Consider using Cloudflare Images for optimized image delivery:
- Upload to R2 bucket
- Use Cloudflare Images transformation URLs

## Security Best Practices

### 1. Update CORS

Restrict CORS to your specific domain in production.

### 2. Rate Limiting

Add rate limiting to Workers:

```typescript
// In worker
const rateLimiter = new RateLimit({
  timeWindow: 60 * 1000, // 1 minute
  limit: 100, // requests per window
});
```

### 3. Authentication

Implement proper JWT verification in `/workers/middleware/auth.ts`.

### 4. Content Security Policy

Already configured in `/public/_headers`. Adjust as needed.

## Cost Estimation

Cloudflare offers generous free tiers:

- **Pages**: Unlimited sites, 500 builds/month
- **Workers**: 100,000 requests/day
- **D1**: 5GB storage, 5M reads/day
- **R2**: 10GB storage, 1M reads/month
- **KV**: 1GB storage, 100K reads/day

Most small to medium applications stay within free tier limits.

## Troubleshooting

### Build Errors

```bash
# Clean build
rm -rf dist dist-worker
npm run build
```

### Worker Deployment Fails

```bash
# Check wrangler configuration
wrangler whoami

# Validate wrangler.toml
wrangler deploy --dry-run
```

### Database Connection Issues

```bash
# List databases
wrangler d1 list

# Check database info
wrangler d1 info insight-hunter-db
```

### CORS Errors

1. Check `/workers/middleware/cors.ts`
2. Verify allowed origins match your Pages URL
3. Ensure middleware is applied to all routes

## Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [R2 Storage Docs](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

## Support

For issues specific to Cloudflare:
- [Cloudflare Community](https://community.cloudflare.com/)
- [Cloudflare Discord](https://discord.gg/cloudflaredev)

## Next Steps

1. Set up CI/CD with GitHub Actions
2. Configure custom domain
3. Enable analytics and monitoring
4. Implement rate limiting
5. Add error tracking (e.g., Sentry)
6. Set up automated backups for D1 database
