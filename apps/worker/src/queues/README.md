# queues/

Deliberadamente vazio.

O Upstash Redis deste projeto é usado só via `@upstash/redis` (cliente REST/HTTP) — ver `aura-cache`. O BullMQ, a opção mais comum de fila de jobs em Node, precisa de uma conexão TCP real ao Redis (via `ioredis`) para comandos bloqueantes e scripts Lua, o que o cliente REST do Upstash não oferece.

Decisão registrada em `docs/architecture/adr/002-upstash-rest-cache-only.md`: por ora, o Upstash Redis deste projeto serve só para cache e rate-limiting. Se uma fila de jobs de verdade for necessária no futuro, as opções são: (a) um Redis com endpoint TCP dedicado (Upstash oferece isso num plano Fixed) só para o BullMQ, mantendo o REST para cache, ou (b) um serviço de fila gerenciado (ex: Upstash QStash, SQS).
