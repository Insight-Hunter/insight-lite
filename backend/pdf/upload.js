export async function handlePDFUpload(request, env) {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/pdf")) {
        return new Response(JSON.stringify({ error: "Only PDF files are allowed" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    
    const blob = await request.arrayBuffer();
    if (blob.byteLength > 10 * 1024 * 1024) { // 10MB limit
        return new Response(JSON.stringify({ error: "File too large. Maximum size is 10MB" }), {
            status: 413,
            headers: { "Content-Type": "application/json" },
        });
    }
    const key = `reports/${Date.now()}.pdf`;
    await env.R2_BUCKET.put(key, blob, { httpMetadata: { contentType: "application/pdf" } });
    const url = `https://r2.insighthunter.app/${key}`; // replace with your public R2 URL/CF route
    return new Response(JSON.stringify({ url }), { headers: { "Content-Type": "application/json" } });
}
