import "@/load-env";

import * as Sentry from "@sentry/nestjs";
import { workerEnv } from "aura-config/worker";
import { SERVICE_NAMES } from "aura-constants";
import { buildBaseSentryOptions } from "aura-observability";

Sentry.init(
  buildBaseSentryOptions({ service: SERVICE_NAMES.worker, dsn: workerEnv.SENTRY_DSN_WORKER }),
);
