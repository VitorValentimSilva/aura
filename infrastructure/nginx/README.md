# nginx (dev only)

Não faz parte da produção. O PaaS escolhido (Railway/Render/Fly.io) já termina TLS e faz proxy reverso — ver `infrastructure/railway/`.

Use isto só se quiser testar localmente `apps/web` e `apps/api` atrás de uma única origem, do jeito que ficariam atrás de um proxy reverso de verdade em algum outro tipo de deploy:

1. Rode `apps/web` (`pnpm --filter aura-web dev`) e `apps/api` (`pnpm --filter aura-api start:dev`) normalmente no host.
2. Rode o nginx apontando pro host:
   ```bash
   docker run --rm -p 8080:8080 \
     --add-host=host.docker.internal:host-gateway \
     -v "$(pwd)/infrastructure/nginx/nginx.dev.conf:/etc/nginx/nginx.conf:ro" \
     nginx:alpine
   ```
3. Acesse `http://localhost:8080` — `/api/*` vai pra api, o resto vai pro web.
