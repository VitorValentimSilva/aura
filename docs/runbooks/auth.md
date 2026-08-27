# Runbook: Autenticação (Clerk)

Ver `docs/architecture/adr/006-clerk-authentication.md` para o porquê das decisões. Este runbook é só o passo a passo prático.

## Configuração inicial (uma vez por instância — dev e produção são instâncias separadas)

1. Criar conta em clerk.com e uma Application nova (ex.: "aura").
2. **User & Authentication → Email, Phone, Username**: confirmar "Email address" habilitado como identificador (estratégia de senha ou código, à escolha) — isso já cobre o cadastro "normal" da Clerk.
3. **SSO Connections → Add connection → For all users → Google**:
   - Em desenvolvimento, as credenciais compartilhadas da própria Clerk já funcionam sem nenhuma configuração extra no Google Cloud Console.
   - Em produção, marcar "Use custom credentials", criar um OAuth Client ID/Secret no Google Cloud Console usando o redirect URI que a própria tela da Clerk mostra, e colar de volta no dashboard.
4. **API Keys**: copiar a `Publishable key` e a `Secret key`.
   - `apps/web/.env.local`: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY`.
   - Root `.env.development`/`.env.production` (lido por `apps/api`): `CLERK_SECRET_KEY` e `CLERK_PUBLISHABLE_KEY` (mesmos valores, cada arquivo é lido por um processo diferente).
5. **Webhooks → Add Endpoint**: URL = `https://<domínio-da-api>/webhooks/clerk`; eventos: `user.created`, `user.updated`, `user.deleted`. Copiar o **Signing Secret** para `CLERK_WEBHOOK_SIGNING_SECRET` no `.env` da API.
   - Em dev local, a Clerk precisa de uma URL pública — usar `ngrok http 3001` (ou similar) e registrar a URL do túnel como endpoint temporário.
6. Ao trocar de instância "Development" para "Production" no dashboard da Clerk, todas as chaves mudam — repetir os passos 4 e 5 com as novas chaves nos env vars de produção (Vercel + PaaS da API).

## Verificar que está tudo funcionando

1. `pnpm run dev`, acessar `/pt-BR/sign-up`, criar conta por email/senha — deve redirecionar pro `/pt-BR/dashboard` já autenticado.
2. Repetir com "Continuar com Google" — no dashboard da Clerk (Users), o novo usuário deve aparecer com `google` listado em External Accounts.
3. Conferir no Neon (tabela `User`) que a linha foi criada com `clerkId`, `email`, `firstName`, `imageUrl` preenchidos — prova que o webhook chegou e foi processado.
4. Deslogar e tentar acessar `/pt-BR/dashboard` direto — deve redirecionar pro sign-in.
5. `curl https://<api>/users/me` sem token → `401`. `curl https://<api>/health/live` sem token → `200` (prova que `@Public()` funciona e o resto fica protegido por padrão).

## Rotação de chaves

Se `CLERK_SECRET_KEY`/`CLERK_WEBHOOK_SIGNING_SECRET` vazarem: gerar novas no dashboard da Clerk (API Keys / Webhooks → Endpoint → Rotate), atualizar nos três lugares (`apps/web/.env.local`, root `.env.*`, e as env vars da Vercel/PaaS), redeploy.
