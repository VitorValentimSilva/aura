export function resolveRelease(): string {
  return (
    process.env.SENTRY_RELEASE ?? process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GIT_SHA ?? "dev"
  );
}
