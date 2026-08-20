# aura-cache

Cache-aside and rate limiting on [Upstash Redis](https://upstash.com) (`@upstash/redis`, REST/HTTP — works on serverless and edge runtimes), with an in-memory driver as a fallback for dev/testing without relying on infrastructure.

Principles:

-**Fail-open**: a failure when talking to Redis never crashes the application — it is only logged (see `safely()` in `errors.ts`); Anyone who wants to treat this as an observability event can pass an `onError` callback.
\-**`CACHE_DRIVER=memory`**(default) uses an in-process `Map` — zero infrastructure, great for local dev and testing. `CACHE_DRIVER=upstash` actually uses Redis; if the credentials are not configured, it drops to memory with a warning in the console instead of crashing the boot.
-Rate limiting (`createRateLimiter`) depends on real Redis (the lib `@upstash/ratelimit` does not operate on the in-memory driver); without configured credentials, it becomes a no-op limiter (always allows).
What's not included here: BullMQ or any job queue — Upstash's REST client is not compatible with the protocol that BullMQ requires (see `docs/architecture/adr/002-upstash-rest-cache-only.md`).

Consumed by: `apps/web`, `apps/api`, `apps/worker`.
