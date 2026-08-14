"use client";

import { getLocaleMeta } from "@i18n/locale-meta";
import { usePathname, useRouter } from "@i18n/navigation";
import { routing } from "@i18n/routing";
import { Check, Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const t = useTranslations("common.language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const current = getLocaleMeta(locale);

  const [isPending, startTransition] = useTransition();

  function handleSelect(nextLocale: string) {
    if (nextLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="default"
            disabled={isPending}
            aria-label={t("changeLanguage")}
            title={t("changeLanguage")}
            className="cursor-pointer rounded-full"
          >
            <motion.span
              whileHover={{ rotate: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 14 }}
              className="text-muted-foreground flex items-center justify-center"
            >
              <Globe className="size-4" />
            </motion.span>

            <span className="text-sm font-medium">{current.short}</span>
          </Button>
        }
      />

      <DropdownMenuContent align="end" sideOffset={10} className="flex min-w-48 flex-col gap-1">
        {routing.locales.map((loc) => {
          const meta = getLocaleMeta(loc);
          const isActive = loc === locale;

          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleSelect(loc)}
              variant="default"
              className={cn(
                "flex cursor-pointer items-center justify-between py-2",
                isActive && "bg-primary/10",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{meta.flag}</span>

                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary" : "text-foreground",
                  )}
                >
                  {meta.label}
                </span>
              </span>

              <AnimatePresence mode="wait" initial={false}>
                {isActive && (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                    className="text-primary flex"
                  >
                    <Check className="size-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
