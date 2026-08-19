import * as Sentry from "@sentry/nextjs";
import { clientEnv } from "aura-config/client";
import { assertWebEnv } from "aura-config/web";
import { buildBaseSentryOptions } from "aura-observability";

assertWebEnv();

Sentry.init(buildBaseSentryOptions({ service: "web", dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN }));
