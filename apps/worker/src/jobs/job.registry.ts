import type { JobHandler } from "@/jobs/job.types";

const registry = new Map<string, JobHandler>();

export function registerJob(handler: JobHandler): void {
  if (registry.has(handler.name)) {
    throw new Error(`Job handler "${handler.name}" is already registered`);
  }

  registry.set(handler.name, handler);
}

export function getJob(name: string): JobHandler | undefined {
  return registry.get(name);
}
