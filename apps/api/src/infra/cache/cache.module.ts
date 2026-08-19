import { Global, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { RateLimitGuard } from "@/common/guards/rate-limit.guard";
import { CacheService } from "@/infra/cache/cache.service";

@Global()
@Module({
  providers: [
    CacheService,
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
