import { createMiddleware } from 'hono/factory'
import postService, { type PostService } from '../services/post.js'
import { getPreferredLanguage } from '../services/get-preferred-language.js'
import type { PostEntity } from '../entities/post.js'

export type ServiceEnv = {
  Variables: {
    service: {
      post: PostService
      getPreferredLanguage: (header?: string) => PostEntity['locale']
    }
  }
}

export const service = createMiddleware<ServiceEnv>(async (c, next) => {
  c.set('service', {
    post: postService,
    getPreferredLanguage,
  })

  await next()
})
