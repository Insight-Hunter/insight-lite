import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "supersecretkey";
const JWT_EXPIRATION = "1h"; // token valid for 1 hour

const hashed = await bcrypt.hash(password, 10);
await env.USER_STORE.put(email, JSON.stringify({ id: userId, email, password: hashed }));

export async function handleLogin(
  request: Request,
  env: { USER_STORE: KVNamespace }
): Promise<Response> {
  try {
    const { email, password } = (await request.json()) as { email: string; password: string };

    // Fetch user from KV store
    const userRaw = await env.USER_STORE.get(email);
    if (!userRaw) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = JSON.parse(userRaw);

    // Compare hashed password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
