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
import { Post } from './template/components/post.js'
import { Error500 } from './template/500.js'
import { Index } from './template/index.js'
import { setCookie } from 'hono/cookie'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono<ServiceEnv>()

app.use(renderer)
app.use(service)

app.use('/static/*', async (c) => {
  c.header('Cache-Control', 'public, max-age=31536000, immutable')
})
app.use('/static/*', serveStatic())

app.post('/set-locale', async (c) => {
  const locale = (await c.req.formData()).get('locale') as string
  const redirectFrom = (await c.req.formData()).get('redirect_from')
  setCookie(c, 'selected_localed', locale)

  if (redirectFrom) {
    const slug = redirectFrom.toString().split('/').pop() ?? ''
    const post = await c.var.service.post.getBySlug(slug)

    if (post?.translates) {
      const translation = await c.var.service.post.getById(post.translates)

      if (translation) {
        const prefix = locale === DEFAULT_LANGUAGE ? '' : `/${locale}`
        return c.redirect(`${prefix}/${translation.slug}`)
      }
    }
  }

  return c.redirect('/')
})

app.get('rss.xml', async (c) => {
  const feed = await c.var.service.post.getFeed({
    locale: c.var.selectedLocale,
  })

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
})
app.get('atom.xml', async (c) => {
  const feed = await c.var.service.post.getFeed({
    locale: c.var.selectedLocale,
  })

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
})
app.get('feed.json', async (c) => {
  const feed = await c.var.service.post.getFeed({
    locale: c.var.selectedLocale,
  })
  return c.json(feed.json1())
})

app.on('GET', ['/search', '/en-US/search'], async (c) => {
  const query = c.req.query('q')

  if (!query) {
    throw new HTTPException(400, {
      message: 'Query is required',
    })
  }

  const posts = await c.var.service.post.search({
    query,
    locale: c.var.selectedLocale,
  })

  if (c.req.header('Content-type') === 'application/json') {
    return c.json({ posts })
  }

  return c.render(<Index posts={posts} currentPage={1} totalPages={1} />)
})

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

app.on(
  'GET',
  [
    '/tags/:tag',
    '/en-US/tags/:tag',
    '/tags/:tag/page/:page',
    '/en-US/tags/:tag/page/:page',
  ],
  async (c) => {
    const tag = c.req.param('tag')
    const page = Number.parseInt(c.req.param('page')) || 1
    const posts = await c.var.service.post.paginate({
      page,
      locale: c.var.selectedLocale,
      tag,
    })

    if (!posts.items.length) {
      throw new HTTPException(404, {
        message: 'Tag not found',
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
  console.log(err, c.req.url)
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
