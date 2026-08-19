import { DEFAULT_PORTS } from "aura-constants";
import { z } from "zod";

import { createEnv, nodeEnvSchema, optionalUrl } from "./server.js";

const workerEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  PORT: z.coerce.number().int().positive().default(DEFAULT_PORTS.worker),
  DATABASE_URL: z.url(),
  SENTRY_DSN_WORKER: optionalUrl(),
});

export const workerEnv = createEnv(workerEnvSchema);

export function assertWorkerEnv(): void {
  void workerEnv;
}
