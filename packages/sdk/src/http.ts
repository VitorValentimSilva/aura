import { ApiRequestError } from "./errors.js";

export interface HttpClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
  getAuthToken?: () => string | undefined | Promise<string | undefined>;
  getTraceHeaders?: () => Record<string, string>;
  retries?: number;
  timeoutMs?: number;
}

export interface HttpClient {
  request<T>(path: string, init?: RequestInit): Promise<T>;
}

export function createHttpClient(options: HttpClientOptions): HttpClient {
  const fetchImpl = options.fetchImpl ?? fetch;
  const retries = options.retries ?? 2;
  const timeoutMs = options.timeoutMs ?? 10_000;

  async function requestOnce<T>(path: string, init: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const token = await options.getAuthToken?.();
      const traceHeaders = options.getTraceHeaders?.() ?? {};

      const response = await fetchImpl(`${options.baseUrl}${path}`, {
        ...init,
        signal: controller.signal,
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
          ...traceHeaders,
          ...init.headers,
        },
      });

      if (!response.ok) {
        const body = await response.text().catch(() => undefined);

        throw new ApiRequestError(
          `Request to ${path} failed with status ${response.status}`,
          response.status,
          body,
        );
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    async request<T>(path: string, init: RequestInit = {}): Promise<T> {
      let lastError: unknown;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          return await requestOnce<T>(path, init);
        } catch (error) {
          lastError = error;

          if (error instanceof ApiRequestError && error.status < 500) {
            throw error;
          }

          if (attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 100));
          }
        }
      }

      throw lastError;
    },
  };
}
