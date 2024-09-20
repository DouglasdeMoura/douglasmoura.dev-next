import type { PropsWithChildren } from 'hono/jsx'
import type { Locale } from '../../constants/index.js'

import { useRequestContext } from 'hono/jsx-renderer'
import { useTranslation } from '../../i18n/index.js'

type NavLinkProps = {
  href: string
} & PropsWithChildren

function NavLink({ href, children }: NavLinkProps) {
  return <a href={href}>{children}</a>
}

function Links() {
  const t = useTranslation('Header')

  return (
    <nav className="flex align-middle items-center text-sm font-semibold">
      <ul className="flex space-x-8">
        <li>
          <NavLink href="/">{t('home')}</NavLink>
        </li>
        <li>
          <NavLink href="/talks">{t('talks')}</NavLink>
        </li>
        <li>
          <NavLink href="/bookmarks">{t('bookmarks')}</NavLink>
        </li>
        <li>
          <NavLink href="/contact">{t('contact')}</NavLink>
        </li>
      </ul>
    </nav>
  )
}

type Radio = {
  name: string
  value: Locale
  checked?: boolean
} & PropsWithChildren

function Radio({ children, name, value, checked }: Radio) {
  return (
    <label>
      <input
        name={name}
        value={value}
        type="radio"
        checked={checked}
        onchange="this.form.submit()"
        className="hidden"
      />
      <span
        className="py-[3px] px-[6px]  rounded data-[checked=true]:bg-white hover:cursor-pointer"
        data-checked={checked}
      >
        {children}
      </span>
    </label>
  )
}

export function Header() {
  const c = useRequestContext()

  return (
    <header className="flex gap-5 justify-between text-sm border-b mb-8 p-4 md:py-4 md:px-0">
      <Links />
      <div className="flex align-middle justify-center items-center">
        <form
          method="post"
          action="/set-locale"
          className="p-1 rounded bg-slate-200"
        >
          <input type="hidden" name="redirect_from" value={c.req.path} />
          <Radio
            name="locale"
            value="en-US"
            checked={c.var.selectedLocale === 'en-US'}
          >
            en
          </Radio>
          <Radio
            name="locale"
            value="pt-BR"
            checked={c.var.selectedLocale === 'pt-BR'}
          >
            pt
          </Radio>
        </form>
      </div>
    </header>
  )
}
