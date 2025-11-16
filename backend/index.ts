import { handleLogin } from "./auth/login"
import { handleForecast } from "./forecast/forecast"
import { handleSummary } from "./summary/summary"
import { handlePDFUpload } from "./pdf/upload"

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)

    switch (url.pathname) {
      case "/api/auth/login":
        return handleLogin(request, env)

      case "/api/demo/forecast":
        return handleForecast(request, env)

      case "/api/demo/summary":
        return handleSummary(request, env)

      case "/api/pdf/upload":
        return handlePDFUpload(request, env)

      default:
        return new Response("Not found", { status: 404 })
    }
  }
}

export interface Env {
  USER_STORE: KVNamespace
  R2_BUCKET: R2Bucket
  JWT_SECRET: string        // <-- FIXED: Cloudflare provides string bindings
}
