import * as Sentry from "@sentry/nextjs";
import { clientEnv } from "aura-config/client";
import {
  DEFAULT_TRACES_SAMPLE_RATE,
  resolveClientEnvironment,
  resolveSampleRate,
} from "aura-observability";

Sentry.init({
  dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(clientEnv.NEXT_PUBLIC_SENTRY_DSN),
  environment: resolveClientEnvironment(clientEnv.NEXT_PUBLIC_SENTRY_ENVIRONMENT),
  tracesSampleRate: resolveSampleRate(
    clientEnv.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE,
    DEFAULT_TRACES_SAMPLE_RATE,
  ),
  integrations: [Sentry.browserTracingIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
