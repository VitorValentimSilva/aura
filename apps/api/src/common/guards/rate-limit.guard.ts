import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { createRateLimiter, RATE_LIMIT_PRESETS, RateLimiter } from "aura-cache";
import type { Request, Response } from "express";

import { RATE_LIMIT_KEY, RateLimitOptions } from "@/common/decorators/rate-limit.decorator";
import { SKIP_RATE_LIMIT_KEY } from "@/common/decorators/skip-rate-limit.decorator";

const DEFAULT_RATE_LIMIT: RateLimitOptions = {
  name: "API_DEFAULT",
  ...RATE_LIMIT_PRESETS.API_DEFAULT,
};

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly limiters = new Map<string, RateLimiter>();

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_RATE_LIMIT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skip) {
      return true;
    }

    const options =
      this.reflector.getAllAndOverride<RateLimitOptions>(RATE_LIMIT_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? DEFAULT_RATE_LIMIT;

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const limiter = this.getLimiter(options);
    const identifier = request.ip ?? "unknown";
    const decision = await limiter.limit(identifier);

    response.setHeader("X-RateLimit-Limit", decision.limit);
    response.setHeader("X-RateLimit-Remaining", decision.remaining);
    response.setHeader("X-RateLimit-Reset", decision.reset);

    if (!decision.success) {
      response.setHeader(
        "Retry-After",
        Math.max(0, Math.ceil((decision.reset - Date.now()) / 1000)),
      );

      throw new HttpException("Too many requests", HttpStatus.TOO_MANY_REQUESTS);
    }

    return true;
  }

  private getLimiter(options: RateLimitOptions): RateLimiter {
    const existing = this.limiters.get(options.name);

    if (existing) {
      return existing;
    }

    const limiter = createRateLimiter(options);

    this.limiters.set(options.name, limiter);

    return limiter;
  }
}
