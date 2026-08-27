# ADR 003: Pacotes compartilhados buildados com tsup (ESM + CJS + .d.ts)

- Status: accepted
- Data: 2026-08-18

## Contexto

Os pacotes em `packages/*` precisam ser consumidos por três runtimes diferentes: `apps/web` (Next.js 16, ESM/Turbopack), `apps/api`/`apps/worker` (NestJS, CommonJS) e Jest (`ts-jest`, CommonJS). Um alias de import (`@/*`) que o `tsc` não reescreve no emit gera `require("@/arquivo.js")` quebrado no dist — foi exatamente o bug encontrado em `packages/database` antes desta correção.

## Decisão

Todo pacote em `packages/*` builda com `tsup` (`format: ["esm", "cjs"]`, `dts: true`), expõe `exports` com condições `import`/`require`/`types`, e usa só imports relativos internamente (nunca alias `@/*` dentro de `src/`).

## Consequências

- Cada pacote precisa ser **buildado antes** de ser tipado/lintado/testado por quem o consome — por isso `turbo.json` declara `dependsOn: ["^build"]` nas tasks `typecheck` e `test`.
- O `lint` da raiz roda como um único `eslint .` (não via turbo), então CI precisa rodar `pnpm run build` **antes** de `pnpm run lint`, senão as regras type-aware do `typescript-eslint` não conseguem resolver os tipos dos pacotes `aura-*` (ver `.github/workflows/ci.yml`).
- `aura-config`, que expõe só subpaths (`aura-config/api`, `/worker`, `/web`, `/client`, `/server`, sem export `"."` — ver ADR em `packages/config/README.md`), usa `tsup` com múltiplas entradas (`entry: { server, client, api, worker, web }`).
- `packages/database` é um caso especial: o cliente Prisma gerado (`src/generated/`) não é re-bundlado pelo tsup (tem WASM e é gerado, não escrito à mão) — é só copiado pra `dist/generated` depois do build, com o import marcado como `external` no `tsup.config.ts`.
