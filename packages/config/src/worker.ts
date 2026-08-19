import { z } from "zod";

import { createEnv, nodeEnvSchema, optionalUrl } from "./server.js";

const workerEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  PORT: z.coerce.number().int().positive().default(3002),
  DATABASE_URL: z.url(),
  SENTRY_DSN_WORKER: optionalUrl(),
});

export const workerEnv = createEnv(workerEnvSchema);

export function assertWorkerEnv(): void {
  void workerEnv;
}
