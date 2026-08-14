"use client";

import { useEffect } from "react";

const IGNORED_PATTERNS = [/Encountered a script tag while rendering React component/];

export function ConsoleNoiseFilter() {
  useEffect(() => {
    const originalError = console.error;

    console.error = (...args: unknown[]) => {
      const message = args[0];
      if (
        typeof message === "string" &&
        IGNORED_PATTERNS.some((pattern) => pattern.test(message))
      ) {
        return;
      }
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
