<<<<<<< HEAD
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// JWT configuration
const JWT_SECRET = Deno.env.get("JWT_SECRET") || "lite-secret";
const JWT_EXPIRATION = "1h";

// Seed admin user on Worker startup (only in production)
async function seedAdmin(env: { USER_STORE: KVNamespace }) {
  const email = "admin@insighthunter.app";
  const password = "AdminPass123!"; // change to a secure password
=======
import bcrypt from "bcryptjs"; // pure JS bcrypt
import jwt from "jsonwebtoken";

export interface LoginEnv {
  USER_STORE: KVNamespace;
  JWT_SECRET: string;
}

// Seed admin user once on worker start (optional)
export async function seedAdmin(env: LoginEnv) {
  const email = "admin@insighthunter.app";
  const password = "AdminPass123!"; // change to secure password
>>>>>>> 13c26431461274091499dd3080b8892aa1546361
  const existing = await env.USER_STORE.get(email);
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: crypto.randomUUID(), email, password: hashed };
    await env.USER_STORE.put(email, JSON.stringify(user));
    console.log("Admin user created:", email);
  }
}

<<<<<<< HEAD
export async function handleRequest(
  request: Request,
  env: { USER_STORE: KVNamespace }
) {
  // Only seed admin if ENVIRONMENT is "production"
  if (Deno.env.get("ENVIRONMENT") === "production") {
    seedAdmin(env);
  }

  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method === "POST" && path === "/register")
    return handleRegister(request, env);
  if (request.method === "POST" && path === "/login")
    return handleLogin(request, env);
  if (path === "/protected") return handleProtected(request);

  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}

/** REGISTER */
async function handleRegister(
  request: Request,
  env: { USER_STORE: KVNamespace }
) {
  try {
    const { email, password } = await request.json();
    const existing = await env.USER_STORE.get(email);
    if (existing)
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: crypto.randomUUID(), email, password: hashedPassword };
    await env.USER_STORE.put(email, JSON.stringify(user));

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Registration failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/** LOGIN */
async function handleLogin(request: Request, env: { USER_STORE: KVNamespace }) {
  try {
    const { email, password } = await request.json();
    const userRaw = await env.USER_STORE.get(email);
    if (!userRaw)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    const user = JSON.parse(userRaw);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Login failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/** PROTECTED ENDPOINT */
async function handleProtected(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token)
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

  try {
    jwt.verify(token, JWT_SECRET);
    return new Response(
      JSON.stringify({ message: "Access granted to protected route" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
=======
/** REGISTER endpoint */
export async function handleRegister(request: Request, env: LoginEnv): Promise<Response> {
  try {
    const { email, password } = (await request.json()) as { email: string; password: string };
    const existing = await env.USER_STORE.get(email);
    if (existing) return new Response(JSON.stringify({ error: "User already exists" }), { status: 409, headers: { "Content-Type": "application/json" } });

    const hashed = await bcrypt.hash(password, 10);
    const user = { id: crypto.randomUUID(), email, password: hashed };
    await env.USER_STORE.put(email, JSON.stringify(user));

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Registration failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

/** LOGIN endpoint */
export async function handleLogin(request: Request, env: LoginEnv): Promise<Response> {
  try {
    const { email, password } = (await request.json()) as { email: string; password: string };
    const userRaw = await env.USER_STORE.get(email);
    if (!userRaw) return new Response(JSON.stringify({ error: "User not found" }), { status: 404, headers: { "Content-Type": "application/json" } });

    const user = JSON.parse(userRaw);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: { "Content-Type": "application/json" } });

    const token = jwt.sign({ sub: user.id, email }, env.JWT_SECRET, { algorithm: "HS256", expiresIn: "1h" });
    return new Response(JSON.stringify({ token }), { headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Login failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

/** Protected endpoint example */
export async function handleProtected(request: Request, env: LoginEnv): Promise<Response> {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    jwt.verify(token, env.JWT_SECRET);
    return new Response(JSON.stringify({ message: "Access granted" }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
>>>>>>> 13c26431461274091499dd3080b8892aa1546361
  }
}
