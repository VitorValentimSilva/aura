# Deploy em Railway (ou Render/Fly.io)

Estes arquivos são um exemplo concreto pra Railway. Se você preferir Render ou Fly.io, a ideia é a mesma — cada plataforma tem seu próprio jeito de apontar pra um Dockerfile específico dentro de um monorepo; use `infrastructure/docker/Dockerfile.api`/`Dockerfile.worker` como o Dockerfile de cada serviço.

## Passos manuais no painel do Railway (não dá pra automatizar por código)

1. Crie um projeto novo no Railway e conecte o repositório do GitHub.
2. **Serviço `aura-api`**: New Service → GitHub Repo → selecione este repo.
   - Settings → Build → **Builder**: Dockerfile.
   - Settings → Build → **Dockerfile Path**: `infrastructure/docker/Dockerfile.api`.
   - Settings → Build → **Root Directory**: deixe `/` (raiz do monorepo) — o Dockerfile precisa do contexto completo, não só de `apps/api`.
   - Settings → Deploy → cole o conteúdo de `api.railway.json` (ou aponte "Config as Code Path" pra esse arquivo).
   - Settings → Networking → gere um domínio público, ou mantenha privado se só `apps/web` for consumir via rede interna do Railway.
   - Variables → adicione todas as variáveis de `apps/api/.env.example` com valores reais (`DATABASE_URL`, `SENTRY_DSN_API`, `UPSTASH_REDIS_REST_URL`/`TOKEN`, etc.) — build args (`DATABASE_URL` dummy é só pro build, a real vai aqui como variável de runtime.
3. **Serviço `aura-worker`**: repita o passo 2 trocando `api` por `worker` em tudo (Dockerfile, railway.json, variáveis do `apps/worker/.env.example`).
4. Se `apps/web` também for hospedado aqui (em vez de Vercel): New Service apontando pro `infrastructure/docker/Dockerfile.web`, variáveis de `apps/web/.env.example`.
5. Configure `SENTRY_AUTH_TOKEN` e `GIT_SHA` como **build args** (não variáveis de runtime) nas configurações de build de cada serviço, para o Dockerfile conseguir subir sourcemaps e marcar o release no Sentry — ver `.github/workflows/deploy-api.yml`/`deploy-worker.yml`.
