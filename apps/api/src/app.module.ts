import { Module } from "@nestjs/common";
import { DatabaseModule, ObservabilityModule } from "aura-nest-kit";

import { AppConfigModule } from "@/config/config.module";
import { HealthModule } from "@/health/health.module";
import { AuthModule } from "@/infra/auth/auth.module";
import { CacheModule } from "@/infra/cache/cache.module";
import { UsersModule } from "@/modules/users/users.module";
import { WebhooksModule } from "@/modules/webhooks/webhooks.module";

@Module({
  imports: [
    ObservabilityModule,
    AppConfigModule,
    DatabaseModule,
    CacheModule,
    AuthModule,
    HealthModule,
    UsersModule,
    WebhooksModule,
  ],
})
export class AppModule {}
