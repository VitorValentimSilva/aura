import type { z } from "zod";

export function createEnv<Schema extends z.ZodTypeAny>(
  schema: Schema,
  source: Record<string, string | undefined> = process.env,
): Readonly<z.infer<Schema>> {
  const result = schema.safeParse(source);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid environment variables:\n${issues}`);
  }

  return Object.freeze(result.data);
}
