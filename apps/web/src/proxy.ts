import { clerkMiddleware } from "@clerk/nextjs/server";
import { routing } from "@i18n/routing";
import { identifierFromRequest, pageLimiter } from "@lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (_auth, request: NextRequest) => {
  const decision = await pageLimiter.limit(identifierFromRequest(request));

  if (!decision.success) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(Math.max(0, Math.ceil((decision.reset - Date.now()) / 1000))),
      },
    });
  }

  return intlMiddleware(request);
});

export const config = {
  matcher: ["/((?!api|monitoring|_next|_vercel|.*\\..*).*)"],
};
