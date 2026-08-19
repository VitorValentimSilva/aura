import { getCacheDriver } from "./client.js";
import { safely } from "./errors.js";
import { TTL } from "./ttl.js";

export async function remember<T>(
  key: string,
  loader: () => Promise<T>,
  ttlSeconds: number = TTL.MEDIUM,
  onError?: (error: unknown) => void,
): Promise<T> {
  const driver = getCacheDriver();

  const cached = await safely(() => driver.get<T>(key), null, onError);

  if (cached !== null) {
    return cached;
  }

  const value = await loader();

  await safely(() => driver.set(key, value, ttlSeconds), undefined, onError);

  return value;
}

export async function invalidate(...keys: string[]): Promise<void> {
  const driver = getCacheDriver();

  await Promise.all(keys.map((key) => safely(() => driver.del(key), undefined)));
}
