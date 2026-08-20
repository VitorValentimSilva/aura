import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import type { AuthenticatedRequest } from "@/common/guards/clerk-auth.guard";

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

  if (!request.auth) {
    throw new Error("@CurrentUser() used on a route not protected by ClerkAuthGuard");
  }

  return request.auth.userId;
});
