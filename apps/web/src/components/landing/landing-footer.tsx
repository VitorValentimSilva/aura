"use client";

import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/common/language-switcher";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { scrollToSection } from "@/lib/scroll";

const FOOTER_LINKS = [
  { labelKey: "home", href: "#" },
  { labelKey: "modules", href: "#modulos" },
  { labelKey: "ai", href: "#ia" },
  { labelKey: "pricing", href: "#precos" },
  { labelKey: "faq", href: "#faq" },
] as const;

export function LandingFooter() {
  const t = useTranslations("landing.footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 w-full border-t">
      <div className="container mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <span className="text-foreground font-heading text-2xl font-normal tracking-tight italic">
              aura
            </span>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t("tagline")}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-muted-foreground hover:text-foreground cursor-pointer text-sm transition-colors"
              >
                {t(`links.${link.labelKey}`)}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-border/60 mt-10 flex flex-col-reverse items-center gap-4 border-t pt-6 sm:flex-row sm:justify-between">
          <span className="text-muted-foreground text-xs">{t("copyright", { year })}</span>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
