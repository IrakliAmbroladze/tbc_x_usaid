import './global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: 'Killers',
  description: 'Pest service',
}

export default function RootLayout({children}) {
  return (
    <html lang="en" className="light">
      <UserProvider>
        <body className="page-wrapper bg-white dark:bg-stone-800">
            {children}
        </body>
      </UserProvider>
    </html>
  )
}
