export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method Not Allowed");
    return;
  }

  const endpoint = (process.env.POWER_AUTOMATE_HTTP_URL || "").trim();
  if (!endpoint) {
    res
      .status(500)
      .json({ error: { message: "Server is missing POWER_AUTOMATE_HTTP_URL. Configure it in Vercel environment variables." } });
    return;
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "text/plain; charset=utf-8");
    res.send(text);
  } catch (err: any) {
    res.status(502).json({ error: { message: err?.message || "Upstream request failed" } });
  }
}

