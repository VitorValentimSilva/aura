import path from "node:path";

import { resolveEnvFileName } from "aura-nest-kit";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../", resolveEnvFileName()), quiet: true });
