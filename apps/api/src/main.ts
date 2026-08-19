import "@/instrument";

import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import * as Sentry from "@sentry/nestjs";
import { apiEnv } from "aura-config/api";

import { AppModule } from "@/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set("trust proxy", 1);

  app.enableShutdownHooks();

  await app.listen(apiEnv.PORT);
}
void bootstrap().catch(async (error) => {
  console.error(error);
  await Sentry.flush(2000);
  process.exit(1);
});
