"use client";

import { motion, useReducedMotion } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MiniBarChart({
  values,
  className,
  barClassName,
}: {
  values: number[];
  className?: string;
  barClassName?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("flex h-16 items-end gap-1.5", className)}>
      {values.map((height, i) => (
        <motion.span
          key={i}
          initial={{ height: reduceMotion ? `${height}%` : 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_OUT_EXPO }}
          className={cn(
            "w-full rounded-t-md bg-linear-to-t from-white/40 to-white/95",
            barClassName,
          )}
        />
      ))}
    </div>
  );
}
