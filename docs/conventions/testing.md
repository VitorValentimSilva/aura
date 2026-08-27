# Convenções de teste

- **Jest** em `apps/api`/`apps/worker`: unit specs (`*.spec.ts`) rodam com `rootDir: src`; e2e (`*.e2e-spec.ts`) com config separada (`test/jest-e2e.json`). Ambos carregam env via `setupFiles` apontando pra `load-env.ts` — os testes leem `.env.development` da raiz igual à aplicação real (não use mocks de env).
- **Não importe `describe`/`it`/`beforeEach` de `"node:test"`** — este projeto usa Jest; os globals do Jest (via `@types/jest`) já resolvem os tipos certos sem import nenhum. Foi exatamente o bug corrigido no início deste projeto (ver git log).
- **`apps/web`**: ainda sem framework de teste configurado (`"test": "echo \"no tests yet\""`) — ao adicionar o primeiro teste de verdade, troque esse script e documente aqui qual framework foi escolhido (Vitest/Jest + Testing Library são as opções naturais pro Next 16).
- **Pastas `test/{unit,integration,e2e}`** em `apps/api`/`apps/worker` existem prontas (algumas só com `.gitkeep`) — coloque testes de integração (que tocam banco/cache de verdade) em `test/integration`, não junto dos unit specs.
- **Gate antes de todo PR**: `pnpm run build && pnpm run lint && pnpm run typecheck && pnpm run test`, nessa ordem — `lint`/`typecheck` dependem de pacotes já buildados (ver `docs/architecture/monorepo.md`).
