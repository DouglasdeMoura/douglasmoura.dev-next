import type { PostEntity } from '../entities/post.js'
import { DateTime } from './components/date-time.js'
import { Title } from './components/title.js'

type PostProps = {
  variant?: 'post' | 'excerpt'
} & PostEntity

export function Post({
  id,
  title,
  locale,
  created,
  updated,
  content,
  tags,
  variant = 'post',
  slug,
  // translates,
}: PostProps) {
  const link = locale === 'en-US' ? `/${locale}/${slug}` : `/${slug}`

  return (
    <article id={`post-${id}`} class={`${variant}`}>
      <header>
        {variant === 'post' ? (
          <Title order={1}>{title}</Title>
        ) : (
          <Title order={2}>
            <a href={link} rel="bookmark">
              {title}
            </a>
          </Title>
        )}
        <DateTime created={created} updated={updated} />

        <ul>
          {tags?.map((tag) => (
            <li key={tag}>
              <a href={`/${locale === 'en-US' ? `${locale}/` : ''}tags/${tag}`}>
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </header>
      <div className="prose">{content}</div>
    </article>
  )
}
