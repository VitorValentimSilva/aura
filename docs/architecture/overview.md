# Visão geral da arquitetura

```
apps/web  ──HTTP──▶  apps/api  ──┬──▶ Neon Postgres (via packages/database)
   │                    │        └──▶ Upstash Redis (via aura-cache)
   │                    │
   └──rate-limit/cache──┘
                        apps/worker ──┬──▶ Neon Postgres
                                      └──▶ Upstash Redis (locks de idempotência)

Todos os três (web, api, worker) reportam erros/performance/traces pro Sentry
(um projeto por serviço, mesma organização) — ver docs/architecture/observability.md.
```

- **apps/web** — Next.js 16 (App Router), landing page + futuras telas autenticadas. Deploy: Vercel.
- **apps/api** — NestJS 11, a API principal. Deploy: PaaS de containers (Railway/Render/Fly.io).
- **apps/worker** — NestJS 11, processamento assíncrono / IA / jobs. Mesmo destino de deploy do api.
- **packages/database** — único ponto de acesso ao Postgres (Neon), via Prisma 7 com driver adapter.
- **packages/cache** — único ponto de acesso ao Redis (Upstash), cache-aside + rate-limit.
- **packages/observability** — política de Sentry compartilhada (sampling, scrubbing, release/environment).
- **packages/config** — leitura/validação de env por app, via subpaths (`aura-config/api`, `/worker`, `/web`, `/client`).
- **packages/{types,constants,utils,validation,domain,sdk,ai,ui}** — ver `docs/architecture/packages.md`.

Trace distribuído: uma requisição que entra pelo `apps/web`, chama `apps/api`, e dispara um job no `apps/worker` mantém o mesmo `trace_id` no Sentry através de `sentry-trace`/`baggage` propagados via `aura-sdk`.
