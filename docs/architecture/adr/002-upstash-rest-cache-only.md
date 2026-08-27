# ADR 002: Upstash Redis só para cache/rate-limit, sem fila de jobs (BullMQ)

- Status: accepted
- Data: 2026-08-18

## Contexto

`apps/worker` existe pra Workers/IA/Jobs, o que sugere a necessidade de uma fila de processamento assíncrono. O Upstash Redis, porém, é acessado via `@upstash/redis`, um cliente **HTTP/REST** — ideal pra ambientes serverless/edge, mas sem suporte aos comandos bloqueantes e scripts Lua que o BullMQ (a opção mais comum de fila em Node) exige via conexão TCP (`ioredis`).

## Decisão

O Upstash Redis deste projeto serve só para cache-aside (`aura-cache`) e rate-limiting (`@upstash/ratelimit`). Nenhuma fila de jobs é implementada agora — `apps/worker/src/queues/` fica deliberadamente vazio (só um README explicando o porquê).

## Consequências

- `aura-cache` pode ficar 100% no driver REST, simples e sem estado de conexão pra gerenciar.
- Se/quando uma fila de jobs de verdade for necessária, as opções ficam documentadas em `apps/worker/src/queues/README.md`: (a) um Redis com endpoint TCP dedicado (Upstash tem isso no plano Fixed) só pro BullMQ, mantendo o REST pro resto; ou (b) um serviço de fila gerenciado (Upstash QStash, SQS, etc.).
- Até lá, jobs no worker rodam sob demanda ou por schedule (`apps/worker/src/schedulers/`), não por fila.
