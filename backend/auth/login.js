import bcrypt from "bcryptjs"; // pure JS bcrypt
import { jwtVerify, SignJWT } from 'jose';

const JWT_EXPIRATION = '1h';
// Seed admin user once on worker start (optional)
export async function seedAdmin(env) {
    const email = "admin@insighthunter.app";
    const password = env.ADMIN_PASSWORD || ""; // Use environment variable
    const existing = await env.USER_STORE.get(email);
    if (!existing) {
        const hashed = await bcrypt.hash(password, 10);
        const user = { id: crypto.randomUUID(), email, password: hashed };
        await env.USER_STORE.put(email, JSON.stringify(user));
        console.log("Admin user created:", email);
    }
}
/** REGISTER endpoint */
export async function handleRegister(request, env) {
    try {
        const { email, password } = (await request.json());
        const existing = await env.USER_STORE.get(email);
        if (existing)
            return new Response(JSON.stringify({ error: "User already exists" }), {
                status: 409,
                headers: { "Content-Type": "application/json" },
            });
        const hashed = await bcrypt.hash(password, 10);
        const user = { id: crypto.randomUUID(), email, password: hashed };
        await env.USER_STORE.put(email, JSON.stringify(user));
        return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201, headers: { "Content-Type": "application/json" } });
    }
    catch (err) {
        return new Response(JSON.stringify({ error: err.message || "Registration failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
/** LOGIN endpoint */
import { jwtVerify, SignJWT } from 'jose';

const JWT_EXPIRATION = '1h';

export async function handleLogin(
  request: Request,
  env: { USER_STORE: KVNamespace; JWT_SECRET: string }
): Promise<Response> {
  const { email, password } = await request.json() as { email: string; password: string };
  const userRaw = await env.USER_STORE.get(email);
  if (!userRaw) return new Response('User not found', { status: 404 });

  const user = JSON.parse(userRaw);
  if (user.password !== password) return new Response('Invalid credentials', { status: 401 });

  const alg = 'HS256';
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const token = await new SignJWT({ sub: user.id, email })
    .setProtectedHeader({ alg })
    .setExpirationTime('1h')
    .sign(secret);

  return new Response(JSON.stringify({ token }), { headers: { 'Content-Type': 'application/json' } });
}

export async function verifyJWT(token: string, secret: string) {
  try {
    const alg = 'HS256';
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}
/** Protected endpoint example */
export async function handleProtected(request, env) {
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token)
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    try {
        jwt.verify(token, env.JWT_SECRET);
        return new Response(JSON.stringify({ message: "Access granted" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    catch {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
}
