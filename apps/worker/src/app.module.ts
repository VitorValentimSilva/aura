import { Module } from "@nestjs/common";
import { DatabaseModule, ObservabilityModule } from "aura-nest-kit";

import { AppConfigModule } from "@/config/config.module";
import { HealthModule } from "@/health/health.module";
import { CacheModule } from "@/infra/cache/cache.module";

@Module({
  imports: [ObservabilityModule, AppConfigModule, DatabaseModule, CacheModule, HealthModule],
})
export class AppModule {}
