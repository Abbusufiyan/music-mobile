/**
 * Vercel serverless proxy — forwards /api/* to your backend server.
 * Set BACKEND_URL in Vercel env vars (e.g. https://your-api.onrender.com)
 */
function getApiPath(req) {
  if (req.url?.startsWith("/api/")) {
    return req.url.split("?")[0];
  }
  const segments = req.query?.path;
  if (!segments) return "/api/health";
  const joined = Array.isArray(segments) ? segments.join("/") : segments;
  return `/api/${joined}`;
}

export default async function handler(req, res) {
  const backend = process.env.BACKEND_URL?.replace(/\/$/, "");

  if (!backend) {
    return res.status(503).json({
      error: "Backend not configured.",
      hint: "Set BACKEND_URL in Vercel environment variables to your Node API server URL.",
    });
  }

  const apiPath = getApiPath(req);
  const queryStart = req.url?.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
  const url = `${backend}${apiPath}${queryStart}`;

  try {
    const headers = { ...req.headers };
    delete headers.host;
    delete headers.connection;

    const fetchOptions = {
      method: req.method,
      headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      fetchOptions.body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    const upstream = await fetch(url, fetchOptions);

    res.status(upstream.status);

    upstream.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (lower !== "transfer-encoding" && lower !== "connection") {
        res.setHeader(key, value);
      }
    });

    const buffer = Buffer.from(await upstream.arrayBuffer());
    return res.send(buffer);
  } catch (err) {
    console.error("[Vercel API proxy]", err.message);
    return res.status(502).json({
      error: "Backend unreachable.",
      backend,
      detail: err.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
