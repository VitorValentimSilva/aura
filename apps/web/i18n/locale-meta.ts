export type LocaleMeta = {
  label: string;
  short: string;
  flag: string;
};

const LOCALE_META: Record<string, LocaleMeta> = {
  "pt-BR": { label: "Português", short: "PT", flag: "🇧🇷" },
  "en-US": { label: "English", short: "EN", flag: "🇺🇸" },
};

export function getLocaleMeta(locale: string): LocaleMeta {
  return (
    LOCALE_META[locale] ?? {
      label: locale.toUpperCase(),
      short: locale.slice(0, 2).toUpperCase(),
      flag: "🌐",
    }
  );
}
