import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from "@nestjs/terminus";
import { CacheHealthIndicator, PrismaService } from "aura-nest-kit";

@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaIndicator: PrismaHealthIndicator,
    private readonly cacheIndicator: CacheHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @Get("live")
  live(): { status: "ok" } {
    return { status: "ok" };
  }

  @Get("ready")
  @HealthCheck()
  ready() {
    return this.health.check([
      // Neon's pooled connection can take longer than terminus's 1000ms default
      // to respond on a cold start, so give it more headroom.
      () => this.prismaIndicator.pingCheck("database", this.prisma.client, { timeout: 5000 }),
      () => this.cacheIndicator.check("cache"),
    ]);
  }
}
