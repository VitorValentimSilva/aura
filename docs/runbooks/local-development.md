# Runbook: Ambiente de desenvolvimento local

## Primeira vez

```bash
pnpm install
cp .env.example .env.development   # preencha DATABASE_URL (Neon) e o resto
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env.example.local   # referência — os valores reais vêm do .env.development da raiz
```

`apps/api` e `apps/worker` **não** têm `.env` próprio — leem `.env.development`/`.env.production` da raiz do monorepo via `src/load-env.ts`. `apps/web` lê `.env.local` na própria pasta (padrão do Next.js).

## Rodar tudo

```bash
pnpm run dev   # turbo run dev --parallel: web (3000), api (3001), worker (3002)
```

## Cache local com Upstash de verdade emulado

```bash
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d
```

Sobe Redis + `serverless-redis-http` (fala o mesmo protocolo REST do Upstash) em `localhost:8079`. Configure `CACHE_DRIVER=upstash`, `UPSTASH_REDIS_REST_URL=http://localhost:8079`, `UPSTASH_REDIS_REST_TOKEN=example_token` no `.env.development`/`apps/web/.env.local` pra usar. Sem isso, `CACHE_DRIVER=memory` (padrão) já funciona sem nenhum container.

## Portas

| App                         | Porta |
| --------------------------- | ----- |
| `apps/web`                  | 3000  |
| `apps/api`                  | 3001  |
| `apps/worker`               | 3002  |
| Redis (dev)                 | 6379  |
| serverless-redis-http (dev) | 8079  |

## Comandos úteis

```bash
pnpm run build && pnpm run lint && pnpm run typecheck && pnpm run test   # gate completo, nessa ordem (ver docs/architecture/monorepo.md)
pnpm --filter aura-api run test:e2e
pnpm --filter aura-database run db:push:development     # aplica o schema no Neon de dev
```
