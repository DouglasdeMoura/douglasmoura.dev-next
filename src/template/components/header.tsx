import type { PropsWithChildren } from 'hono/jsx'
import type { Locale } from '../../constants/index.js'

import { useRequestContext } from 'hono/jsx-renderer'

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
    <header className="flex gap-5 justify-between text-sm py-4">
      <form
        method="post"
        action="/set-locale"
        className="px-1 py-[6px] rounded bg-slate-200 flex align-middle justify-center items-center"
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
    </header>
  )
}
