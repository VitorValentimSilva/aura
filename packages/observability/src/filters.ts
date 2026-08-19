export const IGNORE_ERRORS: (string | RegExp)[] = [
  "ResizeObserver loop limit exceeded",
  "ResizeObserver loop completed with undelivered notifications",
  "Non-Error promise rejection captured",
  "AbortError",
];

export const DENY_URLS: RegExp[] = [/extensions\//i, /^chrome:\/\//i, /^moz-extension:\/\//i];
