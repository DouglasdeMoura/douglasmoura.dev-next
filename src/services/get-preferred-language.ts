import { type Locale, SUPPORTED_LOCALES } from '../constants/index.js'

function getPreferredLanguages(acceptLanguage?: string) {
  if (!acceptLanguage) {
    return SUPPORTED_LOCALES
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

export function getPreferredLanguage(acceptLanguage?: string): Locale {
  const preferredLanguages = getPreferredLanguages(acceptLanguage)
  const lang = preferredLanguages.find((lang) =>
    SUPPORTED_LOCALES.includes(lang as Locale),
  ) as Locale

  return lang || SUPPORTED_LOCALES[0]
}
