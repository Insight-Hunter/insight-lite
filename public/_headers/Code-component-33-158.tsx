# Security and performance headers for Cloudflare Pages
# https://developers.cloudflare.com/pages/configuration/headers/

/*
  # Security Headers
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  
  # Content Security Policy (adjust as needed)
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.openai.com https://*.cloudflare.com https://*.workers.dev; frame-ancestors 'none';
  
  # HSTS (HTTP Strict Transport Security)
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  
  # Cache Control for HTML (no cache)
  Cache-Control: no-cache, no-store, must-revalidate

# Static Assets - Aggressive caching
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Images - Moderate caching
/images/*
  Cache-Control: public, max-age=604800

# Service Worker - No caching
/sw.js
  Cache-Control: no-cache, no-store, must-revalidate

# Manifest
/manifest.json
  Cache-Control: public, max-age=86400
