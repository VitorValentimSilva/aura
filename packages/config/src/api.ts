import { z } from "zod";

import { DEFAULT_PORTS } from "./constants.js";
import { createEnv, nodeEnvSchema, optionalUrl } from "./server.js";

const apiEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  PORT: z.coerce.number().int().positive().default(DEFAULT_PORTS.api),
  DATABASE_URL: z.url(),
  SENTRY_DSN_API: optionalUrl(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default("7d"),
  CORS_ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:3000")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),
});

export const apiEnv = createEnv(apiEnvSchema);
