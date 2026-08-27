import { Module } from "@nestjs/common";

import { UsersModule } from "@/modules/users/users.module";
import { ClerkWebhookController } from "@/modules/webhooks/clerk-webhook.controller";

@Module({
  imports: [UsersModule],
  controllers: [ClerkWebhookController],
})
export class WebhooksModule {}
