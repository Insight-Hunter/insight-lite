import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("hunter123")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) throw new Error("Invalid credentials")
      const { token } = await res.json()
      localStorage.setItem("jwt", token)
      navigate("/onboarding")
    } catch (err: any) {
      setError(err.message || "Login failed")
    }
  }

  return (
    <section className="card">
      <h1>Sign in</h1>
      <form onSubmit={submit} className="form">
        <label>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Continue</button>
      </form>
      <p className="muted">New here? <Link to="/onboarding">Start onboarding</Link></p>
    </section>
  )
}
