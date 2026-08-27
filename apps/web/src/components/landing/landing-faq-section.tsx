"use client";

import { useTranslations } from "next-intl";

import { SectionHeading } from "@/components/landing/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LandingFaqSection() {
  const t = useTranslations("landing.faq");
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <section id="faq" className="w-full py-24 sm:py-28">
      <SectionHeading
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
        align="center"
        className="mx-auto"
      />

      <Accordion className="mx-auto mt-10 max-w-2xl">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-card-foreground text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
