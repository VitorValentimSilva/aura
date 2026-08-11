import { routing } from "@i18n/routing";
import { notFound } from "next/navigation";
import { locale as getLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramLocale = await getLocale();

    if (hasLocale(routing.locales, paramLocale)) {
      locale = paramLocale;
    } else {
      notFound();
    }
  }

  return { locale, messages: (await import(`@messages/${locale}.json`)).default };
});
