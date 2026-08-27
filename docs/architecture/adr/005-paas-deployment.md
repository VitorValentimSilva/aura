# ADR 005: apps/api e apps/worker em um PaaS de containers, sem nginx/VPS próprio

- Status: accepted
- Data: 2026-08-18

## Contexto

`apps/web` já tem um destino natural (Vercel, dado que é Next.js). Para `apps/api` e `apps/worker`, as opções eram: (a) uma VPS com Docker Compose + nginx como reverse proxy próprio, ou (b) um PaaS de containers (Railway, Render ou Fly.io) que builda a partir de um Dockerfile e já cuida de proxy reverso, TLS e roteamento.

## Decisão

PaaS de containers. `infrastructure/railway/` traz um exemplo concreto pra Railway (a mesma ideia se aplica a Render/Fly.io, trocando só a config específica da plataforma).

## Consequências

- Não existe nginx de produção neste projeto — `infrastructure/nginx/nginx.dev.conf` é só pra teste local opcional.
- `infrastructure/docker/Dockerfile.api` e `Dockerfile.worker` são o contrato real de deploy: qualquer plataforma que builde a partir de um Dockerfile funciona.
- O deploy em si (build + subida do container) fica a cargo da integração nativa da plataforma com o GitHub — `.github/workflows/deploy-api.yml`/`deploy-worker.yml` cuidam só de registrar o release e subir sourcemaps pro Sentry, não do deploy.
- Migrar de Railway pra Render/Fly.io no futuro não exige tocar no Dockerfile — só na config específica da plataforma em `infrastructure/`.
