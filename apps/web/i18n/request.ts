import { routing } from "@i18n/routing";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const isValidLocale =
    requestedLocale &&
    routing.locales.includes(requestedLocale as (typeof routing.locales)[number]);

  const locale = isValidLocale ? requestedLocale : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`@messages/${locale}.json`)).default,
  };
});
