"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-lg font-semibold">Algo deu errado</h2>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border px-4 py-2 text-sm font-medium"
      >
        Tentar novamente
      </button>
    </div>
  );
}
