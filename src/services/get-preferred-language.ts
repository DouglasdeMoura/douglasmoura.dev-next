import type { PostEntity } from '../entities/post.js'

type Locale = PostEntity['locale']

// Define the preferred languages, in order of preference
const PREFERRED_LANGUAGES: Locale[] = ['en-US', 'pt-BR']

function getPreferredLanguages(acceptLanguage?: string) {
  if (!acceptLanguage) {
    return PREFERRED_LANGUAGES
  }

  return acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, qValue] = lang.trim().split(';q=')
      return {
        code,
        q: qValue ? Number.parseFloat(qValue) : 1.0, // Default quality factor is 1.0
      }
    })
    .map((item) => item.code)
}

export function getPreferredLanguage(
  acceptLanguage?: string,
): Locale {
  const preferredLanguages = getPreferredLanguages(acceptLanguage)
  const lang = preferredLanguages.find((lang) =>
    PREFERRED_LANGUAGES.includes(lang as Locale),
  ) as Locale

  return lang || PREFERRED_LANGUAGES[0]
}
