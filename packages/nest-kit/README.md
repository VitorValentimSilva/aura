# aura-nest-kit

Bootstrap building blocks shared by `apps/api` and `apps/worker` — two NestJS services that boot the same way (Prisma connection, cache health check, Sentry wiring, env-driven configuration) but expose different feature sets.

What belongs here: code that is identical, or differs only by an injected parameter, across both apps. What does not: anything that depends on api-only or worker-only concerns (e.g. `apps/api`'s `RateLimitGuard` — the worker has no public HTTP surface to rate-limit).

Consumed by: `apps/api`, `apps/worker`.
