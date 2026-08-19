import { z } from "zod";

export { createEnv } from "./create-env.js";

export const nodeEnvSchema = z.enum(["development", "test", "production"]).default("development");

function emptyToUndefined(value: unknown): unknown {
  return value === "" ? undefined : value;
}

export function optionalUrl() {
  return z.preprocess(emptyToUndefined, z.url().optional());
}

export function optionalString() {
  return z.preprocess(emptyToUndefined, z.string().optional());
}
