"use client";

import { AlertTriangle, TrendingUp, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import { MiniBarChart } from "@/components/landing/mini-bar-chart";
import { Card } from "@/components/ui/card";
import { EASE_OUT_EXPO, fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const REVENUE_BARS = [38, 52, 46, 64, 58, 80, 72];

const containerVariants = staggerContainerVariants({ staggerChildren: 0.14, delayChildren: 0.35 });

const floatingCardVariants = fadeUpVariants({ distance: 14, duration: 0.6 });

type FloatingInsight = {
  key: "inactiveClients" | "criticalStock";
  icon: typeof Users;
  tone: string;
  className: string;
  hideOnMobile?: boolean;
};

const FLOATING_INSIGHTS: FloatingInsight[] = [
  {
    key: "inactiveClients",
    icon: Users,
    tone: "bg-primary/10 text-primary",
    className: "-top-6 -left-6 sm:-left-10",
  },
  {
    key: "criticalStock",
    icon: AlertTriangle,
    tone: "bg-chart-3/15 text-chart-3",
    className: "-right-4 -bottom-8 sm:-right-8",
    hideOnMobile: true,
  },
];

export function HeroInsightPanel() {
  const t = useTranslations("landing.hero.insightPanel");
  const tPods = useTranslations("landing.orbitPods");
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative mx-auto w-full max-w-110"
    >
      <motion.div
        variants={fadeUpVariants({ distance: 24 })}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      >
        <Card className="border-border/60 bg-card/90 gap-5 rounded-3xl border p-6 shadow-[0_40px_100px_-40px_color-mix(in_oklch,var(--primary)_35%,transparent)] backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-card-foreground text-sm font-semibold">{t("title")}</span>

            <span className="relative flex h-2 w-2">
              <span className="bg-chart-2 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-chart-2 relative inline-flex h-2 w-2 rounded-full" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="border-border/60 bg-background/40 rounded-2xl border p-4">
              <span className="text-muted-foreground text-xs">{t("revenue")}</span>
              <p className="text-foreground mt-1 text-2xl font-semibold tracking-tight">
                R$ 18.240
              </p>
              <span className="text-chart-2 mt-1 inline-flex items-center gap-1 text-xs font-medium">
                <TrendingUp className="size-3.5" />
                +12%
              </span>
            </div>

            <div className="border-border/60 bg-background/40 rounded-2xl border p-4">
              <span className="text-muted-foreground text-xs">{t("dueSoon")}</span>
              <p className="text-foreground mt-1 text-2xl font-semibold tracking-tight">3</p>
              <span className="text-muted-foreground mt-1 inline-block text-xs">
                {tPods("criticalStock.sub")}
              </span>
            </div>
          </div>

          <MiniBarChart values={REVENUE_BARS} barClassName="from-primary/40 to-primary" />
        </Card>
      </motion.div>

      {FLOATING_INSIGHTS.map((insight) => {
        const Icon = insight.icon;

        return (
          <motion.div
            key={insight.key}
            variants={floatingCardVariants}
            className={cn("absolute", insight.className, insight.hideOnMobile && "hidden sm:block")}
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -6, 0],
                      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    }
              }
              className="border-border/60 bg-card/95 flex items-center gap-2.5 rounded-full border py-2 pr-4 pl-2 whitespace-nowrap shadow-lg backdrop-blur-md"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full",
                  insight.tone,
                )}
              >
                <Icon className="size-3.5" />
              </span>

              <span className="flex flex-col leading-tight">
                <span className="text-card-foreground text-xs font-semibold">
                  {tPods(`${insight.key}.label`)}
                </span>
                <span className="text-muted-foreground font-mono text-[10px]">
                  {tPods(`${insight.key}.sub`)}
                </span>
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
