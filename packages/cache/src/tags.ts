import { getCacheDriver } from "./client.js";
import { safely } from "./errors.js";
import { cacheKey } from "./keys.js";

export function taggedKey(tag: string, key: string): string {
  return cacheKey("tag", tag, key);
}

export async function invalidateTag(tag: string): Promise<void> {
  const driver = getCacheDriver();
  const prefix = cacheKey("tag", tag);

  await safely(() => driver.delByPrefix(prefix), undefined);
}
