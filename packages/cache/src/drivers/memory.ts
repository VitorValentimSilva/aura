import type { CacheDriver } from "../driver.js";

interface MemoryEntry {
  value: unknown;
  expiresAt: number | null;
}

export function createMemoryDriver(): CacheDriver {
  const store = new Map<string, MemoryEntry>();

  function isExpired(entry: MemoryEntry): boolean {
    return entry.expiresAt !== null && entry.expiresAt <= Date.now();
  }

  return {
    get<T>(key: string): Promise<T | null> {
      const entry = store.get(key);

      if (!entry || isExpired(entry)) {
        store.delete(key);

        return Promise.resolve(null);
      }

      return Promise.resolve(entry.value as T);
    },

    set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
      store.set(key, {
        value,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
      });

      return Promise.resolve();
    },

    del(key: string): Promise<void> {
      store.delete(key);

      return Promise.resolve();
    },

    delByPrefix(prefix: string): Promise<void> {
      for (const key of store.keys()) {
        if (key.startsWith(prefix)) {
          store.delete(key);
        }
      }

      return Promise.resolve();
    },

    incr(key: string): Promise<number> {
      const entry = store.get(key);
      const current = entry && !isExpired(entry) ? Number(entry.value) : 0;
      const next = current + 1;

      store.set(key, { value: next, expiresAt: entry?.expiresAt ?? null });

      return Promise.resolve(next);
    },
  };
}
