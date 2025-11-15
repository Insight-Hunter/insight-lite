import { useEffect, useState } from "react"

type Raw = { revenue: number[], expenses?: number[], labels?: string[] }

export default function Forecast() {
  const [raw, setRaw] = useState<Raw | null>(null)
  const [error, setError] = useState<string | null>(null)
  const token = localStorage.getItem("jwt") || ""

  useEffect(() => {
    fetch("/api/demo/forecast", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject(new Error("Failed to load")))
      .then(json => setRaw({ revenue: json.forecast }))
      .catch(err => setError(err.message))
  }, [])

  return (
    <section className="card">
      <h1>Forecast</h1>
      {error && <p className="error">{error}</p>}
      {!error && raw && (
        <>
          <p className="muted">Projected revenue over time</p>
          <ul className="kpi">
            {raw.revenue.map((v, i) => <li key={i}><strong>Q{i + 1}:</strong> ${v.toFixed(2)}</li>)}
          </ul>
        </>
      )}
    </section>
  )
}
