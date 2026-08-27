import {
  FileText,
  Landmark,
  Mail,
  MessageCircle,
  ShoppingBag,
  ShoppingCart,
  Store,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Marquee } from "@/components/common/marquee";
import { SectionHeading } from "@/components/landing/section-heading";

const INTEGRATION_KEYS = [
  { key: "whatsapp", icon: MessageCircle },
  { key: "email", icon: Mail },
  { key: "banks", icon: Landmark },
  { key: "pix", icon: Zap },
  { key: "nfe", icon: FileText },
  { key: "shopify", icon: ShoppingBag },
  { key: "mercadoLivre", icon: ShoppingCart },
  { key: "shopee", icon: Store },
] as const;

export function LandingIntegrationsSection() {
  const t = useTranslations("landing.integrations");

  const items = INTEGRATION_KEYS.map(({ key, icon: Icon }) => (
    <span
      key={key}
      className="border-border bg-card text-card-foreground flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium"
    >
      <Icon className="text-primary size-4" />
      {t(key)}
    </span>
  ));

  return (
    <section className="w-full py-24 sm:py-28">
      <SectionHeading
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
        align="center"
        className="mx-auto"
      />

      <div className="mt-12">
        <Marquee items={items} durationSeconds={36} />
      </div>
    </section>
  );
}
