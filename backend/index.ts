import { handleLogin, handleRegister, handleProtected, LoginEnv } from "./auth/login";
import { handleForecast } from "./forecast/forecast";
import { handleSummary } from "./summary/summary";
import { handlePDFUpload } from "./pdf/upload";

export interface Env {
  USER_STORE: KVNamespace;
  R2_BUCKET: R2Bucket;
  JWT_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    // Auth routes
    if (url.pathname === "/api/auth/login" && request.method === "POST") return handleLogin(request, env as LoginEnv);
    if (url.pathname === "/api/auth/register" && request.method === "POST") return handleRegister(request, env as LoginEnv);
    if (url.pathname === "/api/protected") return handleProtected(request, env as LoginEnv);

    // Forecast
    if (url.pathname.startsWith("/api/demo/forecast")) return handleForecast(request, { USER_STORE: env.USER_STORE });

    // Summary
    if (url.pathname.startsWith("/api/demo/summary")) return handleSummary(request, { USER_STORE: env.USER_STORE });

    // PDF upload
    if (url.pathname.startsWith("/api/pdf/upload")) return handlePDFUpload(request, { R2_BUCKET: env.R2_BUCKET });

    return new Response("Not Found", { status: 404 });
  }
};
