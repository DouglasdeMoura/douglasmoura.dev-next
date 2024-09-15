import { createMiddleware } from 'hono/factory'
import postService, { type PostService } from '../services/post.js'

export type ServiceEnv = {
  Variables: {
    service: {
      post: PostService
    }
  }
}

export const service = createMiddleware<ServiceEnv>(async (c, next) => {
  c.set('service', {
    post: postService,
  })

  await next()
})
