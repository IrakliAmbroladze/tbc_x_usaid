export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <title>React App</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
