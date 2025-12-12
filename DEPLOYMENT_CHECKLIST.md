# Cloudflare Deployment Checklist - Insight Hunter Lite

This checklist will guide you through the complete deployment process step by step.

## ✅ Pre-Deployment Setup

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
npm run cf:login
# or
wrangler login
```

### 3. Get Your Cloudflare Account ID
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on "Workers & Pages" in the sidebar
3. Copy your Account ID from the right sidebar
4. Update `wrangler.toml` with your account ID

## ✅ Create Cloudflare Resources

### 4. Create D1 Database
```bash
npm run cf:d1:create
# or
wrangler d1 create insight-hunter-db
```

**Expected Output:**
```
✅ Successfully created DB 'insight-hunter-db'

[[d1_databases]]
binding = "DB"
database_name = "insight-hunter-db"
database_id = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
```

📝 **Action Required:** Copy the `database_id` and uncomment the D1 section in `wrangler.toml`, replacing the ID.

### 5. Initialize Database Schema
```bash
wrangler d1 execute insight-hunter-db --file=./db/schema.sql
```

### 6. Create KV Namespace
```bash
npm run cf:kv:create
# or
wrangler kv:namespace create INSIGHTS_KV
```

**Expected Output:**
```
🌀 Creating namespace with title "insight-hunter-lite-api-INSIGHTS_KV"
✅ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "INSIGHTS_KV", id = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
```

📝 **Action Required:** Uncomment the KV section in `wrangler.toml` and add the namespace ID.

### 7. Create R2 Bucket (Optional - for PDF storage)
```bash
npm run cf:r2:create
# or
wrangler r2 bucket create insight-hunter-reports
```

📝 **Action Required:** Uncomment the R2 section in `wrangler.toml` if you want PDF export to R2.

### 8. Set Secrets
```bash
# JWT Secret for authentication
wrangler secret put JWT_SECRET
# When prompted, enter a strong random string (e.g., use: openssl rand -base64 32)

# OpenAI API Key (if using AI features)
wrangler secret put OPENAI_API_KEY
# Enter your OpenAI API key when prompted
```

## ✅ Configuration

### 9. Update wrangler.toml
Open `/wrangler.toml` and fill in:
- [x] `account_id`
- [x] `database_id` (uncomment D1 section)
- [x] `kv_namespaces.id` (uncomment KV section)
- [ ] `r2_buckets.bucket_name` (optional, uncomment R2 section)

### 10. Verify Configuration
```bash
wrangler deploy --dry-run
```

This should show no errors if configuration is correct.

## ✅ Deploy Backend (Workers)

### 11. Test Worker Locally
```bash
npm run dev:worker
```

Visit `http://localhost:8787/api/health` to verify it works.

### 12. Deploy Worker to Production
```bash
npm run deploy:worker
# or
wrangler deploy
```

**Expected Output:**
```
✨ Success! Uploaded 1 file
🌍 Worker URL: https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev
```

📝 **Action Required:** Copy the Worker URL for the next steps.

### 13. Test Deployed Worker
```bash
curl https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "v1",
  "environment": "production",
  "timestamp": "2025-12-12T..."
}
```

## ✅ Deploy Frontend (Pages)

### 14. Update API Configuration
Edit `.env.local` (create from `.env.example`):
```env
VITE_WORKER_URL=https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev
```

### 15. Update CORS in Worker
Edit `/workers/middleware/cors.ts` and update the allowed origin after you deploy to Pages:
```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://insight-hunter-lite.pages.dev', // Your Pages URL
  // ...
};
```

Redeploy the worker:
```bash
npm run deploy:worker
```

### 16. Build Frontend
```bash
npm run build
```

Verify the build completes without errors.

### 17. Deploy to Cloudflare Pages
```bash
npm run deploy:pages
# or
wrangler pages deploy dist
```

First time deployment will ask for project name:
```
Enter the name of your new project: insight-hunter-lite
```

**Expected Output:**
```
✨ Success! Uploaded 42 files
🌍 Project URL: https://insight-hunter-lite.pages.dev
```

### 18. Update API Proxy (Optional)
Edit `/public/_redirects` and uncomment the API proxy line:
```
/api/*  https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev/:splat  200
```

Rebuild and redeploy:
```bash
npm run build
npm run deploy:pages
```

### 19. Test Frontend
Visit your Pages URL: `https://insight-hunter-lite.pages.dev`

Test the following:
- [ ] Login page loads
- [ ] Dashboard displays (after login)
- [ ] API calls work (check browser console)
- [ ] No CORS errors

## ✅ GitHub Actions (Optional - Automated Deployment)

### 20. Set GitHub Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:
- `CLOUDFLARE_API_TOKEN`: Get from [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) → Create Token → Edit Cloudflare Workers
- `CLOUDFLARE_ACCOUNT_ID`: Your account ID from earlier

### 21. Test GitHub Actions
Push to main branch and verify deployment runs successfully in the Actions tab.

## ✅ Post-Deployment

### 22. Set Up Custom Domain (Optional)
1. Go to Cloudflare Dashboard → Pages → insight-hunter-lite
2. Click "Custom domains"
3. Add your domain (e.g., `app.yourdomain.com`)
4. Follow DNS configuration instructions

### 23. Update CORS for Custom Domain
If you set up a custom domain, update `/workers/middleware/cors.ts`:
```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://app.yourdomain.com',
  // ...
};
```

Redeploy worker:
```bash
npm run deploy:worker
```

### 24. Monitor Deployment
- Check Worker logs: `wrangler tail`
- Check analytics in Cloudflare Dashboard
- Set up error tracking (e.g., Sentry)

## ✅ Verification

### Final Checklist
- [ ] Worker health endpoint returns 200
- [ ] Frontend loads without errors
- [ ] Login functionality works
- [ ] Dashboard displays data
- [ ] No CORS errors in console
- [ ] API calls to worker succeed
- [ ] PWA manifest loads correctly
- [ ] Service worker registers (check DevTools → Application)

## 📊 Monitoring Commands

```bash
# View worker logs
wrangler tail

# Check D1 database
wrangler d1 execute insight-hunter-db --command="SELECT COUNT(*) FROM users"

# View KV keys
wrangler kv:key list --binding=INSIGHTS_KV

# Check deployment status
wrangler deployments list
```

## 🆘 Troubleshooting

### Issue: Worker deployment fails
```bash
wrangler whoami  # Verify login
wrangler deploy --dry-run  # Check configuration
```

### Issue: CORS errors
1. Update `/workers/middleware/cors.ts` with correct origin
2. Redeploy worker: `npm run deploy:worker`
3. Clear browser cache

### Issue: Database not found
```bash
wrangler d1 list  # Verify database exists
wrangler d1 info insight-hunter-db  # Check database details
```

### Issue: Secrets not set
```bash
wrangler secret list  # View all secrets
wrangler secret put SECRET_NAME  # Add missing secret
```

## 📚 Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [D1 Database Documentation](https://developers.cloudflare.com/d1/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

---

**Status:** Ready for deployment! Follow the checklist above step by step.
