# jobs/

Contrato para unidades de trabalho executadas pelo worker (`JobHandler`) e um registro simples nome → handler. Ainda não há nenhum job real registrado — isso entra junto com a primeira feature que precisar de processamento assíncrono.

Nada aqui pressupõe fila (isso é `../queues/`, deliberadamente fora de escopo) — um job pode ser disparado diretamente, por um schedule (`../schedulers/`), ou futuramente por uma fila real.
