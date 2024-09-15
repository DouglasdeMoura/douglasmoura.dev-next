import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'
import { getPreferredLanguage } from './services/get-preferred-language.js'

export const renderer = jsxRenderer(({ children }) => {
  const c = useRequestContext()
  const lang = getPreferredLanguage(c.req.header('Accept-Language'))

  return (
    <html lang={lang}>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
})
