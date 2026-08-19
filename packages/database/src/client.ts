import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "./generated/index.js";

function readDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl === undefined || databaseUrl.length === 0) {
    throw new Error("DATABASE_URL must be set for aura-database");
  }

  return databaseUrl;
}

export function createDatabaseClient() {
  const adapter = new PrismaNeon({ connectionString: readDatabaseUrl() });

  return new PrismaClient({ adapter });
}

export const db = createDatabaseClient();
