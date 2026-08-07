import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const sharedJsRules = {
  "simple-import-sort/exports": "error",
  "simple-import-sort/imports": "error",
  "prettier/prettier": ["error", { endOfLine: "auto" }],
};

const sharedTsRules = {
  ...sharedJsRules,
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-floating-promises": "warn",
  "@typescript-eslint/no-unsafe-argument": "warn",
};

export default defineConfig([
  globalIgnores([
    "**/build/**",
    "**/coverage/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/src/generated/**",
  ]),
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended, eslintPluginPrettierRecommended],
    languageOptions: {
      sourceType: "module",
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: sharedJsRules,
  },
  {
    files: ["apps/api/**/*.{ts,mts,cts}", "apps/worker/**/*.{ts,mts,cts}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: sharedTsRules,
  },
  {
    files: ["apps/web/**/*.{ts,tsx,mts,cts}"],
    extends: [...nextVitals, ...nextTs, eslintPluginPrettierRecommended],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: sharedTsRules,
  },
  {
    files: ["apps/web/**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
