import type { Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function fadeUpVariants(options?: { distance?: number; duration?: number }): Variants {
  const { distance = 20, duration = 0.7 } = options ?? {};

  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE_OUT_EXPO },
    },
  };
}

export function staggerContainerVariants(options?: {
  staggerChildren?: number;
  delayChildren?: number;
}): Variants {
  const { staggerChildren = 0.1, delayChildren = 0.05 } = options ?? {};

  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  };
}
