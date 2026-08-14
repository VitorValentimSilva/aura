"use client";

import { Toggle } from "@components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const t = useTranslations("common.theme");

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="size-9" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <Toggle
      aria-label={t("changeTheme")}
      pressed={isDark}
      onPressedChange={toggleTheme}
      size="default"
      variant="outline"
      className="cursor-pointer"
      title={isDark ? t("switchToLight") : t("switchToDark")}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: -16, opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 16, opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="flex items-center justify-center text-indigo-400"
          >
            <Moon className="size-5 fill-indigo-400/20" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -16, opacity: 0, rotate: 45, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 16, opacity: 0, rotate: -45, scale: 0.6 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className="flex items-center justify-center text-amber-500"
          >
            <Sun className="size-5 fill-amber-500/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </Toggle>
  );
}
