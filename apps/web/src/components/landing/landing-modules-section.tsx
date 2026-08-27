"use client";

import {
  FileText,
  type LucideIcon,
  Package,
  Receipt,
  Sparkles,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { MiniBarChart } from "@/components/landing/mini-bar-chart";
import { SectionHeading } from "@/components/landing/section-heading";
import { EASE_OUT_EXPO, fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------

type ModuleDef = {
  key: "crm" | "sales" | "finance" | "inventory" | "services" | "documents";
  icon: LucideIcon;
  span: string;
  tone: string;
  featured?: boolean;
};

const MODULE_DEFS: ModuleDef[] = [
  {
    key: "crm",
    icon: Users,
    span: "sm:col-span-1 lg:col-span-2 lg:row-span-1",
    tone: "bg-primary/10 text-primary",
  },
  {
    key: "sales",
    icon: Receipt,
    span: "sm:col-span-1 lg:col-span-2 lg:row-span-1",
    tone: "bg-chart-2/15 text-chart-2",
  },
  {
    key: "finance",
    icon: Wallet,
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    tone: "bg-white/15 text-white",
    featured: true,
  },
  {
    key: "inventory",
    icon: Package,
    span: "sm:col-span-1 lg:col-span-2 lg:row-span-1",
    tone: "bg-chart-4/20 text-chart-4",
  },
  {
    key: "services",
    icon: Wrench,
    span: "sm:col-span-1 lg:col-span-2 lg:row-span-1",
    tone: "bg-chart-3/15 text-chart-3",
  },
  {
    key: "documents",
    icon: FileText,
    span: "sm:col-span-2 lg:col-span-4 lg:row-span-1",
    tone: "bg-primary/10 text-primary",
  },
];

const CASH_FLOW_BARS = [32, 54, 40, 70, 58, 86, 66];

// -----------------------------------------------------------------------------
// Motion variants
// -----------------------------------------------------------------------------

const gridVariants = staggerContainerVariants({ staggerChildren: 0.09, delayChildren: 0.1 });

const cardVariants = fadeUpVariants({ distance: 26, duration: 0.6 });

// -----------------------------------------------------------------------------
// Modules section
// -----------------------------------------------------------------------------

export function LandingModulesSection() {
  const t = useTranslations("landing.modules");

  return (
    <section id="modulos" className="w-full py-24 sm:py-28">
      <SectionHeading badge={t("badge")} title={t("title")} description={t("description")} />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={gridVariants}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-50 lg:grid-cols-4"
      >
        {MODULE_DEFS.map((mod) => (
          <ModuleCard
            key={mod.key}
            def={mod}
            title={t(`${mod.key}.title`)}
            description={t(`${mod.key}.description`)}
            highlight={t(`${mod.key}.highlight`)}
          />
        ))}
      </motion.div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Module card
// -----------------------------------------------------------------------------

function ModuleCard({
  def,
  title,
  description,
  highlight,
}: {
  def: ModuleDef;
  title: string;
  description: string;
  highlight: string;
}) {
  const Icon = def.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6",
        def.span,
        def.featured
          ? "via-primary border-transparent bg-linear-to-br from-[color-mix(in_oklch,var(--primary)_78%,black_10%)] to-[color-mix(in_oklch,var(--primary)_70%,var(--chart-2)_25%)] text-white shadow-[0_24px_60px_-24px_color-mix(in_oklch,var(--primary)_60%,transparent)]"
          : "border-border bg-card hover:border-primary/30 shadow-sm hover:shadow-lg hover:shadow-black/5",
      )}
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          def.tone,
        )}
      >
        <Icon className="size-5" />
      </span>

      <div className="mt-auto">
        <h3
          className={cn(
            "text-lg font-semibold",
            def.featured ? "text-white" : "text-card-foreground",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-1.5 text-sm leading-relaxed",
            def.featured ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>

        <span
          className={cn(
            "mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
            def.featured ? "border-white/25 text-white/90" : "border-border text-muted-foreground",
          )}
        >
          <Sparkles className={cn("size-3", def.featured ? "text-white" : "text-primary")} />
          {highlight}
        </span>
      </div>

      {def.featured && <MiniBarChart values={CASH_FLOW_BARS} className="mt-6" />}
    </motion.div>
  );
}
