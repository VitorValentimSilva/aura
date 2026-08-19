# aura-constants

Shared enums and literal constants across `apps/web`, `apps/api`, and `apps/worker` — no logic, only fixed values that must remain identical across all three runtimes (e.g., service names used by Sentry).

What does not belong here: values that depend on environment variables (those belong in `aura-config`).

Consumed by: all apps and most other packages.
