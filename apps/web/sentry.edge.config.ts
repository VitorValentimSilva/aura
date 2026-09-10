import * as Sentry from "@sentry/nextjs";
import { SERVICE_NAMES } from "aura-config";
import { clientEnv } from "aura-config/client";
import { buildBaseSentryOptions } from "aura-observability";

Sentry.init(
  buildBaseSentryOptions({ service: SERVICE_NAMES.web, dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN }),
);
