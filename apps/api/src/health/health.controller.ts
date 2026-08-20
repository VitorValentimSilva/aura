import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from "@nestjs/terminus";
import { CacheHealthIndicator, PrismaService } from "aura-nest-kit";

import { Public } from "@/common/decorators/public.decorator";
import { SkipRateLimit } from "@/common/decorators/skip-rate-limit.decorator";

@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaIndicator: PrismaHealthIndicator,
    private readonly cacheIndicator: CacheHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @Get("live")
  @Public()
  @SkipRateLimit()
  live(): { status: "ok" } {
    return { status: "ok" };
  }

  @Get("ready")
  @Public()
  @SkipRateLimit()
  @HealthCheck()
  ready() {
    return this.health.check([
      () => this.prismaIndicator.pingCheck("database", this.prisma.client, { timeout: 5000 }),
      () => this.cacheIndicator.check("cache"),
    ]);
  }
}
