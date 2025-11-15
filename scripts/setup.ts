import { execSync } from "child_process"

const users = [{ email: "user@example.com", id: "user-123", password: "hunter123" }]
const forecast = {
  revenue: [12000, 13500, 14200, 15000],
  expenses: [8000, 8500, 8700, 9000],
  net: [4000, 5000, 5500, 6000],
  labels: ["Q1", "Q2", "Q3", "Q4"]
}

const KV = "replace-with-kv-id"

users.forEach(user => {
  execSync(`npx wrangler kv:key put ${user.email} '${JSON.stringify(user)}' --namespace-id ${KV}`, { stdio: "inherit" })
})
execSync(`npx wrangler kv:key put raw_data '${JSON.stringify(forecast)}' --namespace-id ${KV}`, { stdio: "inherit" })

console.log("✅ Preview users and forecast data seeded.")
