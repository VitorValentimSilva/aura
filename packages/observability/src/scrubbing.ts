interface ScrubbableRequest {
  headers?: Record<string, string>;
  cookies?: Record<string, string> | string;
}

const SENSITIVE_HEADER_KEYS = new Set(["authorization", "cookie", "set-cookie"]);

export function scrubRequest<T extends ScrubbableRequest>(request: T): T {
  if (request.headers) {
    for (const key of Object.keys(request.headers)) {
      if (SENSITIVE_HEADER_KEYS.has(key.toLowerCase())) {
        delete request.headers[key];
      }
    }
  }

  if (request.cookies) {
    delete request.cookies;
  }

  return request;
}
