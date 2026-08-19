export const SERVICE_NAMES = {
  web: "web",
  api: "api",
  worker: "worker",
} as const;

export type ServiceName = (typeof SERVICE_NAMES)[keyof typeof SERVICE_NAMES];

export const DEFAULT_PORTS = {
  web: 3000,
  api: 3001,
  worker: 3002,
} as const;
