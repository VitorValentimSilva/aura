import { createRateLimiter, RATE_LIMIT_PRESETS } from "aura-cache";
import type { NextRequest } from "next/server";

export function identifierFromRequest(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  return forwardedFor?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
}

export const pageLimiter = createRateLimiter({
  name: "web-page",
  ...RATE_LIMIT_PRESETS.PUBLIC_PAGE,
});
export const apiLimiter = createRateLimiter({ name: "web-api", ...RATE_LIMIT_PRESETS.API_DEFAULT });
