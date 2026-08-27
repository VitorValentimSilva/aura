# Runbook: Cache (Upstash Redis)

## Invalidar uma chave/prefixo/tag

```ts
import { invalidate, invalidateTag } from "aura-cache"; // ou "@lib/cache" em apps/web

await invalidate("aura:dev:some:key");
await invalidateTag("users");
```

## "O cache não está funcionando" (sempre miss)

1. Confira `CACHE_DRIVER`. Se for `memory`, é esperado que reinícios do processo limpem tudo — não é bug, é o driver de dev.
2. Se for `upstash`, confira `UPSTASH_REDIS_REST_URL`/`TOKEN`. Faltando qualquer um dos dois, `aura-cache` cai pra memória silenciosamente com um `console.warn` — procure esse aviso no log do processo.
3. Confira `CACHE_NAMESPACE` — se dev e "produção local" usarem o mesmo Redis com o mesmo namespace, uma chave escrita por um ambiente aparece pro outro (pode parecer "cache errado", não "sem cache").

## Ver o que está no Redis

Console do Upstash → seu database → Data Browser, ou:

```bash
curl -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN" "$UPSTASH_REDIS_REST_URL/keys/aura:prod:*"
```

## Simular o Upstash localmente (sem tocar na conta real)

```bash
docker compose -f infrastructure/docker/docker-compose.dev.yml up
```

Depois aponte `.env.development`/`apps/web/.env.local` pra:

```
CACHE_DRIVER=upstash
UPSTASH_REDIS_REST_URL=http://localhost:8079
UPSTASH_REDIS_REST_TOKEN=example_token
```

## O Redis caiu — a aplicação também caiu?

Não deveria. `remember()`/`invalidate()` são fail-open (erro de cache vira breadcrumb no Sentry, nunca uma exceção pro chamador). Se uma feature realmente parou de funcionar por causa do Redis, é sinal de que ela está chamando o `CacheDriver` bruto (`getCacheDriver()`) em vez de `remember`/`invalidate` — os métodos brutos SÃO esperados pra propagar erro (é o que os health checks usam de propósito, pra detectar o problema).
