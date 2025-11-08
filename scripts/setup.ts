import { execSync } from "child_process"

const users = [{ email: "user@example.com", id: "user-123", password: "hunter123" }]
const forecast = {
  revenue: [12000, 13500, 14200],
  expenses: [8000, 8500, 8700],
  net: [4000, 5000, 5500],
  labels: ["Q1", "Q2", "Q3"]
}

users.forEach(user => {
  execSync(`wrangler kv:key put ${user.email} '${JSON.stringify(user)}' --namespace-id e6273860f3044173806606b6cab9d964`)
})
execSync(`wrangler kv:key put raw_data '${JSON.stringify(forecast)}' --namespace-id e6273860f3044173806606b6cab9d964`)
console.log("✅ Preview users and forecast data seeded.")
