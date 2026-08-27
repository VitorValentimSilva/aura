# Monorepo: pnpm workspaces + Turborepo

- **Gerenciador de pacotes**: pnpm (versão travada em `devEngines.packageManager` na raiz).
- **Workspaces**: `apps/*` (deployáveis) e `packages/*` (compartilhados), declarados em `pnpm-workspace.yaml`.
- **Catálogo de versões** (`catalog:` em `pnpm-workspace.yaml`): `typescript`, `zod`, `tsup`, `@types/node`, `@sentry/nextjs`, `@sentry/nestjs`, `@upstash/redis`, `@upstash/ratelimit` — uma versão única pra cada um em todo o monorepo, evitando drift entre pacotes. Um pacote consome via `"zod": "catalog:"` no seu `package.json`.
- **Turborepo** (`turbo.json`) orquestra `build`, `dev`, `lint`, `test`, `typecheck` com cache local. `build` roda com `dependsOn: ["^build"]` (builda dependências primeiro); `typecheck` e `test` também, porque dependem dos `.d.ts`/dist dos pacotes que consomem (ver ADR 003).

## Como builda um pacote novo em `packages/`

Copie a estrutura de um pacote existente (`package.json`, `tsconfig.json`, `tsup.config.ts`) — todos seguem o mesmo padrão: build dual ESM/CJS via tsup, sem alias `@/*` interno, `exports` com condições `types`/`import`/`require`.

## Peculiaridade do lint

O script `lint` da raiz roda **um único** `eslint .` sobre o repo inteiro (não delega por pacote via turbo) — por isso ele precisa que os pacotes já estejam buildados (as regras type-aware do `typescript-eslint` resolvem tipos de `aura-*` via `node_modules`, que só existem depois do build). Rode `pnpm run build` antes de `pnpm run lint` num checkout limpo.
