import { Global, Module } from "@nestjs/common";

import { CacheService } from "@/infra/cache/cache.service";

@Global()
@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
