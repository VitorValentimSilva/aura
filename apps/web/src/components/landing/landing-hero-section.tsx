"use client";

import { ArrowRight, PlayCircle, Star } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { HeroInsightPanel } from "@/components/landing/hero-insight-panel";
import { SegmentMarquee } from "@/components/landing/segment-marquee";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

const containerVariants = staggerContainerVariants({ staggerChildren: 0.12, delayChildren: 0.05 });

const itemVariants = fadeUpVariants({ distance: 18 });

const AVATAR_INITIALS = ["MC", "JS", "AR"];

export function LandingHeroSection() {
  const t = useTranslations("landing.hero");
  const tSegments = useTranslations("landing.segments");

  return (
    <section className="w-full pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10%] -z-10 h-180"
        style={{
          background:
            "radial-gradient(560px 380px at 82% 8%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%), radial-gradient(460px 340px at 6% 28%, color-mix(in oklch, var(--chart-2) 16%, transparent), transparent 60%)",
        }}
      />

      <div className="mx-auto grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.div variants={itemVariants}>
            <Badge
              variant="secondary"
              className="bg-secondary text-secondary-foreground gap-2 rounded-full border-transparent px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-chart-2 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />

                <span className="bg-chart-2 relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-foreground mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {t("titleLine1")}{" "}
            <span className="from-primary to-chart-2 bg-linear-to-r bg-clip-text text-transparent italic">
              {t("titleHighlight")}
            </span>{" "}
            {t("titleLine2")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground mx-auto mt-6 max-w-[46ch] text-lg leading-relaxed lg:mx-0"
          >
            {t("description")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button size="lg" className="group rounded-full px-7">
              <Link href="#precos">
                {t("ctaPrimary")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="border-border rounded-full px-7">
              <Link href="#ia">
                <PlayCircle className="size-4" />
                {t("ctaSecondary")}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <AvatarGroup>
              {AVATAR_INITIALS.map((initials) => (
                <Avatar key={initials} size="sm">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ))}

              <AvatarGroupCount className="size-6 text-[10px]">+500</AvatarGroupCount>
            </AvatarGroup>

            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-chart-3 text-chart-3 size-3.5" />
                ))}
              </span>

              <span className="text-muted-foreground text-sm font-medium">{t("socialProof")}</span>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-muted-foreground mt-6 text-sm">
            {t("noCreditCard")} &nbsp;·&nbsp; {t("quickSetup")} &nbsp;·&nbsp; {t("localSupport")}
          </motion.p>
        </motion.div>

        <HeroInsightPanel />
      </div>

      <div className="mt-20 sm:mt-24">
        <p className="text-muted-foreground mb-6 text-center font-mono text-xs tracking-[0.14em] uppercase">
          {tSegments("heading")}
        </p>

        <SegmentMarquee />
      </div>
    </section>
  );
}
