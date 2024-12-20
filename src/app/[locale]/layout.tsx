import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import Header from "../components/Header";
import "./global.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Metadata } from "next";

// Define metadata
export const metadata: Metadata = {
  title: "Killers",
  description: "Pest service",
};

// Define a type for locales
type Locale = (typeof routing.locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Validate locale
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Pass the locale as an object to getMessages
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Toggle dark mode based on localStorage or system preference
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.removeAttribute('data-theme');
                }
              })();
            `,
          }}
        />
      </head>
      <UserProvider>
        <body className="page-wrapper bg-white dark:bg-stone-800 bg-background text-foreground">
          <NextIntlClientProvider messages={messages}>
            <Header />
            <div className="default-layout">{children}</div>
          </NextIntlClientProvider>
        </body>
      </UserProvider>
    </html>
  );
}
