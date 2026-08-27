# ADR 001: Observabilidade só com o SDK do Sentry, sem OpenTelemetry Collector separado

- Status: accepted
- Data: 2026-08-18

## Contexto

O pedido original era Sentry **e** OpenTelemetry para cobrir erros, performance e traces em `apps/web`, `apps/api` e `apps/worker`. Existem duas formas legítimas de fazer isso:

1. Usar só os SDKs oficiais do Sentry (`@sentry/nextjs`, `@sentry/nestjs`), que já são construídos sobre OpenTelemetry por baixo dos panos — o SDK do Node já embute o OTel, ativa `nestIntegration` automaticamente, e propaga contexto de trace via `sentry-trace`/`baggage`.
2. Rodar um OpenTelemetry Collector próprio (mais um serviço em Docker) recebendo spans de cada app e exportando pro Sentry (que aceita OTLP diretamente) e, potencialmente, pra outros backends no futuro.

## Decisão

Só os SDKs do Sentry. Nenhum OpenTelemetry Collector é implantado.

## Consequências

- Menos uma peça de infraestrutura pra manter, monitorar e dar upgrade.
- `apps/web`, `apps/api` e `apps/worker` continuam plenamente instrumentados (erros, performance, traces distribuídos entre os três) porque o Sentry já é OTel por dentro.
- Se um dia for necessário exportar telemetria pra outro backend além do Sentry (ex: Grafana Tempo, Honeycomb), a saída mais simples é ativar `skipOpenTelemetrySetup` no `Sentry.init` de cada app e configurar um Collector real — os SDKs já suportam essa migração sem reescrever a instrumentação.
