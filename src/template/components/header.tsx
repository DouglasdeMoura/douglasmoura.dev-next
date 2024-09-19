import { useRequestContext } from 'hono/jsx-renderer'

export function Header() {
  const c = useRequestContext()

  return (
    <>
      <form method="post" action="/set-locale">
        <input type="hidden" name="redirect_from" value={c.req.path} />
        <button name="locale" value="en-US" type="submit">
          en
        </button>
        <button name="locale" value="pt-BR" type="submit">
          pt
        </button>
      </form>
    </>
  )
}
