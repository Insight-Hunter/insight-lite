import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "../shared/Layout"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Forecast from "../pages/Forecast"
import Summary from "../pages/Summary"
import Reports from "../pages/Reports"
import Settings from "../pages/Settings"
import Onboarding from "../pages/Onboarding"

function Protected({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("jwt")
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/forecast"
          element={
            <Protected>
              <Forecast />
            </Protected>
          }
        />
        <Route
          path="/summary"
          element={
            <Protected>
              <Summary />
            </Protected>
          }
        />
        <Route
          path="/reports"
          element={
            <Protected>
              <Reports />
            </Protected>
          }
        />
        <Route
          path="/settings"
          element={
            <Protected>
              <Settings />
            </Protected>
          }
        />
      </Route>
    </Routes>
  )
}
