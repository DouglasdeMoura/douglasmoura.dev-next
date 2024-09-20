import type { PropsWithChildren } from 'hono/jsx'
import { Header } from './header.js'
import { Aside } from './aside.js'

export function Template({ children }: PropsWithChildren) {
  return (
    <div className="m-auto max-w-[875px]">
      <Header />
      <div className="flex gap-4 justify-between">
        <Aside />
        <main className="flex flex-col gap-8 px-4 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
