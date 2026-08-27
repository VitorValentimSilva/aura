import { Injectable, Logger } from "@nestjs/common";
import { getCacheDriver, invalidate, invalidateTag, remember, TTL } from "aura-cache";

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  remember<T>(key: string, loader: () => Promise<T>, ttlSeconds: number = TTL.MEDIUM): Promise<T> {
    return remember(key, loader, ttlSeconds, (error) => {
      this.logger.warn(`cache error for key "${key}", falling back to loader: ${String(error)}`);
    });
  }

  invalidate(...keys: string[]): Promise<void> {
    return invalidate(...keys);
  }

  invalidateTag(tag: string): Promise<void> {
    return invalidateTag(tag);
  }

  /**
   * Idempotency lock: returns true if the caller acquired the lock (should
   * proceed), false if another worker already holds it for `ttlSeconds`.
   */
  async acquireLock(key: string, ttlSeconds: number): Promise<boolean> {
    const driver = getCacheDriver();
    const existing = await driver.get<true>(key);

    if (existing) {
      return false;
    }

    await driver.set(key, true, ttlSeconds);

    return true;
  }
}
