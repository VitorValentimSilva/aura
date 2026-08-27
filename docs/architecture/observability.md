# Observabilidade — como o trace atravessa web → api → worker

Os três apps usam SDKs oficiais do Sentry (`@sentry/nextjs`, `@sentry/nestjs`) — ver ADR 001 pra por que não há um OpenTelemetry Collector separado.

## Onde cada peça mora

- **`apps/web`**: `src/instrumentation-client.ts` (browser), `sentry.server.config.ts` + `sentry.edge.config.ts` (server/edge, carregados via `src/instrumentation.ts`), `next.config.ts` (`withSentryConfig`, sourcemaps, tunnel em `/monitoring`).
- **`apps/api`/`apps/worker`**: `src/instrument.ts` (chamado como primeiro import de `main.ts`, faz `Sentry.init`), `src/observability/observability.module.ts` (`SentryModule.forRoot()` + `SentryGlobalFilter` como `APP_FILTER`).
- **`packages/observability`**: decide as opções (sampling, scrubbing, release, ignore lists) — nenhum app faz `Sentry.init` sem passar por `buildBaseSentryOptions()`.

## Tunnel e o middleware de i18n

`apps/web` usa `next-intl` no `src/proxy.ts`, cujo matcher intercepta toda rota exceto `/api`, `_next`, `_vercel`. O tunnel do Sentry (`/monitoring`, configurado em `next.config.ts`) precisa **também** estar excluído desse matcher, senão o `next-intl` redireciona `/monitoring` pra `/<locale>/monitoring` e mata o tunnel — por isso o matcher inclui `monitoring` na negação.

## DSN ausente = no-op, não erro

Todo `Sentry.init` deste projeto usa `enabled: Boolean(dsn)` (via `buildBaseSentryOptions`). Sem `SENTRY_DSN_API`/`SENTRY_DSN_WORKER`/`NEXT_PUBLIC_SENTRY_DSN` configurados, o SDK simplesmente não envia nada — nenhum app quebra por falta de configuração do Sentry. Ver `docs/runbooks/observability.md` pra como configurar de verdade.

## Trace distribuído entre projetos

Mesmo com 3 projetos Sentry separados (ADR 004), o Sentry costura o mesmo `trace_id` entre eles via headers `sentry-trace`/`baggage`. `aura-sdk` (usado por `apps/web`/`apps/worker` pra chamar a api) tem um hook `getTraceHeaders` pra isso — quem instancia o cliente injeta `Sentry.getTraceData()` do seu próprio SDK, já que `aura-sdk` não pode depender de nenhum `@sentry/*` específico.
