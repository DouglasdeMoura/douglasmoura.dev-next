import type { PostEntity } from '../../entities/post.js'
import { DateTime } from './date-time.js'
import { Tags } from './tags.js'
import { Title } from './title.js'

type PostProps = {
  variant?: 'post' | 'excerpt'
  className?: string
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
  className,
  // translates,
}: PostProps) {
  const link = locale === 'en-US' ? `/${locale}/${slug}` : `/${slug}`

  return (
    <article
      id={`post-${id}`}
      className={`${variant} ${className} flex flex-col gap-4 pb-8`}
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
      <div
        className="prose-code:before:content-none prose-code:after:content-none prose prose-a:text-blue-600 hover:prose-a:no-underline"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: the content is stored as HTML
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
