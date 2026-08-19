interface ServiceEnv {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
}

export function createConfiguration(env: ServiceEnv) {
  return () => ({
    app: {
      nodeEnv: env.NODE_ENV,
      port: env.PORT,
    },
    database: {
      url: env.DATABASE_URL,
    },
  });
}

export function createValidateEnv(assertEnv: () => void) {
  return (config: Record<string, unknown>): Record<string, unknown> => {
    assertEnv();

    return config;
  };
}
