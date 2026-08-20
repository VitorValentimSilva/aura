import { createClerkClient } from "@clerk/backend";
import { Global, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { apiEnv } from "aura-config/api";

import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";
import { CLERK_CLIENT } from "@/infra/auth/clerk-client.token";

@Global()
@Module({
  providers: [
    {
      provide: CLERK_CLIENT,
      useValue: createClerkClient({
        secretKey: apiEnv.CLERK_SECRET_KEY,
        publishableKey: apiEnv.CLERK_PUBLISHABLE_KEY,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
  exports: [CLERK_CLIENT],
})
export class AuthModule {}
