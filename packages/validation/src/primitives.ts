import { z } from "zod";

export const emailSchema = z.email();
export const cuidSchema = z.cuid2();
