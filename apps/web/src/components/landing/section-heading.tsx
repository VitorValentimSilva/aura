"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { fadeUpVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const headingVariants = fadeUpVariants({ distance: 22 });

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
  className,
}: {
  badge: ReactNode;
  title: ReactNode;
  description: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={headingVariants}
      className={cn(align === "center" && "mx-auto text-center", "max-w-xl", className)}
    >
      <Badge
        variant="secondary"
        className="bg-secondary text-secondary-foreground gap-2 rounded-full border-transparent px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
      >
        {badge}
      </Badge>

      <h2 className="text-foreground mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[42px]">
        {title}
      </h2>

      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
}
