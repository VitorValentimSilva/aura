import type { ServiceName } from "aura-constants";

import { resolveEnvironment } from "./environment.js";
import { DENY_URLS, IGNORE_ERRORS } from "./filters.js";
import { resolveRelease } from "./release.js";
import {
  DEFAULT_PROFILES_SAMPLE_RATE,
  DEFAULT_TRACES_SAMPLE_RATE,
  resolveSampleRate,
} from "./sampling.js";

export interface BaseSentryOptions {
  dsn: string | undefined;
  enabled: boolean;
  environment: string;
  release: string;
  tracesSampleRate: number;
  profilesSampleRate: number;
  ignoreErrors: (string | RegExp)[];
  denyUrls: RegExp[];
  serverName: ServiceName;
}

export function buildBaseSentryOptions(params: {
  service: ServiceName;
  dsn: string | undefined;
}): BaseSentryOptions {
  return {
    dsn: params.dsn,
    enabled: Boolean(params.dsn),
    environment: resolveEnvironment(),
    release: resolveRelease(),
    tracesSampleRate: resolveSampleRate(
      process.env.SENTRY_TRACES_SAMPLE_RATE,
      DEFAULT_TRACES_SAMPLE_RATE,
    ),
    profilesSampleRate: resolveSampleRate(
      process.env.SENTRY_PROFILES_SAMPLE_RATE,
      DEFAULT_PROFILES_SAMPLE_RATE,
    ),
    ignoreErrors: IGNORE_ERRORS,
    denyUrls: DENY_URLS,
    serverName: params.service,
  };
}
