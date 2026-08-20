# aura-sdk

TypeScript client typed to consume `apps/api`, used by `apps/web` and `apps/worker` — does not depend on Node.js (runs on edge/browser too).

```
src/
  http.ts       # createHttpClient: fetch com retry e propagação de sentry-trace/baggage para trace distribuído
  client.ts     # createAuraClient({ baseUrl, fetch }) — ponto de entrada
  errors.ts     # ApiRequestError
  resources/    # um arquivo por recurso da API (ainda vazio — a api só tem a rota default)
```

Consumed by: `apps/web`, `apps/worker`.
