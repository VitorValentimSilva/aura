# ADR 006: Clerk para autenticação, sync via webhook, guard global com opt-out

- Status: accepted
- Data: 2026-08-19

## Contexto

O projeto precisava de autenticação (email/senha + Google OAuth) cobrindo `apps/web` (Next.js) e `apps/api` (NestJS), com os usuários espelhados na tabela `User` do Postgres (Neon).

## Decisão

**Provedor: Clerk**, em vez de Auth.js/NextAuth (self-hosted, exigiria implementar OAuth/senha/sessão à mão) ou Supabase Auth (acopla a um Postgres gerenciado pela Supabase, que não é o Neon já em uso). Clerk é hosted, cobre email/senha e Google OAuth com configuração majoritariamente no dashboard, e tem SDKs de primeira classe tanto pra Next.js (`@clerk/nextjs`) quanto pra Node puro (`@clerk/backend`, usado pela API).

**Sincronização via webhook** (Clerk → `POST /webhooks/clerk` em `apps/api`), não "criar linha no banco no momento do login pelo front". Razões:

- `apps/web` não tem (e não deveria ter) acesso direto ao Postgres — só `apps/api`/`apps/worker` dependem de `aura-database`.
- É o padrão oficialmente documentado pela Clerk para manter uma cópia local dos dados de usuário.
- Cobre também os casos em que o usuário é criado/editado/removido fora do fluxo normal de login (ex.: pelo dashboard da própria Clerk).

**Guard global (`ClerkAuthGuard` via `APP_GUARD`) com decorator `@Public()` de opt-out**, em vez de proteger rota por rota. Mesmo padrão já usado pelo `RateLimitGuard`/`@SkipRateLimit()`: fail-closed por padrão é mais seguro que fail-open — um novo endpoint esquecido de proteger fica bloqueado por padrão, não exposto por padrão.

**Verificação de sessão via Bearer token** (`@clerk/backend`'s `authenticateRequest()`), não cookie cross-domain — `apps/web` (Vercel) e `apps/api` (Railway/PaaS) são domínios diferentes, então o cookie de sessão da Clerk não atravessa; o front usa `getToken()` e manda `Authorization: Bearer <token>`.

**`user.deleted` faz hard delete**, não soft-delete — não havia (e não há hoje) nenhuma tabela referenciando `User`, e não é um requisito atual; soft-delete pode ser adicionado depois se aparecer necessidade real de retenção/auditoria.

## Consequências

- `apps/api` precisa de `rawBody: true` no `NestFactory.create` só para o endpoint de webhook validar a assinatura svix contra os bytes exatos recebidos.
- CORS precisa estar habilitado em `apps/api` (`CORS_ALLOWED_ORIGINS`) — não existia antes desta mudança.
- Rotas de `sign-in`/`sign-up`/`dashboard` entram como novos route groups dentro de `[locale]/`, com `path`/`fallbackRedirectUrl` calculados a partir do locale atual — as env vars estáticas padrão da Clerk (`NEXT_PUBLIC_CLERK_SIGN_IN_URL`) não são locale-aware, então não são usadas.
- `createRouteMatcher()`/`auth.protect()` em middleware está deprecado nesta versão do `@clerk/nextjs` (7.x) em favor de checagem por página/recurso — a proteção da rota `/dashboard` é feita na própria página via `auth()` + `redirect()`, não no `proxy.ts`.
