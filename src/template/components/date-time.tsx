import { formatRFC3339 } from 'date-fns'

import { useFormatDate, useTranslation } from '../../i18n/index.js'

type DateTimeProps = {
  created?: Date
  updated?: Date
}

export function DateTime(props: DateTimeProps) {
  const t = useTranslation('DateTime')
  const { format } = useFormatDate()

  if (!props.created || !props.updated) {
    return null
  }

  const created = new Date(props.created)
  const updated = new Date(props.updated)

  const publishedFormatted = format(created)
  const updatedFormatted = format(updated)
  const publishedDatetime = formatRFC3339(created)
  const updatedDatetime = formatRFC3339(updated)

  return (
    <p className="posted-on text-sm">
      <span className="sr-only">{t('published')}</span>
      {created === updated ? (
        <time
          className="entry-date published updated"
          dateTime={publishedDatetime}
        >
          {publishedFormatted}
        </time>
      ) : (
        <>
          <span className="sr-only">{t('published')}</span>
          <time className="entry-date published" dateTime={publishedDatetime}>
            {publishedFormatted}
          </time>
          <span className="sr-only">
            {t('updated')}
            <time className="updated" dateTime={updatedDatetime}>
              {updatedFormatted}
            </time>
          </span>
        </>
      )}
    </p>
  )
}
