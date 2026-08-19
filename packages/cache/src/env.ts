import { createEnv, optionalString, optionalUrl } from "aura-config/server";
import { z } from "zod";

const cacheEnvSchema = z.object({
  UPSTASH_REDIS_REST_URL: optionalUrl(),
  UPSTASH_REDIS_REST_TOKEN: optionalString(),
  CACHE_DRIVER: z.enum(["upstash", "memory"]).default("memory"),
  CACHE_NAMESPACE: z.string().min(1).default("aura:dev"),
  CACHE_DEFAULT_TTL_SECONDS: z.coerce.number().int().positive().default(300),
  RATE_LIMIT_ENABLED: z
    .string()
    .default("true")
    .transform((value) => value !== "false"),
});

export const cacheEnv = createEnv(cacheEnvSchema);
