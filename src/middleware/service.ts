import { createMiddleware } from 'hono/factory'
import postService, { type PostService } from '../services/post.js'
import { getPreferredLanguage } from '../services/get-preferred-language.js'
import { getCookie } from 'hono/cookie'
import type { Locale } from '../constants/index.js'

export const DEFAULT_LANGUAGE: Locale = 'pt-BR'

export type ServiceEnv = {
  Variables: {
    service: {
      post: PostService
    }
    locale: Locale
    selectedLocale: Locale
  }
}

export const service = createMiddleware<ServiceEnv>(async (c, next) => {
  c.set('service', {
    post: postService,
  })

  const locale = getPreferredLanguage(c.req.header('Accept-Language'))
  const selectedLocale =
    (getCookie(c, 'selected_localed') as Locale) ?? locale ?? DEFAULT_LANGUAGE

  c.set('locale', locale)
  c.set('selectedLocale', selectedLocale)

  await next()
})
