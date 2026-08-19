export function resolveSampleRate(value: string | undefined, fallback: number): number {
  if (value === undefined) {
    return fallback;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

const IGNORED_TRANSACTION_PATTERNS = ["/health", "/health/live", "/health/ready", "/monitoring"];

export function shouldIgnoreTransaction(name: string): boolean {
  return IGNORED_TRANSACTION_PATTERNS.some((pattern) => name.includes(pattern));
}
