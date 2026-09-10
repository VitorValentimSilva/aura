import type { CacheDriver } from "../driver.js";

export function createMemoryDriver(): CacheDriver {
  const store = new Map<string, unknown>();

  return {
    set<T>(key: string, value: T): Promise<void> {
      store.set(key, value);

      return Promise.resolve();
    },
  };
}
