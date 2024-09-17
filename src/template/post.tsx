import type { PostEntity } from '../entities/post.js'
import { DateTime } from './components/date-time.js'
import { Tags } from './components/tags.js'
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
    <article
      id={`post-${id}`}
      className={`${variant} flex flex-col gap-4 border-b border-b-slate-200 max-w-prose pb-10`}
    >
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
      </header>
      <Tags tags={tags} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: the content is stored as HTML */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
