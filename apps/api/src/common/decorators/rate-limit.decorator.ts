import { SetMetadata } from "@nestjs/common";
import { RATE_LIMIT_PRESETS } from "aura-cache";

export const RATE_LIMIT_KEY = "rateLimit";

export interface RateLimitOptions {
  name: string;
  limit: number;
  windowSeconds: number;
}

export const RateLimit = (preset: keyof typeof RATE_LIMIT_PRESETS) =>
  SetMetadata<string, RateLimitOptions>(RATE_LIMIT_KEY, {
    name: preset,
    ...RATE_LIMIT_PRESETS[preset],
  });
