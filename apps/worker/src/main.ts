import "@/instrument";

import { NestFactory } from "@nestjs/core";
import * as Sentry from "@sentry/nestjs";
import { workerEnv } from "aura-config/worker";

import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Runs OnModuleDestroy hooks (e.g. PrismaService disconnecting) on SIGTERM/SIGINT.
  app.enableShutdownHooks();

  await app.listen(workerEnv.PORT);
}
void bootstrap().catch(async (error) => {
  console.error(error);
  await Sentry.flush(2000);
  process.exit(1);
});
