import * as Sentry from "@sentry/nextjs";
import { clientEnv } from "aura-config/client";
import { SERVICE_NAMES } from "aura-constants";
import { buildBaseSentryOptions } from "aura-observability";

Sentry.init(
  buildBaseSentryOptions({ service: SERVICE_NAMES.web, dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN }),
);
