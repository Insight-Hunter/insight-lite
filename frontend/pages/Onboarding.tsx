import { useNavigate } from "react-router-dom"

const steps = [
  { title: "Welcome", text: "Install the PWA for faster access and offline capability." },
  { title: "Connect data", text: "Upload or seed sample financials to preview charts." },
  { title: "Export reports", text: "Generate branded PDFs and share securely." }
]

export default function Onboarding() {
  const navigate = useNavigate()
  const done = () => navigate("/")

  return (
    <section className="card">
      <h1>Onboarding</h1>
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={i}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <button onClick={done}>Finish</button>
    </section>
  )
}
