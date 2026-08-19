import { DEFAULT_PORTS } from "aura-constants";
import { z } from "zod";

import { createEnv, nodeEnvSchema, optionalUrl } from "./server.js";

const apiEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  PORT: z.coerce.number().int().positive().default(DEFAULT_PORTS.api),
  DATABASE_URL: z.url(),
  SENTRY_DSN_API: optionalUrl(),
});

export const apiEnv = createEnv(apiEnvSchema);

export function assertApiEnv(): void {
  void apiEnv;
}
