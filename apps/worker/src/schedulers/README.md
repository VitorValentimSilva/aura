# schedulers/

Pasta preparada para agendamento de jobs recorrentes com [`@nestjs/schedule`](https://docs.nestjs.com/techniques/task-scheduling) (não instalado ainda — só entra quando o primeiro schedule for necessário).

Quando isso acontecer, registrar os crons correspondentes no Sentry também (Settings → Crons do projeto `aura-worker`), usando `Sentry.withMonitor()` ao redor da execução do schedule para detectar execuções perdidas ou que travam.
