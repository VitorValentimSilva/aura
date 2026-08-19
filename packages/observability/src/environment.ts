const DEFAULT_ENVIRONMENT = "development";

export function resolveEnvironment(): string {
  return (
    process.env.SENTRY_ENVIRONMENT ??
    process.env.VERCEL_ENV ??
    process.env.NODE_ENV ??
    DEFAULT_ENVIRONMENT
  );
}

export function resolveClientEnvironment(value: string | undefined): string {
  return value ?? DEFAULT_ENVIRONMENT;
}
