import { Global, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { RateLimitGuard } from "@/common/guards/rate-limit.guard";

@Global()
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class CacheModule {}
