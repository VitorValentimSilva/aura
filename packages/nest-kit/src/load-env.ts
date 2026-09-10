import path from "node:path";

import dotenv from "dotenv";

export function resolveEnvFileName(): string {
  return process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
}

export function loadEnv(callerDir: string): void {
  dotenv.config({ path: path.resolve(callerDir, "../../../", resolveEnvFileName()), quiet: true });
}
