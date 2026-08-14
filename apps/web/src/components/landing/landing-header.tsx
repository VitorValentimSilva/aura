"use client";

import { ArrowRight, Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/common/language-switcher";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const navLinks = [
  { id: "home", labelKey: "home", href: "#" },
  { id: "module", labelKey: "module", href: "#modulos" },
] as const;

export function LandingHeader() {
  const tNav = useTranslations("landing.header.nav");
  const tButton = useTranslations("common.button");

  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("#");

  useEffect(() => {
    const sections = navLinks
      .filter((link) => link.href !== "#")
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveNav(`#${visibleSection.target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 8);

      if (currentScroll < 100) {
        setActiveNav("#");
      }
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300",
        scrolled
          ? "border-border/60 bg-background/85 shadow-xs"
          : "bg-background/30 border-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#");
          }}
          className="group focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="text-foreground font-heading text-3xl font-normal tracking-tight italic transition-opacity group-hover:opacity-90">
            aura
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" onMouseLeave={() => setHoveredNav(null)}>
          {navLinks.map((link) => {
            const isHovered = hoveredNav === link.id;
            const isActive = activeNav === link.href;
            const label = tNav(link.labelKey);

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                onMouseEnter={() => setHoveredNav(link.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-visible:ring-ring/50 relative rounded-full px-4 py-1.5 font-sans text-base font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isHovered && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="bg-muted/80 absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {isActive && (
                  <motion.span
                    layoutId="active-indicator"
                    className="bg-primary absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="border-border/60 bg-muted/40 flex items-center gap-1.5 rounded-full border p-1">
            <LanguageSwitcher />

            <ThemeToggle />
          </div>

          <div className="hidden items-center gap-1.5 sm:flex">
            <Button variant="outline" size="lg" className="cursor-pointer rounded-full">
              {tButton("enter")}
            </Button>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="default" size="lg" className="cursor-pointer rounded-full">
                <span className="relative z-10 flex items-center gap-1.5">
                  {tButton("startFree")}

                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Button>
            </motion.div>
          </div>

          <Sheet>
            <SheetTrigger className="cursor-pointer md:hidden">
              <Menu className="size-7" />

              <span className="sr-only">{tButton("openMenu")}</span>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-foreground font-heading text-3xl font-normal tracking-tight italic transition-opacity group-hover:opacity-90">
                  aura
                </SheetTitle>
              </SheetHeader>

              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                  },
                }}
                className="flex flex-col gap-1.5 px-4"
              >
                {navLinks.map((link) => {
                  const isActive = activeNav === link.href;
                  const label = tNav(link.labelKey);

                  return (
                    <motion.div
                      key={link.id}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: { type: "spring", stiffness: 300, damping: 24 },
                        },
                      }}
                    >
                      <SheetClose
                        render={
                          <Link
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(link.href);
                            }}
                            className={cn(
                              "flex items-center justify-between rounded-xl p-3 font-sans text-base font-medium transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          />
                        }
                      >
                        {label}

                        {isActive && <span className="bg-primary h-2 w-2 rounded-full" />}
                      </SheetClose>
                    </motion.div>
                  );
                })}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 300, damping: 24 },
                    },
                  }}
                  className="mt-1.5 flex flex-col gap-1.5 border-t"
                >
                  <Button variant="outline" size="default" className="mt-3 cursor-pointer">
                    {tButton("enter")}
                  </Button>

                  <Button variant="default" size="default" className="cursor-pointer">
                    {tButton("startFree")}
                  </Button>
                </motion.div>
              </motion.nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
