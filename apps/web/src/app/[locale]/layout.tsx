import "@app/globals.css";

import { enUS, ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { routing } from "@i18n/routing";
import { ThemeProvider } from "@providers/theme-provider";
import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

import { ConsoleNoiseFilter } from "@/components/common/console-noise-filter";

const CLERK_LOCALIZATIONS: Record<string, typeof ptBR> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Platform",
};

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full font-sans antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ConsoleNoiseFilter />

        <ClerkProvider localization={CLERK_LOCALIZATIONS[locale] ?? enUS}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
              enableSystem
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
