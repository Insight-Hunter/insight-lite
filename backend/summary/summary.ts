export async function handleSummary() {
  return new Response(JSON.stringify({ summary: "Consistent quarterly growth with modest acceleration." }), {
    headers: { "Content-Type": "application/json" }
  })
}
