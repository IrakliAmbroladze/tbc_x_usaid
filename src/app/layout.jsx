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
      <body>
        <div className="page-wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
      </body>
    </html>
  )
}
