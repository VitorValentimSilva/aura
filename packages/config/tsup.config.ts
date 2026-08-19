import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    server: "src/server.ts",
    client: "src/client.ts",
    api: "src/api.ts",
    worker: "src/worker.ts",
    web: "src/web.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "node22",
  outDir: "dist",
});
