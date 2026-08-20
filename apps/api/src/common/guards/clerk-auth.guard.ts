import type { ClerkClient } from "@clerk/backend";
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { apiEnv } from "aura-config/api";
import type { Request as ExpressRequest } from "express";

import { IS_PUBLIC_KEY } from "@/common/decorators/public.decorator";
import { CLERK_CLIENT } from "@/infra/auth/clerk-client.token";

export interface AuthenticatedRequest extends ExpressRequest {
  auth?: { userId: string; sessionId: string | null };
}

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CLERK_CLIENT) private readonly clerkClient: ClerkClient,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const requestState = await this.clerkClient.authenticateRequest(toWebRequest(request), {
      authorizedParties: apiEnv.CORS_ALLOWED_ORIGINS,
    });

    if (!requestState.isAuthenticated) {
      throw new UnauthorizedException(requestState.message ?? "Invalid or missing session token");
    }

    const auth = requestState.toAuth();

    request.auth = { userId: auth.userId, sessionId: auth.sessionId };

    return true;
  }
}

function toWebRequest(req: ExpressRequest): Request {
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") {
      headers.set(key, value);
    } else if (Array.isArray(value)) {
      headers.set(key, value.join(", "));
    }
  }

  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  return new Request(url, { method: req.method, headers });
}
