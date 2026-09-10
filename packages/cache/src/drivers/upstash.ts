import type { Redis } from "@upstash/redis";

import type { CacheDriver } from "../driver.js";

export function createUpstashDriver(client: Redis): CacheDriver {
  return {
    async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
      if (ttlSeconds) {
        await client.set(key, value, { ex: ttlSeconds });
      } else {
        await client.set(key, value);
      }
    },
  };
}
