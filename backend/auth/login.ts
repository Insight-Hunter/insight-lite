import bcrypt from "bcryptjs";

// ---------------- JWT (HS256, WebCrypto) ----------------

function base64url(input: string) {
  return btoa(input)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function signJWT(payload: Record<string, any>, secret: string): Promise<string> {
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const header = { alg: "HS256", typ: "JWT" };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));

  const data = `${headerB64}.${payloadB64}`;

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );

  const sigString = String.fromCharCode(...new Uint8Array(signature));
  const signatureB64 = base64url(sigString);

  return `${data}.${signatureB64}`;
}

async function verifyJWT(token: string, secret: string): Promise<any | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, signatureB64] = parts;

  const encoder = new TextEncoder();

  const data = `${headerB64}.${payloadB64}`;

  const signature = Uint8Array.from(
    atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")),
    c => c.charCodeAt(0)
  );

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    encoder.encode(data)
  );

  if (!valid) return null;

  return JSON.parse(
    atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"))
  );
}

// ---------------- ADMIN SEED ----------------

async function seedAdmin(env: { USER_STORE: KVNamespace }) {
  const email = "admin@insighthunter.app";

  const existing = await env.USER_STORE.get(email);
  if (existing) return;

  const password = "AdminPass123!";
  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: crypto.randomUUID(),
    email,
    password: hashed
  };

  await env.USER_STORE.put(email, JSON.stringify(user));
}

// ---------------- ROUTER ----------------

export async function handleRequest(
  request: Request,
  env: { USER_STORE: KVNamespace; JWT_SECRET: string; ENVIRONMENT?: string }
) {
  if (env.ENVIRONMENT === "production") {
    seedAdmin(env);
  }

  const url = new URL(request.url);

  if (request.method === "POST" && url.pathname === "/register") {
    return handleRegister(request, env);
  }

  if (request.method === "POST" && url.pathname === "/login") {
    return handleLogin(request, env);
  }

  if (url.pathname === "/protected") {
    return handleProtected(request, env);
  }

  return new Response("Not found", { status: 404 });
}

// ---------------- REGISTER ----------------

async function handleRegister(
  request: Request,
  env: { USER_STORE: KVNamespace }
) {
  const body = await request.json() as { email: string; password: string };

  const existing = await env.USER_STORE.get(body.email);
  if (existing) return new Response("User exists", { status: 409 });

  const hashed = await bcrypt.hash(body.password, 10);

  const user = {
    id: crypto.randomUUID(),
    email: body.email,
    password: hashed
  };

  await env.USER_STORE.put(body.email, JSON.stringify(user));

  return new Response("User registered", { status: 201 });
}

// ---------------- LOGIN ----------------

async function handleLogin(
  request: Request,
  env: { USER_STORE: KVNamespace; JWT_SECRET: string }
) {
  const body = await request.json() as { email: string; password: string };

  const userRaw = await env.USER_STORE.get(body.email);
  if (!userRaw) return new Response("Invalid credentials", { status: 401 });

  const user = JSON.parse(userRaw);

  const valid = await bcrypt.compare(body.password, user.password);
  if (!valid) return new Response("Invalid credentials", { status: 401 });

  const token = await signJWT(
    { sub: user.id, email: user.email },
    env.JWT_SECRET
  );

  return new Response(JSON.stringify({ token }), {
    headers: { "Content-Type": "application/json" }
  });
}

// ---------------- PROTECTED ROUTE ----------------

async function handleProtected(
  request: Request,
  env: { JWT_SECRET: string }
) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return new Response("Unauthorized", { status: 401 });

  const decoded = await verifyJWT(token, env.JWT_SECRET);
  if (!decoded) return new Response("Unauthorized", { status: 401 });

  return new Response(JSON.stringify({ success: true, decoded }), {
    headers: { "Content-Type": "application/json" }
  });
}
