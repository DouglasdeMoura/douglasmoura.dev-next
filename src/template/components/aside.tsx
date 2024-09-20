import { useTranslation } from '../../i18n/index.js'
import { Gravatar } from './gravatar'

export function Aside() {
  const t = useTranslation('Aside')

  return (
    <aside className="hidden w-full max-w-60 md:flex flex-col gap-4">
      <Gravatar />
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-2xl">Douglas Moura</h2>
        <p className="text-base text-balance">
          {t('Software Engineer, Musician and Jiujiteiro.')}
        </p>
      </div>
    </aside>
  )
}
