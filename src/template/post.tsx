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
  return (
    <article id={`post-${id}`} class={variant}>
      <header>
        {variant === 'post' ? (
          <h1>{title}</h1>
        ) : (
          <h2>
            <a href={`/${slug}`} rel="bookmark">{title}</a>
          </h2>
        )}
        {/*
        <p>
          <time dateTime={created.toISOString()}>
            {created.toLocaleDateString(locale)}
          </time>
          {updated && updated > created && (
            <>
              {' - '}
              <time dateTime={updated.toISOString()}>
                {updated.toLocaleDateString(locale)}
              </time>
            </>
          )}
        </p>
        */}
        <ul>
          {tags?.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>
      <div>{content}</div>
    </article>
  )
}
