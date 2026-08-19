import { cacheEnv } from "./env.js";

export function cacheKey(...parts: (string | number)[]): string {
  return [cacheEnv.CACHE_NAMESPACE, ...parts].join(":");
}
