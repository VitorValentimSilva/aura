import { z } from "zod";

import { createEnv, nodeEnvSchema, optionalString } from "./server.js";

const webEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  SENTRY_AUTH_TOKEN: optionalString(),
  CLERK_SECRET_KEY: z.string().min(1),
});

export const webEnv = createEnv(webEnvSchema);

export function assertWebEnv(): void {
  void webEnv;
}
