import { useTranslation } from '../../i18n/index.js'
import { DateTime } from './date-time.js'
import { Title } from './title.js'

type TalkProps = {
  list: Record<
    number,
    {
      title: string
      event: string
      date: Date
      link: string
    }[]
  >
}

export function Talks({ list }: TalkProps) {
  const t = useTranslation('Talks')

  return (
    <section className="flex flex-col gap-4 pb-8">
      <header>
        <Title order={1}>{t('Talks')}</Title>
      </header>

      <div className="prose-code:before:content-none prose-code:after:content-none prose prose-a:text-blue-600 hover:prose-a:no-underline prose-kbd:inline-flex  prose-kbd:items-center prose-kbd:justify-center prose-kbd:gap-1 prose-kbd:min-w-[30px] prose-p:m-0">
        {Object.keys(list).map((year) => (
          <div key={year}>
            <h2 className="text-xl">{year}</h2>

            {list[+year].map((talk) => (
              <article key="" className="mb-4">
                <header>
                  <h3 className="mb-2 mt-0 text-lg">{talk.title}</h3>
                </header>

                <p className="text-sm">
                  <a href={talk.link}>{talk.event}</a>
                </p>
                <DateTime created={talk.date} updated={talk.date} />
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
