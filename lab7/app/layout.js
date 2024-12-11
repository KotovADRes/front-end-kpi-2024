export default function RootLayout({ children }) {
  return (
      <html lang="uk">
          <head>
              <meta charSet="utf-8" />
              <title>Котов А.Д. ІК-23</title>
          </head>
          <body>
              {children}
          </body>
      </html>
  );
}