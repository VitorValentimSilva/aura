"use client";

import {
  Lightbulb,
  MessageCircle,
  Receipt,
  ShoppingCart,
  Sparkles,
  Sunrise,
  TrendingUp,
  UserX,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/landing/section-heading";
import { Card } from "@/components/ui/card";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

const CAPABILITY_KEYS = [
  { key: "chat", icon: MessageCircle },
  { key: "dailySummary", icon: Sunrise },
  { key: "purchaseSuggestions", icon: ShoppingCart },
  { key: "stockForecast", icon: TrendingUp },
  { key: "autoBilling", icon: Receipt },
  { key: "inactiveDetection", icon: UserX },
  { key: "indicatorExplanation", icon: Lightbulb },
] as const;

const containerVariants = staggerContainerVariants({ staggerChildren: 0.08, delayChildren: 0.1 });

const itemVariants = fadeUpVariants({ distance: 16, duration: 0.5 });

export function LandingAiSection() {
  const t = useTranslations("landing.ai");

  return (
    <section id="ia" className="w-full py-24 sm:py-28">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading badge={t("badge")} title={t("title")} description={t("description")} />

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {CAPABILITY_KEYS.map(({ key, icon: Icon }) => (
              <motion.li
                key={key}
                variants={itemVariants}
                className="border-border bg-card/60 flex items-center gap-3 rounded-xl border p-3"
              >
                <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-4" />
                </span>
                <span className="text-card-foreground text-sm font-medium">
                  {t(`capabilities.${key}`)}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants({ distance: 24 })}
        >
          <Card className="border-border/60 bg-card/90 gap-5 rounded-3xl border p-6 shadow-[0_40px_100px_-40px_color-mix(in_oklch,var(--primary)_35%,transparent)] backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-full">
                <Sparkles className="size-3.5" />
              </span>
              <span className="text-card-foreground text-sm font-semibold">
                {t("chat.assistantName")}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-primary text-primary-foreground ml-auto max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
                {t("chat.question")}
              </div>

              <div className="border-border/60 bg-background/60 mr-auto max-w-[85%] rounded-2xl rounded-bl-sm border px-4 py-2.5 text-sm">
                <p className="text-card-foreground">{t("chat.answer")}</p>
                <p className="text-muted-foreground mt-1.5 font-mono text-xs">
                  {t("chat.answerMeta")}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
