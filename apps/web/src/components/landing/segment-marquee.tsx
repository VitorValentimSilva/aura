import { useTranslations } from "next-intl";

import { Marquee } from "@/components/common/marquee";

const SEGMENT_KEYS = [
  "restaurants",
  "workshops",
  "clinics",
  "distributors",
  "smallBusinesses",
  "serviceProviders",
  "serviceCompanies",
] as const;

export function SegmentMarquee() {
  const t = useTranslations("landing.segments.items");

  const items = SEGMENT_KEYS.map((key) => (
    <span
      key={key}
      className="border-border bg-card text-muted-foreground rounded-full border px-5 py-2.5 text-sm font-medium"
    >
      <span className="text-card-foreground">{t(key)}</span>
    </span>
  ));

  return <Marquee items={items} />;
}
