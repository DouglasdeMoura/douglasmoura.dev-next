import type { PostEntity } from '../entities/post.js'
import { Pagination } from './components/pagination.js'
import { Post } from './post.js'

type IndexProps = {
  posts: PostEntity[]
  currentPage: number
  totalPages: number
}

export function Index({ posts, currentPage, totalPages }: IndexProps) {
  return (
    <>
      {!posts || posts.length === 0 ? <p>No posts found</p> : null}
      {posts.map((post) => (
        // biome-ignore lint/correctness/useJsxKeyInIterable: not necessary for static content
        <Post {...post} variant="excerpt" />
      ))}
      {posts?.length > 0 ? (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      ) : null}
    </>
  )
}
