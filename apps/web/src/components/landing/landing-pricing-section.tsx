"use client";

import { Building2, Check, Crown, Rocket, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/landing/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PLAN_DEFS = [
  { key: "starter", icon: Rocket, featured: false },
  { key: "pro", icon: Zap, featured: true },
  { key: "business", icon: Building2, featured: false },
  { key: "enterprise", icon: Crown, featured: false },
] as const;

const gridVariants = staggerContainerVariants({ staggerChildren: 0.08, delayChildren: 0.1 });

const cardVariants = fadeUpVariants({ distance: 22, duration: 0.6 });

export function LandingPricingSection() {
  const t = useTranslations("landing.pricing");

  return (
    <section id="precos" className="w-full py-24 sm:py-28">
      <SectionHeading
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
        align="center"
        className="mx-auto"
      />

      <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-center text-xs">
        {t("placeholderNote")}
      </p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={gridVariants}
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PLAN_DEFS.map(({ key, icon: Icon, featured }) => {
          const features = t.raw(`plans.${key}.features`) as string[];

          return (
            <motion.div key={key} variants={cardVariants}>
              <Card
                className={cn(
                  "relative flex h-full flex-col gap-5 rounded-2xl border p-6",
                  featured
                    ? "border-primary shadow-[0_24px_60px_-24px_color-mix(in_oklch,var(--primary)_45%,transparent)]"
                    : "border-border shadow-sm",
                )}
              >
                {featured && (
                  <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs">
                    {t("popularBadge")}
                  </Badge>
                )}

                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    featured ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" />
                </span>

                <div>
                  <h3 className="text-card-foreground text-lg font-semibold">
                    {t(`plans.${key}.name`)}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">{t(`plans.${key}.tagline`)}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-foreground text-3xl font-semibold tracking-tight">
                    {t(`plans.${key}.price`)}
                  </span>
                  {t(`plans.${key}.period`) && (
                    <span className="text-muted-foreground text-sm">
                      {t(`plans.${key}.period`)}
                    </span>
                  )}
                </div>

                <ul className="flex flex-1 flex-col gap-2.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="text-chart-2 mt-0.5 size-4 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={featured ? "default" : "outline"}
                  className="w-full cursor-pointer rounded-full"
                >
                  {t(`plans.${key}.cta`)}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
