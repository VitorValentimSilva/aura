# Cache — camadas e onde cada uma vive

## Duas camadas, não uma

1. **Next.js Data Cache** (nativo do framework, `fetch`/`revalidate`) — cache local ao processo/build do `apps/web`.
2. **Upstash Redis via `aura-cache`** — cache **cross-instância**, compartilhado entre todas as réplicas de `apps/api`/`apps/worker` e (com namespace próprio) `apps/web`. Não substitui o cache nativo do Next, complementa.

## `aura-cache` — como funciona

- `CACHE_DRIVER=memory` (padrão): `Map` em processo, zero infra, usado em dev/teste.
- `CACHE_DRIVER=upstash`: Redis de verdade via `@upstash/redis` (REST/HTTP). Se as credenciais (`UPSTASH_REDIS_REST_URL`/`TOKEN`) não estiverem configuradas mesmo com o driver setado como `upstash`, cai pra memória com um aviso no console — nunca quebra o boot.
- **Fail-open em toda operação de leitura/escrita**: um erro falando com o Redis nunca derruba a aplicação, só é logado (`remember()`/`invalidate()` engolem o erro via `safely()`). Testado em `packages/cache` apontando pra um endpoint inalcançável — a aplicação continua respondendo com o valor do loader.
- **Namespace por ambiente**: `CACHE_NAMESPACE` (`aura:dev`/`aura:prod`) evita colisão entre ambientes compartilhando o mesmo Redis. `apps/web` usa um prefixo `web:` adicional (`src/lib/cache.ts`) pra não colidir com chaves de `apps/api`/`apps/worker`.
- **Tags**: `invalidateTag()` usa prefixo de chave + `SCAN`/`DEL` (Upstash não tem tag nativa) — ver `packages/cache/src/tags.ts`.

## Rate limiting

`@upstash/ratelimit` (sliding window) — presets em `RATE_LIMIT_PRESETS` (`AUTH_STRICT`, `API_DEFAULT`, `PUBLIC_PAGE`). Sem Redis configurado, vira um limiter no-op (sempre permite) — mesma filosofia fail-open.

- `apps/api`: `RateLimitGuard` como `APP_GUARD` global, decorators `@RateLimit(preset)`/`@SkipRateLimit()`. Precisa de `app.set("trust proxy", 1)` em `main.ts` pra `req.ip` refletir o IP real atrás do proxy do PaaS.
- `apps/web`: `src/proxy.ts` aplica rate-limit em toda página (`PUBLIC_PAGE`) antes de repassar pro middleware do `next-intl`; usa os headers `x-forwarded-for`/`x-real-ip` (o campo `request.ip` do Next não é mais confiável entre plataformas).
