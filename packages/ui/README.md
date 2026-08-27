# aura-ui

Nasce **vazio de propósito**. `apps/web` já tem seus componentes de UI locais em `src/components/ui` (gerados via `shadcn`, referenciados pelo `components.json` daquele app) — não faz sentido migrá-los pra cá enquanto só existe um consumidor.

Extraia um componente pra cá só quando surgir um **segundo** consumidor real (ex: um painel administrativo separado, ou o próprio `apps/worker` precisando renderizar algo). Até lá, este pacote é só o esqueleto do build (`tsup`, `tsconfig`, `package.json`) pronto pra receber conteúdo.
