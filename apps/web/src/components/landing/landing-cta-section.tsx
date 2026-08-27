"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

const containerVariants = staggerContainerVariants({ staggerChildren: 0.1, delayChildren: 0.05 });

const itemVariants = fadeUpVariants({ distance: 18 });

export function LandingCtaSection() {
  const t = useTranslations("landing.cta");

  return (
    <section className="w-full py-24 sm:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="border-border/60 relative overflow-hidden rounded-3xl border px-6 py-16 text-center sm:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(600px 320px at 50% 0%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 65%)",
          }}
        />

        <motion.h2
          variants={itemVariants}
          className="text-foreground mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg leading-relaxed"
        >
          {t("description")}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8">
          <Button size="lg" className="group rounded-full px-8">
            <Link href="#precos">
              {t("button")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
