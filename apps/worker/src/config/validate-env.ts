import { assertWorkerEnv } from "aura-config/worker";
import { createValidateEnv } from "aura-nest-kit";

export const validateEnv = createValidateEnv(assertWorkerEnv);
