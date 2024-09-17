import { useRequestContext } from 'hono/jsx-renderer'
import {
  messages,
  type Locale,
  type I18nComponents,
  type Translations,
} from './messages.js'
import { format as formatFN } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export const useTranslation = (namespace: I18nComponents) => {
  const c = useRequestContext()
  const translations = messages[c.var.selectedLocale as Locale]

  // @ts-expect-error
  return (key: Translations) => translations[namespace][key]
}

export const useFormatDate = () => {
  const c = useRequestContext()
  const locale = c.var.selectedLocale as Locale
  const t = useTranslation('DateTime')

  const options = locale === 'en-US' ? undefined : { locale: ptBR }

  return {
    format: (date: Date, format?: string) =>
      formatFN(date, format ? format : t('format'), options),
  }
}
