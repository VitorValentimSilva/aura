import type { Redis } from "@upstash/redis";

import type { CacheDriver } from "../driver.js";

export function createUpstashDriver(client: Redis): CacheDriver {
  return {
    async get<T>(key: string): Promise<T | null> {
      const value = await client.get<T>(key);

      return value ?? null;
    },

    async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
      if (ttlSeconds) {
        await client.set(key, value, { ex: ttlSeconds });
      } else {
        await client.set(key, value);
      }
    },

    async del(key: string): Promise<void> {
      await client.del(key);
    },

    async delByPrefix(prefix: string): Promise<void> {
      let cursor = "0";

      do {
        const [nextCursor, keys] = await client.scan(cursor, { match: `${prefix}*`, count: 100 });

        if (keys.length > 0) {
          await client.del(...keys);
        }

        cursor = nextCursor;
      } while (cursor !== "0");
    },

    async incr(key: string): Promise<number> {
      return client.incr(key);
    },
  };
}
