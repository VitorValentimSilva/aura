import { Injectable } from "@nestjs/common";
import { HealthIndicatorResult, HealthIndicatorService } from "@nestjs/terminus";
import { getCacheDriver } from "aura-cache";

@Injectable()
export class CacheHealthIndicator {
  constructor(private readonly healthIndicatorService: HealthIndicatorService) {}

  async check(key: string): Promise<HealthIndicatorResult> {
    const indicator = this.healthIndicatorService.check(key);

    try {
      const driver = getCacheDriver();

      await driver.set("health:ping", "ok", 5);

      return indicator.up();
    } catch (error) {
      return indicator.down({ message: (error as Error).message });
    }
  }
}
