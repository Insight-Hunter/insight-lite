import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./routes/App"
import "./styles/theme.css"

const root = document.getElementById("root")!
createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
