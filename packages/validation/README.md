# aura-validation

Schemas [zod](https://zod.dev) como fonte única de verdade para validação — usados tanto em runtime (api, forms do web) quanto para inferir tipos TypeScript (`z.infer`).

O que não entra aqui: tipos que não precisam de validação em runtime (isso é `aura-types`).

Consumido por: `apps/api` (pipes de validação), `apps/web` (forms/server actions), `aura-sdk`.
