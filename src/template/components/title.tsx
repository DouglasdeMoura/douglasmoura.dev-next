import type { PropsWithChildren } from 'hono/jsx'

type TitleProps = PropsWithChildren<{
  order?: 1 | 2 | 3 | 4 | 5 | 6
}>

export function Title({ children, order = 1 }: TitleProps) {
  const styles = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-normal',
    6: 'text-normal',
  }

  const Tag = `h${order || 1}`

  return (
    <Tag
      className={`font-extrabold text-balance decoration-inherit align-top ${styles[order]}`}
    >
      {children}
    </Tag>
  )
}
