import type { PropsWithChildren } from 'hono/jsx'
import type { Locale } from '../../constants/index.js'

import { useRequestContext } from 'hono/jsx-renderer'
import { useTranslation } from '../../i18n/index.js'
import { SearchInput } from './search-input.js'

type NavLinkProps = {
  href: string
} & PropsWithChildren

function NavLink({ href, children }: NavLinkProps) {
  return (
    <a href={href} className="hover:text-blue-600">
      {children}
    </a>
  )
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
        className="py-[3px] px-[6px] rounded data-[checked=true]:bg-white hover:cursor-pointer ring-offset-background"
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

      <div className="flex gap-2 align-middle justify-center items-center">
        <SearchInput />
        <form
          method="post"
          action="/set-locale"
          className="relative inline-grid items-center justify-center w-auto h-8 grid-cols-2 p-1 text-gray-500 bg-gray-100 rounded select-none"
        >
          <input type="hidden" name="redirect_from" value={c.req.path} />
          <Radio
            name="locale"
            value="en-US"
            checked={c.var.selectedLocale === 'en-US'}
          >
            <abbr title="English">en</abbr>
          </Radio>
          <Radio
            name="locale"
            value="pt-BR"
            checked={c.var.selectedLocale === 'pt-BR'}
          >
            <abbr title="Português">pt</abbr>
          </Radio>
        </form>
      </div>
    </header>
  )
}
