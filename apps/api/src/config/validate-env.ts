import { assertApiEnv } from "aura-config/api";
import { createValidateEnv } from "aura-nest-kit";

export const validateEnv = createValidateEnv(assertApiEnv);
