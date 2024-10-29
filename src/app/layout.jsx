import Header from "./header/Header"
import Footer from "./footer/footer"
import './global.css'

export const metadata = {
  title: 'Killers',
  description: 'Pest service',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="page-wrapper">
         {children}
      </body>
    </html>
  )
}
