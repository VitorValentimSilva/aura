import "@/load-env";

import * as Sentry from "@sentry/nestjs";
import { apiEnv } from "aura-config/api";
import { SERVICE_NAMES } from "aura-constants";
import { buildBaseSentryOptions } from "aura-observability";

Sentry.init(buildBaseSentryOptions({ service: SERVICE_NAMES.api, dsn: apiEnv.SENTRY_DSN_API }));
