# aura-observability

Shared observability policy across `apps/web`, `apps/api`, and `apps/worker` — sampling, scrubbing, ignored error lists, and release/environment resolution. **Does not depend on any Sentry SDK** (neither `@sentry/nextjs` nor `@sentry/nestjs`): each app initializes its own SDK and uses this package only to determine the appropriate options, since the SDKs for each framework cannot be cross-imported.

What does not belong here: calls to `Sentry.init()` (this is the responsibility of each app, in `instrument.ts` or `instrumentation-client.ts`).

Consumed by: `apps/web`, `apps/api`, `apps/worker`.
