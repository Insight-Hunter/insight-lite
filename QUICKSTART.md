# Insight Hunter Lite - Quick Start Guide

## 🚀 Quick Deployment (3 Minutes)

### Prerequisites
- Cloudflare account
- Node.js 18+ installed
- Git repository set up

### Step 1: Install Dependencies
```bash
npm install
npm install -g wrangler
```

### Step 2: Login to Cloudflare
```bash
wrangler login
```

### Step 3: Create Resources
```bash
# Create D1 database
wrangler d1 create insight-hunter-db

# Copy the database_id and update wrangler.toml (uncomment D1 section)

# Initialize database
wrangler d1 execute insight-hunter-db --file=./db/schema.sql

# Create KV namespace
wrangler kv:namespace create INSIGHTS_KV

# Copy the namespace id and update wrangler.toml (uncomment KV section)

# Set secrets
wrangler secret put JWT_SECRET
# Enter a strong random string

wrangler secret put OPENAI_API_KEY
# Enter your OpenAI API key (or skip if not using AI features)
```

### Step 4: Update wrangler.toml
Edit `/wrangler.toml` and add:
- Your account_id (line 7)
- Uncomment and add database_id (line 23)
- Uncomment and add KV namespace id (line 16)

### Step 5: Deploy Backend
```bash
npm run deploy:worker
```

Note the Worker URL from the output.

### Step 6: Configure Frontend
Create `.env.local`:
```env
VITE_WORKER_URL=https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev
```

Update `/workers/middleware/cors.ts` line 6 with your future Pages URL:
```typescript
'Access-Control-Allow-Origin': 'https://insight-hunter-lite.pages.dev',
```

Redeploy worker:
```bash
npm run deploy:worker
```

### Step 7: Deploy Frontend
```bash
npm run build
npm run deploy:pages
```

When prompted, enter project name: `insight-hunter-lite`

### Step 8: Test
Visit your Pages URL and verify the app works!

## 🛠️ Development

### Local Development
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Worker (optional)
npm run dev:worker
```

Visit `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📝 Common Commands

```bash
# Deploy everything
npm run deploy

# Deploy only frontend
npm run deploy:pages

# Deploy only backend
npm run deploy:worker

# View worker logs
wrangler tail

# Check database
wrangler d1 execute insight-hunter-db --command="SELECT * FROM users LIMIT 5"
```

## 🆘 Need Help?

See `DEPLOYMENT_CHECKLIST.md` for detailed step-by-step instructions.
See `CLOUDFLARE_DEPLOYMENT.md` for comprehensive documentation.

## ✅ Verification

Test these URLs after deployment:

1. **Worker Health Check:**
   ```
   https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev/api/health
   ```

2. **Frontend:**
   ```
   https://insight-hunter-lite.pages.dev
   ```

3. **Login Test:**
   - Go to your Pages URL
   - Try logging in
   - Check browser console for errors

## 🎯 Next Steps

- [ ] Set up custom domain
- [ ] Configure GitHub Actions for auto-deployment
- [ ] Set up monitoring and alerts
- [ ] Review security settings
- [ ] Enable Cloudflare caching optimizations

---

**Ready to go!** Follow the steps above and you'll be deployed in minutes.
