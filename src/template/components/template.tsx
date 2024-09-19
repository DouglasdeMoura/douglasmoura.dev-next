import type { PropsWithChildren } from 'hono/jsx'
import { Header } from './header.js'

export function Template({ children }: PropsWithChildren) {
  return (
    <div className="px-4">
      <div className="m-auto max-w-[960px]">
        <Header />
        <main className="flex flex-col gap-8">{children}</main>
      </div>
    </div>
  )
}
