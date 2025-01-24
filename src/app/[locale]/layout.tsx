import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import Header from "../components/Header";
import "./global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Killers",
  description: "Pest service",
};

type Locale = (typeof routing.locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head></head>
      <body className="page-wrapper bg-white dark:bg-stone-800 bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="default-layout">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
