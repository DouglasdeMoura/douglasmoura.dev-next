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
      <form method="post" action="/set-locale">
        <button name="locale" value="en-US" type="submit">
          en
        </button>
        <button name="locale" value="pt-BR" type="submit">
          pt
        </button>
      </form>
      <main className="flex flex-col gap-4">
        {!posts || posts.length === 0 ? <p>No posts found</p> : null}
        {posts.map((post) => (
          <Post {...post} variant="excerpt" />
        ))}
      </main>
      {posts?.length > 0 ? (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      ) : null}
    </>
  )
}
