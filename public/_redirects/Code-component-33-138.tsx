# Cloudflare Pages Redirects
# https://developers.cloudflare.com/pages/configuration/redirects/

# SPA Routing - Redirect all requests to index.html for client-side routing
# This ensures React Router works correctly

/index.html   200

# API requests should be proxied to Cloudflare Workers
# Uncomment and configure after deploying your worker
# /api/*  https://insight-hunter-lite-api.YOUR-SUBDOMAIN.workers.dev/:splat  200
