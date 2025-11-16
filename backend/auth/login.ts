export async function handleLogin(
  request: Request,
  env: { USER_STORE: KVNamespace }
): Promise<Response> {
  try {
    const { email, password } = await request.json() as {
      email: string
      password: string
    }

    const userRaw = await env.USER_STORE.get(email)
    if (!userRaw) {
      return new Response("User not found", { status: 404 })
    }

    const user = JSON.parse(userRaw)
    if (user.password !== password) {
      return new Response("Invalid credentials", { status: 401 })
    }

    // Simple token for Lite edition (replace with JWT in full version)
    const token = btoa(`${user.id}:${Date.now()}`)

    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" }
    })
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Login failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
