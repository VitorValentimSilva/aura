# aura-domain

Regras de negócio agnósticas de framework/ORM — entidades, value objects, políticas e erros de domínio, consumidas por `apps/api` e `apps/worker`.

```
src/
  entities/       # entidades de negócio (ainda vazio — preencher junto com o primeiro módulo de feature)
  value-objects/  # tipos imutáveis com validação própria (ainda vazio)
  policies/       # regras de autorização/negócio reutilizáveis (ainda vazio)
  ports/          # interfaces de repositório/gateway que a infra implementa (ainda vazio)
  errors/         # DomainError e subclasses — mapeadas pro filtro de exceções do Nest
```

O que não entra aqui: nada que dependa de Prisma, Express, NestJS ou qualquer SDK de infraestrutura — isso é responsabilidade de `apps/api`/`apps/worker` (camada de infra), que traduz entre este domínio e o mundo externo.

Consumido por: `apps/api`, `apps/worker`.
