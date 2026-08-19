import { Redis } from "@upstash/redis";

import type { CacheDriver } from "./driver.js";
import { createMemoryDriver } from "./drivers/memory.js";
import { createUpstashDriver } from "./drivers/upstash.js";
import { cacheEnv } from "./env.js";

declare global {
  var __auraCacheDriver: CacheDriver | undefined;
}

function resolveDriver(): CacheDriver {
  if (cacheEnv.CACHE_DRIVER === "upstash") {
    if (cacheEnv.UPSTASH_REDIS_REST_URL && cacheEnv.UPSTASH_REDIS_REST_TOKEN) {
      const client = new Redis({
        url: cacheEnv.UPSTASH_REDIS_REST_URL,
        token: cacheEnv.UPSTASH_REDIS_REST_TOKEN,
      });

      return createUpstashDriver(client);
    }

    console.warn(
      "[aura-cache] CACHE_DRIVER=upstash but UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN are missing — falling back to the in-memory driver.",
    );
  }

  return createMemoryDriver();
}

export function getCacheDriver(): CacheDriver {
  globalThis.__auraCacheDriver ??= resolveDriver();

  return globalThis.__auraCacheDriver;
}
