import { useRequestContext } from 'hono/jsx-renderer'
import { useTranslation } from '../../i18n/index.js'

export function SearchInput() {
  const c = useRequestContext()
  const t = useTranslation('SearchInput')

  return (
    <form action="/search">
      <input
        type="text"
        name="q"
        placeholder={t('Search...')}
        value={c.req.query('q')}
        className="h-8 rounded text-sm border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
      />
      <button className="hidden" type="submit">
        {t('Search')}
      </button>
    </form>
  )
}
