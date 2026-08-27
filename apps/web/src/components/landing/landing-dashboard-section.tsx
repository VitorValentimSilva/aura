"use client";

import {
  AlertCircle,
  CheckCircle2,
  PackageX,
  Receipt,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { MiniBarChart } from "@/components/landing/mini-bar-chart";
import { SectionHeading } from "@/components/landing/section-heading";
import { Card } from "@/components/ui/card";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

const REVENUE_TREND = [28, 42, 36, 58, 50, 66, 60, 74, 68, 82, 78, 92];

const KPI_DEFS = [
  { key: "revenue", icon: Wallet, tone: "bg-primary/10 text-primary" },
  { key: "profit", icon: TrendingUp, tone: "bg-chart-2/15 text-chart-2" },
  { key: "overdue", icon: AlertCircle, tone: "bg-chart-3/15 text-chart-3" },
  { key: "criticalStock", icon: PackageX, tone: "bg-chart-4/20 text-chart-4" },
] as const;

const INSIGHT_DEFS = [
  { key: "billing", icon: Receipt },
  { key: "restock", icon: PackageX },
  { key: "followUp", icon: Users },
] as const;

const kpiVariants = staggerContainerVariants({ staggerChildren: 0.08, delayChildren: 0.15 });

const kpiItemVariants = fadeUpVariants({ distance: 14, duration: 0.5 });

export function LandingDashboardSection() {
  const t = useTranslations("landing.dashboard");

  return (
    <section className="w-full py-24 sm:py-28">
      <SectionHeading
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
        align="center"
        className="mx-auto"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUpVariants({ distance: 28 })}
        className="mt-14"
      >
        <Card className="border-border/60 bg-card/90 gap-6 overflow-hidden rounded-3xl border p-0 shadow-[0_50px_120px_-50px_color-mix(in_oklch,var(--primary)_35%,transparent)] backdrop-blur-md">
          <div className="border-border/60 flex items-center gap-1.5 border-b px-5 py-3.5">
            <span className="bg-chart-3 size-2.5 rounded-full" />
            <span className="bg-chart-4 size-2.5 rounded-full" />
            <span className="bg-chart-2 size-2.5 rounded-full" />
            <span className="text-muted-foreground ml-3 font-mono text-xs">{t("windowLabel")}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={kpiVariants}
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {KPI_DEFS.map(({ key, icon: Icon, tone }) => (
                  <motion.div
                    key={key}
                    variants={kpiItemVariants}
                    className="border-border/60 bg-background/40 rounded-2xl border p-4"
                  >
                    <span
                      className={cn("flex size-8 items-center justify-center rounded-lg", tone)}
                    >
                      <Icon className="size-4" />
                    </span>
                    <p className="text-foreground mt-2.5 text-xl font-semibold tracking-tight">
                      {t(`kpis.${key}.value`)}
                    </p>
                    <span className="text-muted-foreground text-xs">{t(`kpis.${key}.label`)}</span>
                  </motion.div>
                ))}
              </motion.div>

              <div>
                <span className="text-muted-foreground text-xs font-medium">{t("chartLabel")}</span>
                <MiniBarChart
                  values={REVENUE_TREND}
                  className="mt-3 h-24"
                  barClassName="from-primary/40 to-primary"
                />
              </div>
            </div>

            <div className="border-border/60 bg-background/40 flex flex-col gap-3 rounded-2xl border p-5">
              <span className="text-card-foreground text-sm font-semibold">
                {t("insightsLabel")}
              </span>

              {INSIGHT_DEFS.map(({ key, icon: Icon }) => (
                <div key={key} className="flex items-start gap-2.5">
                  <span className="bg-chart-2/15 text-chart-2 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
                    <Icon className="size-3.5" />
                  </span>
                  <p className="text-muted-foreground text-sm leading-snug">
                    {t(`insights.${key}`)}
                  </p>
                </div>
              ))}

              <div className="text-muted-foreground mt-auto flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="text-chart-2 size-3.5" />
                {t("insightsFootnote")}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
