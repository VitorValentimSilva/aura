# Runbook: Incidentes

## Primeira coisa a checar

1. `/health/ready` de `apps/api` e `apps/worker` — reporta status de Postgres e cache separadamente.
2. Painel do Sentry (`aura-web`/`aura-api`/`aura-worker`) — issues novos ou picos de erro na última hora.
3. Painel do provedor do PaaS — CPU/memória/restarts recentes do container.
4. Painel do Neon — status do banco, conexões ativas.
5. Painel do Upstash — se o incidente for relacionado a cache/rate-limit (lembre que cache é fail-open — um Upstash fora do ar **não deveria** causar indisponibilidade, só degradar performance).

## Severidade

- **Crítico**: `apps/api` ou `apps/web` fora do ar, ou dados incorretos sendo persistidos.
- **Alto**: degradação de performance visível, `apps/worker` parado (jobs não processam, mas nada é perdido — jobs não são fila hoje, ver ADR 002).
- **Baixo**: erro isolado, sem impacto de usuário visível.

## Comunicação

Documentar no próprio issue do Sentry (comentário) o que foi investigado e a causa raiz quando encontrada — isso mantém o histórico junto do erro, sem precisar de uma ferramenta separada.

## Pós-incidente

Depois de resolvido, considere se o incidente revela algo que devia virar:

- Um alerta novo no Sentry (Settings → Alerts do projeto afetado).
- Uma entrada nova neste runbook.
- Um ADR, se a causa raiz for uma decisão de arquitetura que merece ser revisitada (`docs/architecture/adr/`).
