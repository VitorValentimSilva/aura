# aura-ai

Integrações de IA usadas por `apps/worker` — interfaces e estrutura prontas, **sem nenhum SDK de provedor instalado ainda** (OpenAI, Anthropic, etc. entram quando o primeiro pipeline de verdade for implementado).

```
src/
  providers/    # interface AiProvider — implementações concretas entram por trás dela
  prompts/      # templates de prompt versionados (ainda vazio)
  schemas/      # schemas zod para structured output (ainda vazio)
  pipelines/    # composição de steps de um fluxo de IA (ainda vazio)
```

Consumido por: `apps/worker` (e `apps/api`, se um dia houver um endpoint síncrono de IA).
