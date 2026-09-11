// Verifies a Cloudflare Turnstile token with Cloudflare's siteverify API.
// The secret key never leaves the server. Set TURNSTILE_SECRET_KEY in
// .env.local and in your host's environment settings.
const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Cloudflare's public test secret: always passes. Used only in development
// when no real secret has been configured.
const TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

function resolveSecret() {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY is not set; using Cloudflare's test secret (development only).");
    return TEST_SECRET_KEY;
  }
  return null;
}

export async function POST(request: Request) {
  let token: unknown;
  try {
    ({ token } = await request.json());
  } catch {
    return Response.json({ success: false, error: "invalid-body" }, { status: 400 });
  }
  if (typeof token !== "string" || !token || token.length > 2048) {
    return Response.json({ success: false, error: "missing-token" }, { status: 400 });
  }

  const secret = resolveSecret();
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not configured.");
    return Response.json({ success: false, error: "not-configured" }, { status: 503 });
  }

  const body = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  if (ip) body.set("remoteip", ip);

  try {
    const result = await fetch(SITEVERIFY_URL, { method: "POST", body, cache: "no-store" });
    const data = (await result.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("[turnstile] verification failed:", data["error-codes"]);
    return Response.json({ success: data.success === true });
  } catch (error) {
    console.error("[turnstile] siteverify request failed:", error);
    return Response.json({ success: false, error: "verification-unavailable" }, { status: 502 });
  }
}
