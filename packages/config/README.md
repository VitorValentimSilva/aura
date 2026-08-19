# aura-config

Environment variables validated with [Zod](https://zod.dev), one schema per runtime, and exposed only through **subpath exports** — never through the root `aura-config` path — so that an accidental import cannot leak a server-side variable into the browser bundle.

- `aura-config/server` — generic helper (`createEnv`) used internally by the other subpaths.
- `aura-config/api` — environment variables for `apps/api`.
- `aura-config/worker` — environment variables for `apps/worker`.
- `aura-config/web` — server-side environment variables for `apps/web` (never `NEXT_PUBLIC_*`).
- `aura-config/client` — browser-safe environment variables for `apps/web` (only `NEXT_PUBLIC_*`).

Each subpath exports a frozen object (parsed only once, on the first import) and an `assert*Env()` function that forces validation — importing the module already fails fast if a required variable is missing or invalid.

Consumed by: `apps/api`, `apps/worker`, `apps/web`.
