import type { PropsWithChildren } from 'hono/jsx'

export function Template({ children }: PropsWithChildren) {
  return (
    <div className="m-auto max-w-[960px]">
      <form method="post" action="/set-locale">
        <button name="locale" value="en-US" type="submit">
          en
        </button>
        <button name="locale" value="pt-BR" type="submit">
          pt
        </button>
      </form>
      <main className="flex flex-col gap-8">{children}</main>
    </div>
  )
}
