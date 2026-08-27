import { Injectable } from "@nestjs/common";
import type { User } from "aura-database";
import { PrismaService } from "aura-nest-kit";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  upsertFromClerk(payload: User): Promise<User> {
    return this.prisma.client.user.upsert({
      where: { clerkId: payload.id },
      create: {
        clerkId: payload.id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        imageUrl: payload.imageUrl,
      },
      update: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        imageUrl: payload.imageUrl,
      },
    });
  }

  async deleteByClerkId(clerkId: string): Promise<void> {
    await this.prisma.client.user.deleteMany({ where: { clerkId } });
  }

  findByClerkId(clerkId: string): Promise<User | null> {
    return this.prisma.client.user.findUnique({ where: { clerkId } });
  }
}
