# ADR 004: Uma organização, três projetos no Sentry (web/api/worker)

- Status: accepted
- Data: 2026-08-18

## Contexto

Havia duas opções: um único projeto Sentry cobrindo os três serviços, ou um projeto por serviço sob a mesma organização (`aura`).

## Decisão

Uma organização (`aura`), três projetos: `aura-web` (plataforma Next.js), `aura-api` e `aura-worker` (Node/NestJS).

## Consequências

- Releases e source maps são versionados de formas diferentes por serviço (web via Vercel, api/worker via imagem Docker) — um projeto único misturaria os namespaces de release.
- Alertas e quota ficam isolados: um loop de erro no worker não dispara o alerta de erro do checkout no web, nem consome a cota de eventos do front.
- Cada projeto ganha a UI certa pra sua plataforma (Web Vitals no `aura-web`, spans de banco no `aura-api`/`aura-worker`).
- Trace distribuído **continua funcionando entre os três projetos** — o Sentry costura o mesmo `trace_id` via headers `sentry-trace`/`baggage`, então uma requisição que atravessa web → api → worker aparece como um trace único na UI, mesmo estando em projetos diferentes.
