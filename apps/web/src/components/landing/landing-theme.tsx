"use client";

import { ReactNode, useEffect } from "react";

interface LandingThemeProps {
  children: ReactNode;
}

export function LandingTheme({ children }: LandingThemeProps) {
  useEffect(() => {
    document.documentElement.dataset.landingTheme = "true";

    return () => {
      delete document.documentElement.dataset.landingTheme;
    };
  }, []);

  return children;
}
