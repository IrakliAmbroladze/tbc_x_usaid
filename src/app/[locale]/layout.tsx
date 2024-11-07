import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing';
import Header from '../components/Header';
import './global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
 
export const metadata = {
  title: 'Killers',
  description: 'Pest service',
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
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
      <body className="page-wrapper bg-white dark:bg-stone-800">
        {/* <div> */}
        <NextIntlClientProvider messages={messages}>
        <Header />
          <div className='default-layout'>

          {children}
          </div>
        </NextIntlClientProvider>
          {/* </div> */}
      </body>
      </UserProvider>

    </html>
  );
}