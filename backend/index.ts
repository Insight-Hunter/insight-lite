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
  USER_STORE: "6dd308dd1c0a4d6c83cb3ffd82847530"
  R2_BUCKET: "ih-pdfs"
  JWT_SECRET?: "8cb92eb311e1a8106f160b01da419580707c8e5b225917dccdc5b211595f76cfe6c12c26ae9aa3859d358ea7a18183b6209673c9bbc90596d516e0a55b575f79"
}
