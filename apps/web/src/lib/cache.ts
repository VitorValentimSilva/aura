import {
  cacheKey as baseCacheKey,
  invalidate,
  invalidateTag,
  remember as baseRemember,
  TTL,
} from "aura-cache";

export function cacheKey(...parts: (string | number)[]): string {
  return baseCacheKey("web", ...parts);
}

export function remember<T>(
  key: string,
  loader: () => Promise<T>,
  ttlSeconds: number = TTL.MEDIUM,
): Promise<T> {
  return baseRemember(cacheKey(key), loader, ttlSeconds, (error) => {
    console.warn(`[cache] error for key "${key}":`, error);
  });
}

export { invalidate, invalidateTag, TTL };
