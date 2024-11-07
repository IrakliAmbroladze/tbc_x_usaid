import './global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Header from './components/Header'

export const metadata = {
  title: 'Killers',
  description: 'Pest service',
}

export default function RootLayout({children}) {
  return (
    <html>
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
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
