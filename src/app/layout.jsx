import './global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ThemeToggle from './components/ThemeToggle'

export const metadata = {
  title: 'Killers',
  description: 'Pest service',
}

export default function RootLayout({children}) {
  return (
    <html lang="en" class="dark">
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
        {/* <ThemeToggle /> */}
            {children}
        </body>
      </UserProvider>
    </html>
  )
}
