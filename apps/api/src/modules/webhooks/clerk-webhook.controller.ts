import { verifyWebhook } from "@clerk/backend/webhooks";
import type { RawBodyRequest } from "@nestjs/common";
import { BadRequestException, Controller, Post, Req } from "@nestjs/common";
import { apiEnv } from "aura-config/api";
import type { Request as ExpressRequest } from "express";

import { Public } from "@/common/decorators/public.decorator";
import { UsersService } from "@/modules/users/users.service";

@Controller("webhooks/clerk")
export class ClerkWebhookController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  async handle(@Req() req: RawBodyRequest<ExpressRequest>): Promise<{ received: true }> {
    if (!req.rawBody) {
      throw new BadRequestException("Missing raw body — is rawBody enabled in NestFactory.create?");
    }

    const event = await verifyWebhook(toWebRequest(req), {
      signingSecret: apiEnv.CLERK_WEBHOOK_SIGNING_SECRET,
    }).catch(() => {
      throw new BadRequestException("Invalid webhook signature");
    });

    switch (event.type) {
      case "user.created":
      case "user.updated": {
        const primaryEmail = event.data.email_addresses.find(
          (email) => email.id === event.data.primary_email_address_id,
        );

        if (!primaryEmail) {
          throw new BadRequestException("User event missing a primary email address");
        }

        await this.usersService.upsertFromClerk({
          id: event.data.id,
          email: primaryEmail.email_address,
          firstName: event.data.first_name,
          lastName: event.data.last_name,
          imageUrl: event.data.image_url,
        });
        break;
      }
      case "user.deleted":
        if (event.data.id) {
          await this.usersService.deleteByClerkId(event.data.id);
        }
        break;
      default:
        break;
    }

    return { received: true };
  }
}

// verifyWebhook() expects a Fetch API Request carrying the exact raw bytes —
// svix signature verification fails on anything that went through JSON.parse.
function toWebRequest(req: RawBodyRequest<ExpressRequest>): Request {
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") {
      headers.set(key, value);
    } else if (Array.isArray(value)) {
      headers.set(key, value.join(", "));
    }
  }

  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  return new Request(url, {
    method: req.method,
    headers,
    body: req.rawBody ? new Uint8Array(req.rawBody) : undefined,
  });
}
