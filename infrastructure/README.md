# infrastructure/

Tudo que não é código de aplicação: Docker, deploy no PaaS escolhido, nginx (só dev), scripts de apoio. CI/CD (GitHub Actions) fica em `.github/workflows/` na raiz do repo, não aqui — é onde o GitHub espera encontrar.

```
docker/
  Dockerfile.api          # produção — build multi-stage com turbo prune
  Dockerfile.worker        # produção — idem
  Dockerfile.web           # fallback opcional (produção real é Vercel)
  docker-compose.dev.yml   # só dev: Redis + serverless-redis-http (emula a API REST do Upstash)
railway/
  api.railway.json         # config de build/deploy do serviço aura-api
  worker.railway.json      # idem pro aura-worker
  README.md                # passo a passo manual no painel do Railway (ou equivalente Render/Fly)
nginx/
  nginx.dev.conf            # só dev, opcional — produção não usa nginx (o PaaS já faz proxy/TLS)
scripts/
  docker-build.sh           # build local de qualquer uma das 3 imagens
  release-version.sh        # versão de release (git SHA) usada como SENTRY_RELEASE
```

Decisão de arquitetura (por que não tem mais nginx/VPS aqui): `apps/api` e `apps/worker` vão pra um PaaS de containers (Railway, Render ou Fly.io escolhido pelo usuário), que já cuida de reverse proxy, TLS e roteamento — ver `docs/architecture/adr/005-paas-deployment.md`. `apps/web` vai pra Vercel (`apps/web/vercel.json`).
