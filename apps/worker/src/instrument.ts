import "@/load-env";

import * as Sentry from "@sentry/nestjs";
import { SERVICE_NAMES } from "aura-config";
import { workerEnv } from "aura-config/worker";
import { buildBaseSentryOptions } from "aura-observability";

Sentry.init(
  buildBaseSentryOptions({ service: SERVICE_NAMES.worker, dsn: workerEnv.SENTRY_DSN_WORKER }),
);
