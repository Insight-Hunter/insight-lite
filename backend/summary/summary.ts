export async function handleSummary(
  request: Request,
  env: { USER_STORE: "6dd308dd1c0a4d6c83cb3ffd82847530" }
): Promise<Response> {
  try {
    // Optionally pull data from KV if you want dynamic summaries
    const raw = await env.USER_STORE.get("raw_data");
    let summary = "No data available.";

    if (raw) {
      const data = JSON.parse(raw);
      // Example: basic summary based on revenue array length
      summary = `Forecast includes ${data.revenue.length} quarters of data with steady growth.`;
    } else {
      // Fallback static summary
      summary = "Consistent quarterly growth with modest acceleration.";
    }

    return new Response(JSON.stringify({ summary }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to generate summary" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
