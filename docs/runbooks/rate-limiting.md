# Runbook: Rate limiting

## Presets disponíveis

`RATE_LIMIT_PRESETS` (`packages/cache/src/rate-limit.ts`): `AUTH_STRICT` (5/min), `API_DEFAULT` (100/min), `PUBLIC_PAGE` (300/min).

## Subir/baixar o limite de uma rota (apps/api)

```ts
import { RateLimit } from "@/common/decorators/rate-limit.decorator";

@RateLimit("AUTH_STRICT")
@Post("login")
login() { ... }
```

Pra um preset novo (fora dos três padrão), adicione em `RATE_LIMIT_PRESETS` — evite criar limiters ad-hoc espalhados pelo código.

## Isentar uma rota (ex: health check)

```ts
import { SkipRateLimit } from "@/common/decorators/skip-rate-limit.decorator";

@SkipRateLimit()
@Get("health/live")
```

## "Meu IP está tomando 429 sem motivo" / desbloquear um cliente

- Confira se `app.set("trust proxy", 1)` está de fato configurado (`apps/api/src/main.ts`) — sem isso, `req.ip` vira o IP do proxy do PaaS, e **todo mundo atrás dele compartilha o mesmo limite**.
- O limite reseta sozinho após a janela (`windowSeconds` do preset). Pra resetar manualmente, delete a chave no Upstash: as chaves de rate-limit ficam sob o prefixo `<CACHE_NAMESPACE>:ratelimit:<nome>`.

## Interpretar um 429

A resposta inclui `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (timestamp) e `Retry-After` (segundos) — use `Retry-After` pra decidir quando tentar de novo.

## Sem Upstash configurado, o rate limit "não funciona" — é esperado

Sem `UPSTASH_REDIS_REST_URL`/`TOKEN`, `createRateLimiter()` retorna um limiter no-op (sempre permite, `X-RateLimit-Limit: Infinity`). Configure o Upstash (`docs/runbooks/cache.md`) pra ativar de verdade.
