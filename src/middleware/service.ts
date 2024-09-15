import { createMiddleware } from 'hono/factory'
import postService, { type PostService } from '../services/post.js'
import { getPreferredLanguage } from '../services/get-preferred-language.js'
import type { PostEntity } from '../entities/post.js'
import { getCookie } from 'hono/cookie'

export const DEFAULT_LANGUAGE: PostEntity['locale'] = 'pt-BR'

export type ServiceEnv = {
  Variables: {
    service: {
      post: PostService
    }
    locale: PostEntity['locale']
    selectedLocale: PostEntity['locale']
  }
}

export const service = createMiddleware<ServiceEnv>(async (c, next) => {
  c.set('service', {
    post: postService,
  })

  const locale = getPreferredLanguage(c.req.header('Accept-Language'))
  const selectedLocale =
    (getCookie(c, 'selected_localed') as PostEntity['locale']) ??
    locale ??
    DEFAULT_LANGUAGE

  c.set('locale', locale)
  c.set('selectedLocale', selectedLocale)

  await next()
})
