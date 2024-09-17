import type { PostEntity } from '../../entities/post.js'

type TagsProps = {
  tags?: PostEntity['tags']
}

export function Tags({ tags }: TagsProps) {
  return (
    <div className="text-xs flex gap-2">
      <span className="sr-only">Tags:</span>
      {tags?.map((tag) => (
        <a
          key={tag}
          href={`/tags/${tag}`}
          className="inline-block uppercase font-bold before:content-['#'] hover:opacity-80"
        >
          {tag}
        </a>
      ))}
    </div>
  )
}
