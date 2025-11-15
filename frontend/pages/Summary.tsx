import { useEffect, useState } from "react"

export default function Summary() {
  const [summary, setSummary] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const token = localStorage.getItem("jwt") || ""

  useEffect(() => {
    fetch("/api/demo/summary", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject(new Error("Failed to load")))
      .then(json => setSummary(json.summary))
      .catch(err => setError(err.message))
  }, [])

  return (
    <section className="card">
      <h1>Summary</h1>
      {error && <p className="error">{error}</p>}
      {!error && <p>{summary}</p>}
    </section>
  )
}
