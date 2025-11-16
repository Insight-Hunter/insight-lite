import { handleLogin } from "./auth/login";
import { handleForecast } from "./forecast/forecast";
import { handleSummary } from "./summary/summary";
import { handlePDFUpload } from "./pdf/upload";

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)
    if (url.pathname === "/api/auth/login") return handleLogin(request, env)
    if (url.pathname === "/api/demo/forecast") return handleForecast(request, env)
    if (url.pathname === "/api/demo/summary") return handleSummary(request, env)
    if (url.pathname === "/api/pdf/upload") return handlePDFUpload(request, env)
    return new Response("Not found", { status: 404 })
  }
}

export interface Env {
  USER_STORE: KVNamespace
  R2_BUCKET: R2Bucket
  JWT_SECRET?: JWT_SECRET
}
