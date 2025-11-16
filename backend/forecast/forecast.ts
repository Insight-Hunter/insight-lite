import Papa from "papaparse";

const REVENUE_COLUMNS = ["Revenue", "revenue", "Rev", "Amount"];

export async function handleForecast(
  request: Request,
  env: { USER_STORE: KVNamespace }
): Promise<Response> {
  try {
    const url = new URL(request.url);

    // --- CSV Upload + Auto-Forecast Endpoint ---
    if (request.method === "POST" && url.pathname === "/forecast/upload") {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return new Response(JSON.stringify({ error: "No file uploaded" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const text = await file.text();
      let parsed: Record<string, string | undefined>[];
      try {
        parsed = Papa.parse<Record<string, string>>(text, { header: true }).data as Record<
          string,
          string | undefined
        >[];
      } catch {
        return new Response(JSON.stringify({ error: "Failed to parse CSV" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        return new Response(JSON.stringify({ error: "CSV is empty or invalid" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Flexible column detection
      const revenue: number[] = [];
      parsed.forEach((row) => {
        for (const col of REVENUE_COLUMNS) {
          const val = row[col];
          if (val !== undefined && val !== null && val !== "") {
            const num = parseFloat(String(val).replace(/[^0-9.\-]/g, ""));
            if (!isNaN(num)) {
              revenue.push(num);
              break;
            }
          }
        }
      });

      if (revenue.length === 0) {
        return new Response(JSON.stringify({ error: "No valid revenue data found in CSV" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Store uploaded revenue
      await env.USER_STORE.put("raw_data", JSON.stringify({ revenue }));

      // --- Auto-generate forecast ---
      const periodParam = url.searchParams.get("period") || "quarterly";
      const growthRate = 0.05;
      const forecast: number[] = [];
      const trends: ("up" | "down" | "stable")[] = [];
      const pctChange: number[] = [];
      const chartLabels: string[] = [];

      const periods = periodParam === "monthly" ? 12 : revenue.length;

      for (let i = 0; i < periods; i++) {
        const base = revenue[i % revenue.length];
        const value = parseFloat((base * Math.pow(1 + growthRate, i + 1)).toFixed(2));
        forecast.push(value);

        chartLabels.push(periodParam === "monthly" ? `Month ${i + 1}` : `Q${i + 1}`);

        if (i === 0) {
          trends.push("stable");
          pctChange.push(0);
        } else {
          const diff = value - forecast[i - 1];
          trends.push(diff > 0 ? "up" : diff < 0 ? "down" : "stable");
          pctChange.push(parseFloat(((diff / forecast[i - 1]) * 100).toFixed(2)));
        }
      }

      const peaks: number[] = [];
      const drops: number[] = [];
      for (let i = 1; i < forecast.length - 1; i++) {
        if (forecast[i] > forecast[i - 1] && forecast[i] > forecast[i + 1]) peaks.push(i);
        if (forecast[i] < forecast[i - 1] && forecast[i] < forecast[i + 1]) drops.push(i);
      }

      await env.USER_STORE.put(
        "forecast_data",
        JSON.stringify({ forecast, trends, pctChange, peaks, drops, generatedAt: Date.now() })
      );

      const chartData = {
        labels: chartLabels,
        datasets: [
          { label: "Revenue", data: revenue, borderColor: "blue", fill: false },
          { label: "Forecast", data: forecast, borderColor: "orange", fill: false },
        ],
      };

      return new Response(
        JSON.stringify({
          message: "Revenue uploaded and forecast generated successfully",
          revenue,
          forecast,
          trends,
          pctChange,
          peaks,
          drops,
          chartData,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // --- Forecast Generation Endpoint (GET /forecast) ---
    const period = url.searchParams.get("period") || "quarterly";
    const raw = await env.USER_STORE.get("raw_data");
    const data = raw ? JSON.parse(raw) : { revenue: [12000, 13500, 14200, 15000] };

    if (!Array.isArray(data.revenue) || data.revenue.length === 0) {
      return new Response(JSON.stringify({ error: "No revenue data available for forecasting" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Same forecast logic as above
    const growthRate = 0.05;
    const forecast2: number[] = [];
    const trends2: ("up" | "down" | "stable")[] = [];
    const pctChange2: number[] = [];
    const chartLabels2: string[] = [];

    const forecastPeriods = period === "monthly" ? 12 : data.revenue.length;

    for (let i = 0; i < forecastPeriods; i++) {
      const base = data.revenue[i % data.revenue.length];
      const value = parseFloat((base * Math.pow(1 + growthRate, i + 1)).toFixed(2));
      forecast2.push(value);

      chartLabels2.push(period === "monthly" ? `Month ${i + 1}` : `Q${i + 1}`);

      if (i === 0) {
        trends2.push("stable");
        pctChange2.push(0);
      } else {
        const diff = value - forecast2[i - 1];
        trends2.push(diff > 0 ? "up" : diff < 0 ? "down" : "stable");
        pctChange2.push(parseFloat(((diff / forecast2[i - 1]) * 100).toFixed(2)));
      }
    }

    const peaks2: number[] = [];
    const drops2: number[] = [];
    for (let i = 1; i < forecast2.length - 1; i++) {
      if (forecast2[i] > forecast2[i - 1] && forecast2[i] > forecast2[i + 1]) peaks2.push(i);
      if (forecast2[i] < forecast2[i - 1] && forecast2[i] < forecast2[i + 1]) drops2.push(i);
    }

    await env.USER_STORE.put(
      "forecast_data",
      JSON.stringify({
        forecast: forecast2,
        trends: trends2,
        pctChange: pctChange2,
        peaks: peaks2,
        drops: drops2,
        generatedAt: Date.now(),
      })
    );

    const chartData = {
      labels: chartLabels2,
      datasets: [
        { label: "Revenue", data: data.revenue, borderColor: "blue", fill: false },
        { label: "Forecast", data: forecast2, borderColor: "orange", fill: false },
      ],
    };

    return new Response(
      JSON.stringify({
        revenue: data.revenue,
        forecast: forecast2,
        trends: trends2,
        pctChange: pctChange2,
        peaks: peaks2,
        drops: drops2,
        chartData,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Forecast failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
