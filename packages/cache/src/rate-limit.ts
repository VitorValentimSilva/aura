import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { cacheEnv } from "./env.js";

export interface RateLimitDecision {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface RateLimiter {
  limit(identifier: string): Promise<RateLimitDecision>;
}

export interface RateLimiterOptions {
  name: string;
  limit: number;
  windowSeconds: number;
}

function createNoopLimiter(): RateLimiter {
  return {
    limit(): Promise<RateLimitDecision> {
      return Promise.resolve({
        success: true,
        limit: Number.POSITIVE_INFINITY,
        remaining: Number.POSITIVE_INFINITY,
        reset: 0,
      });
    },
  };
}

export function createRateLimiter(options: RateLimiterOptions): RateLimiter {
  if (!cacheEnv.RATE_LIMIT_ENABLED) {
    return createNoopLimiter();
  }

  if (!cacheEnv.UPSTASH_REDIS_REST_URL || !cacheEnv.UPSTASH_REDIS_REST_TOKEN) {
    console.warn(
      `[aura-cache] rate limiter "${options.name}" disabled — UPSTASH_REDIS_REST_URL/TOKEN not configured.`,
    );

    return createNoopLimiter();
  }

  const redis = new Redis({
    url: cacheEnv.UPSTASH_REDIS_REST_URL,
    token: cacheEnv.UPSTASH_REDIS_REST_TOKEN,
  });

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(options.limit, `${options.windowSeconds} s`),
    prefix: `${cacheEnv.CACHE_NAMESPACE}:ratelimit:${options.name}`,
    analytics: false,
  });

  return {
    async limit(identifier: string): Promise<RateLimitDecision> {
      const result = await ratelimit.limit(identifier);

      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    },
  };
}

export const RATE_LIMIT_PRESETS = {
  AUTH_STRICT: { limit: 5, windowSeconds: 60 },
  API_DEFAULT: { limit: 100, windowSeconds: 60 },
  PUBLIC_PAGE: { limit: 300, windowSeconds: 60 },
} as const satisfies Record<string, Omit<RateLimiterOptions, "name">>;
