import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "@/config/configuration";
import { validateEnv } from "@/config/validate-env";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
      validate: validateEnv,
    }),
  ],
})
export class AppConfigModule {}
