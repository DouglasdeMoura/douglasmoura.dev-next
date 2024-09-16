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
    <div>
      <form method="post" action="/set-locale">
        <button name="locale" value="en-US" type="submit">
          en
        </button>
        <button name="locale" value="pt-BR" type="submit">
          pt
        </button>
      </form>
      <main>
        <h1>Posts</h1>

        {posts.map((post) => (
          <Post {...post} variant="excerpt" />
        ))}
      </main>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
