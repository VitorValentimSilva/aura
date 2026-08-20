import { createHttpClient, HttpClient, HttpClientOptions } from "./http.js";

export interface AuraClient {
  http: HttpClient;
}

export function createAuraClient(options: HttpClientOptions): AuraClient {
  return {
    http: createHttpClient(options),
  };
}
