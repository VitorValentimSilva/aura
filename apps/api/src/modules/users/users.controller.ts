import { Controller, Get, NotFoundException } from "@nestjs/common";

import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { UsersService } from "@/modules/users/users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  async me(@CurrentUser() clerkId: string) {
    const user = await this.usersService.findByClerkId(clerkId);

    if (!user) {
      throw new NotFoundException("User not synced yet — the Clerk webhook may still be in flight");
    }

    return user;
  }
}
