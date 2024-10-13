import '../index.css'
 
export const metadata = {
  title: 'Killers',
  description: 'Pest service',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
