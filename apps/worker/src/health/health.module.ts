import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { CacheHealthIndicator } from "aura-nest-kit";

import { HealthController } from "@/health/health.controller";

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [CacheHealthIndicator],
})
export class HealthModule {}
