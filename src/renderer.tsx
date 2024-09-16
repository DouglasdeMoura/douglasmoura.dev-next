import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }, c) => {
  return (
    <html lang={c.var.selectedLocale}>
      <head>
        {/* <link href="/static/style.css" rel="stylesheet" /> */}
      </head>
      <body>{children}</body>
    </html>
  )
})
