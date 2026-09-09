import { z } from "zod";

import { createEnv, nodeEnvSchema, optionalString } from "./server.js";

const webEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  SENTRY_AUTH_TOKEN: optionalString(),
});

export const webEnv = createEnv(webEnvSchema);

export function assertWebEnv(): void {
  void webEnv;
}
