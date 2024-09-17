import type { PostEntity } from '../entities/post.js'

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
          <h1 className="font-extrabold text-4xl">{title}</h1>
        ) : (
          <h2 className="font-extrabold text-3xl">
            <a href={link} rel="bookmark">
              {title}
            </a>
          </h2>
        )}

        <p className="text-sm">
          <span className="sr-only">Created at</span>
          <time dateTime={created.toISOString()}>
            {created.toLocaleDateString(locale)}
          </time>
          {updated && updated > created && (
            <>
              <span className="sr-only">Updated at</span>
              <time dateTime={updated.toISOString()} className="sr-only">
                {updated.toLocaleDateString(locale)}
              </time>
            </>
          )}
        </p>

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
