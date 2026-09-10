export interface CacheDriver {
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
}
