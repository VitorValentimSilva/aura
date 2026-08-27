# aura-types

Tipos TypeScript puros compartilhados entre `apps/web`, `apps/api` e `apps/worker` — sem nenhum código executável (zero runtime, zero dependências).

O que entra aqui: tipos utilitários genéricos (`Result`, `Paginated`, etc.) e contratos de API/DTO compartilhados entre front e back.

O que não entra aqui: regras de negócio (isso é `aura-domain`), schemas de validação com lógica em runtime (isso é `aura-validation`).

Consumido por: todos os apps e a maioria dos outros pacotes.
