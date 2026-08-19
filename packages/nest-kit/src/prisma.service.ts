import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { db } from "aura-database";

@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly client: typeof db = db;

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
  }
}
