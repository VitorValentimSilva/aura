import { DEFAULT_PORTS } from "aura-constants";
import { z } from "zod";

import { createEnv, optionalString, optionalUrl } from "./server.js";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url().default(`http://localhost:${DEFAULT_PORTS.api}`),
  NEXT_PUBLIC_SENTRY_DSN: optionalUrl(),
  NEXT_PUBLIC_SENTRY_ENVIRONMENT: optionalString(),
  NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE: optionalString(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
});

export const clientEnv = createEnv(clientEnvSchema);

export function assertClientEnv(): void {
  void clientEnv;
}
