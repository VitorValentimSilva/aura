export function resolveEnvFileName(): string {
  return process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
}
