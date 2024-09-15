import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { validator } from 'hono/validator'
import { z } from 'zod'

import {
  DEFAULT_LANGUAGE,
  type ServiceEnv,
  service,
} from './middleware/service.js'
import { renderer } from './renderer.js'
import { Error404 } from './template/404.js'
import { Post } from './template/post.js'
import { Error500 } from './template/500.js'
import { Index } from './template/index.js'

const app = new Hono<ServiceEnv>()

app.use(renderer)
app.use(service)

app.on('GET', ['/', '/en-US', '/en-US/'], async (c) => {
  if (
    c.var.selectedLocale !== DEFAULT_LANGUAGE &&
    !c.req.path.includes(c.var.selectedLocale)
  ) {
    return c.redirect(`/${c.var.selectedLocale}${c.req.path}`)
  }

  const posts = await c.var.service.post.paginate({
    locale: c.var.selectedLocale,
  })

  return c.render(
    <Index
      posts={posts.items}
      currentPage={posts.currentPage}
      totalPages={posts.pages}
    />,
  )
})

app.on(
  'GET',
  ['/page/:page', '/en-US/page/:page', '/en-US/page/:page/'],
  validator('param', (value) => {
    const schema = z.object({ page: z.number({ coerce: true }) })
    const parsed = schema.safeParse(value)

    if (!parsed.success) {
      throw new HTTPException(400, {
        message: 'Invalid page number',
      })
    }

    return parsed.data
  }),
  async (c) => {
    const page = Number.parseInt(c.req.param('page'))
    const posts = await c.var.service.post.paginate({
      page,
      locale: c.var.selectedLocale,
    })

    if (!posts.items.length) {
      throw new HTTPException(404, {
        message: 'Page not found',
      })
    }

    return c.render(
      <Index
        posts={posts.items}
        currentPage={posts.currentPage}
        totalPages={posts.pages}
      />,
    )
  },
)

app.on('GET', ['/:id', '/en-US/:id', '/en-US/:id/'], async (c) => {
  const post = await c.var.service.post.getBySlug(c.req.param('id'))

  if (!post) {
    throw new HTTPException(404, {
      message: 'Post not found',
    })
  }

  return c.render(<Post {...post} />)
})

app.onError((err, c) => {
  // console.log(err)
  if (err instanceof HTTPException) {
    if (err.status === 404) {
      return c.render(<Error404 />)
    }

    if (err.status === 500) {
      return c.render(<Error500 />)
    }

    return err.getResponse()
  }

  return c.render(<Error500 />)
})

export default app
