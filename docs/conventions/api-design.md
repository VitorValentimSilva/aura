# Convenções de API (apps/api)

Ainda não há endpoints de feature (só o `AppController` default) — este documento fixa o padrão pra quando o primeiro módulo real for adicionado em `apps/api/src/modules/`.

- **Módulos de feature** entram em `apps/api/src/modules/<nome>/`, nunca direto em `src/`.
- **Paginação**: use `Paginated<T>` de `aura-types` como formato de resposta padrão pra listas.
- **Validação de entrada**: schemas zod em `aura-validation`, aplicados via pipe em `apps/api/src/common/pipes/` (ainda vazio — criar o `ZodValidationPipe` junto do primeiro endpoint que precisar).
- **Erros de negócio**: lance subclasses de `DomainError` (`aura-domain`) nos services; o filtro de exceções (`apps/api/src/common/filters/`, ainda vazio) mapeia `DomainError` pra status HTTP apropriado.
- **Rate limiting**: todo endpoint público novo deve considerar explicitamente qual preset de `@RateLimit(...)` faz sentido (ou `@SkipRateLimit()` se genuinamente não deve ser limitado, ex: healthcheck) — não deixe no padrão sem pensar.
- **Health checks**: não adicione lógica de negócio em `apps/api/src/health/` — é só infraestrutura (banco, cache). Novas dependências externas (ex: um serviço de terceiro) ganham seu próprio indicator em `health/indicators/`.
