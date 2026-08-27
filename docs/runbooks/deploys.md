# Runbook: Deploys e rollback

## Fluxo normal

1. Merge em `main`.
2. `.github/workflows/ci.yml` já rodou no PR (build, lint, typecheck, test, e2e).
3. O PaaS escolhido (Railway/Render/Fly.io — ver `infrastructure/railway/README.md`) detecta o push via sua própria integração com o GitHub e builda/sobe `apps/api`/`apps/worker` a partir dos Dockerfiles em `infrastructure/docker/`.
4. `.github/workflows/deploy-api.yml`/`deploy-worker.yml` rodam em paralelo, criando um release no Sentry (nome = SHA do commit) e subindo os sourcemaps.
5. Vercel builda/sobe `apps/web` via sua própria integração (Root Directory = `apps/web`, `ignoreCommand` em `apps/web/vercel.json` pula builds quando nada relevante mudou).

## Configuração inicial da Vercel (uma vez só)

1. Conectar o repositório GitHub à Vercel e criar o projeto com **Root Directory = `apps/web`**.
2. Confirmar que a Vercel detectou o monorepo pnpm (lockfile na raiz) — `apps/web/vercel.json` já define `installCommand`/`buildCommand` explícitos rodando a partir da raiz via Turborepo, então não depende de detecção automática.
3. Project Settings → Environment Variables (escopo **Production + Preview**), setar todas as chaves de `apps/web/.env.example`, incluindo as do Clerk (ver `docs/runbooks/auth.md`) e `SENTRY_AUTH_TOKEN` (necessário pro upload de sourcemaps durante o `next build` da própria Vercel).
4. Domínio custom (opcional): Project Settings → Domains.
5. Rodar um deploy de teste, verificar que o tunnel do Sentry (`/monitoring`) responde e que um erro forçado aparece no projeto `aura-web` do Sentry.

## Rollback

- **apps/web (Vercel)**: painel do Vercel → Deployments → escolher um deployment anterior → "Promote to Production". Não precisa reverter o commit no git.
- **apps/api/apps/worker (PaaS)**: cada plataforma guarda deployments anteriores — use o rollback nativo dela (ex: Railway → Deployments → redeploy de uma versão anterior) em vez de reverter e re-buildar.
- Se o rollback for por causa de uma migration de banco problemática, reverter o deploy **não** reverte a migration — trate isso separadamente (ver `packages/database/prisma/migrations`).

## Verificar se um deploy específico está no ar

Cada projeto Sentry mostra o `release` ativo (SHA do commit). Compare com `git log --oneline -1 main` pra confirmar que o release esperado está mesmo em produção.

## Healthcheck que o PaaS usa

`GET /health/live` (liveness, sempre 200 se o processo está de pé) e `GET /health/ready` (checa Postgres + cache, pode retornar 503). O PaaS usa `/health/live` pro healthcheck de deploy (ver `infrastructure/railway/*.railway.json`) — não confundir os dois ao investigar por que um deploy foi marcado como falho.
