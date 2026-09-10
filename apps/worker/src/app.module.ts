import { Module } from "@nestjs/common";
import { DatabaseModule, ObservabilityModule } from "aura-nest-kit";

import { HealthModule } from "@/health/health.module";

@Module({
  imports: [ObservabilityModule, DatabaseModule, HealthModule],
})
export class AppModule {}
