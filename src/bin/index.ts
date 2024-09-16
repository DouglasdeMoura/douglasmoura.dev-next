import fs from 'node:fs/promises'
import postService from '../services/post.js'

async function indexPosts() {
  const data = await postService.index()

  fs.writeFile(
    './src/database/posts/postsById.json',
    JSON.stringify(data.postsById, null, 2),
  )

  fs.writeFile(
    './src/database/posts/postsBySlug.json',
    JSON.stringify(data.postsBySlug, null, 2),
  )

  fs.writeFile(
    './src/database/posts/tags.json',
    JSON.stringify(data.tags, null, 2),
  )

  fs.writeFile(
    './src/database/posts/en-US.json',
    JSON.stringify(data['en-US'], null, 2),
  )

  fs.writeFile(
    './src/database/posts/pt-BR.json',
    JSON.stringify(data['pt-BR'], null, 2),
  )
}

indexPosts()
