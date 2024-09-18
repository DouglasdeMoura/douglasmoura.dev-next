import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }, c) => {
  return (
    <html lang={c.var.selectedLocale}>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
          crossorigin="anonymous"
        />
      </head>
      <body>
        <div className="m-auto max-w-[960px]">{children}</div>
      </body>
    </html>
  )
})
