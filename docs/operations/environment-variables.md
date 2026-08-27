# Variáveis de ambiente

Fonte de verdade em código: `packages/config/src/{api,worker,web,client}.ts` (schemas zod). Esta tabela é uma referência rápida — se divergir do código, o código manda.

## Raiz (`.env.development`/`.env.production`, lidas por `apps/api`/`apps/worker` via `load-env.ts`)

| Variável                       | Segredo? | Obrigatória?                             | Descrição                                                                                                 |
| ------------------------------ | -------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                     | não      | sim (tem default)                        | `development`\|`test`\|`production`                                                                       |
| `DATABASE_URL`                 | **sim**  | sim                                      | Connection string do Neon Postgres                                                                        |
| `SENTRY_DSN_API`               | não*     | não                                      | DSN do projeto `aura-api`                                                                                 |
| `SENTRY_DSN_WORKER`            | não*     | não                                      | DSN do projeto `aura-worker`                                                                              |
| `SENTRY_ENVIRONMENT`           | não      | não                                      | Nome do environment no Sentry                                                                             |
| `SENTRY_TRACES_SAMPLE_RATE`    | não      | não                                      | 0.0–1.0                                                                                                   |
| `SENTRY_PROFILES_SAMPLE_RATE`  | não      | não                                      | 0.0–1.0                                                                                                   |
| `CACHE_DRIVER`                 | não      | não (default `memory`)                   | `memory`\|`upstash`                                                                                       |
| `CACHE_NAMESPACE`              | não      | não                                      | Prefixo de todas as chaves de cache                                                                       |
| `CACHE_DEFAULT_TTL_SECONDS`    | não      | não                                      | TTL padrão do `remember()`                                                                                |
| `RATE_LIMIT_ENABLED`           | não      | não (default `true`)                     | `"false"` desativa o rate-limit                                                                           |
| `UPSTASH_REDIS_REST_URL`       | não*     | não (a menos que `CACHE_DRIVER=upstash`) | REST endpoint do Upstash                                                                                  |
| `UPSTASH_REDIS_REST_TOKEN`     | **sim**  | não (idem)                               | Token do Upstash                                                                                          |
| `CLERK_SECRET_KEY`             | **sim**  | sim                                      | Secret key da Clerk — só `apps/api`                                                                       |
| `CLERK_PUBLISHABLE_KEY`        | não      | sim                                      | Publishable key (reaproveitada da mesma app Clerk; exigida pela construção do client do `@clerk/backend`) |
| `CLERK_WEBHOOK_SIGNING_SECRET` | **sim**  | sim                                      | Signing secret do endpoint `/webhooks/clerk`                                                              |
| `CORS_ALLOWED_ORIGINS`         | não      | não (default `http://localhost:3000`)    | Origens do `apps/web` autorizadas a chamar a API                                                          |

\* DSNs e a REST URL do Upstash não são segredos no sentido estrito (não dão acesso a nada sozinhos), mas evite deixá-los públicos sem necessidade.

## `apps/api`/`apps/worker`

Só `PORT` (3001/3002, com default) além das variáveis da raiz acima — ver `apps/api/.env.example`/`apps/worker/.env.example`.

## `apps/web` (`.env.local`, próprio da pasta — Next.js não lê o `.env.development` da raiz)

| Variável                                                                                | Segredo?  | Descrição                                                                                                                                |
| --------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                                                                              | não       | server-side                                                                                                                              |
| `SENTRY_AUTH_TOKEN`                                                                     | **sim**   | só usado em build/CI pra subir sourcemaps                                                                                                |
| `NEXT_PUBLIC_API_URL`                                                                   | não       | pública, embutida no bundle do browser                                                                                                   |
| `NEXT_PUBLIC_SENTRY_DSN`                                                                | não       | idem                                                                                                                                     |
| `NEXT_PUBLIC_SENTRY_ENVIRONMENT`                                                        | não       | idem                                                                                                                                     |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE`                                                 | não       | idem                                                                                                                                     |
| `CLERK_SECRET_KEY`                                                                      | **sim**   | server-side do Next (`auth()`, `clerkMiddleware()`) — mesma chave também configurada em `apps/api`, cada processo lê a sua própria cópia |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`                                                     | não       | pública, embutida no bundle do browser                                                                                                   |
| `CACHE_DRIVER`, `CACHE_NAMESPACE`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | ver acima | usadas server-side/edge (`src/proxy.ts`, `src/lib/cache.ts`) — **nunca** com prefixo `NEXT_PUBLIC_`                                      |

## Onde configurar em produção

- **Vercel** (`apps/web`): Project Settings → Environment Variables, escopo Production + Preview.
- **PaaS do api/worker**: Variables de cada serviço (ver `infrastructure/railway/README.md`).
- **GitHub Actions**: `SENTRY_AUTH_TOKEN` como Repository Secret (Settings → Secrets and variables → Actions).
