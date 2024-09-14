import { Hono } from 'hono'
import { renderer } from './renderer.js'
import { service, type ServiceEnv } from './middleware/service.js'

const app = new Hono<ServiceEnv>()

app.use(renderer)
app.use(service)

app.get('/', (c) => {
  return c.render(<h1>Hello, world!</h1>)
})

app.get('/:id', async (c) => {
  const post = await c.var.service.post.getBySlug(c.req.param('id'))
  if (!post) return c.render(<main>Post not found</main>)

  return c.render(<main>{post.title}</main>)
})

export default app
