# Rotação de segredos

## `SENTRY_AUTH_TOKEN`

1. sentry.io → Settings da organização → Auth Tokens → Create New Token (escopos `project:releases` + `org:read`).
2. Atualize o secret `SENTRY_AUTH_TOKEN` no GitHub (Settings → Secrets and variables → Actions) e na Vercel (Environment Variables).
3. Revogue o token antigo só depois de confirmar que um build novo funcionou com o token novo.

## `UPSTASH_REDIS_REST_TOKEN`

1. Console do Upstash → seu database → Details → Danger Zone → Reset Password/Token (ou crie um token read-only separado se algum consumidor só precisa ler).
2. Atualize a variável em todo lugar que a usa: `.env.production` (não commitado), variáveis do PaaS (api/worker), Vercel (web).
3. Como o cache é fail-open, um token velho simplesmente para de autenticar (fallback pra memória com aviso) — não derruba a aplicação, mas o cache "para de funcionar" até o token novo ser propagado em todo lugar.

## `DATABASE_URL` (Neon)

1. Console do Neon → o projeto → Connection Details → Reset password (gera uma nova connection string).
2. Atualize `.env.production` e as variáveis do PaaS. Diferente do cache, isso **é** obrigatório — a aplicação não sobe sem `DATABASE_URL` válido.

## Regra geral

Nunca commitar um valor real de segredo em `.env.example` — só placeholders vazios ou óbvios (`""`, `postgresql://user:password@host/db`). Os arquivos `.env.development`/`.env.production` reais são gitignored (`.gitignore`: `.env*` com exceção só de `.env.example`).
