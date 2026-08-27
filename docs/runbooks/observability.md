# Runbook: Observabilidade (Sentry)

## "Não estou vendo eventos no Sentry"

1. Confira se o DSN certo está setado: `SENTRY_DSN_API`/`SENTRY_DSN_WORKER` (api/worker) ou `NEXT_PUBLIC_SENTRY_DSN` (web). Vazio = SDK desabilitado de propósito (`enabled: Boolean(dsn)`), não é bug.
2. Confira `SENTRY_ENVIRONMENT` — um evento em `development` não aparece se você estiver filtrando por `production` na UI do Sentry.
3. Force um erro de teste: em `apps/api`/`apps/worker`, qualquer exceção não tratada passa pelo `SentryGlobalFilter`. Em `apps/web`, acesse uma rota que lance erro — `global-error.tsx`/`[locale]/error.tsx` capturam via `Sentry.captureException`.

## Achar um trace específico

Cole o `trace_id` (aparece no header de resposta `sentry-trace` ou nos logs) na busca da Sentry UI (Performance → Trace View). Como os três projetos compartilham o mesmo trace via `sentry-trace`/`baggage`, dá pra ver a requisição atravessando web → api → worker mesmo estando em projetos diferentes.

## Silenciar um issue (ex: erro conhecido de terceiro)

Sentry UI → o issue → Ignore. Pra erros recorrentes e já conhecidos, considere adicionar em `packages/observability/src/filters.ts` (`IGNORE_ERRORS`/`DENY_URLS`) — isso filtra **antes** de chegar no Sentry, economizando quota.

## Validar upload de sourcemaps

`SENTRY_AUTH_TOKEN` vazio = upload pulado silenciosamente (comportamento esperado em dev). Em CI (`.github/workflows/deploy-api.yml`/`deploy-worker.yml`), o token vem de secret do GitHub — se o stacktrace aparecer minificado em produção, confira se o secret está configurado e se o step `getsentry/action-release` rodou sem erro no workflow.

## Rodar upload de sourcemaps manualmente (debug)

```bash
pnpm --filter aura-api run build
npx @sentry/cli sourcemaps inject apps/api/dist
SENTRY_AUTH_TOKEN=... npx @sentry/cli sourcemaps upload --org aura --project aura-api apps/api/dist
```
