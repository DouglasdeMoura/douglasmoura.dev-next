import fs from 'node:fs/promises'
import postService from '../services/post.js'

async function indexPosts() {
  const data = await postService.index()

  fs.writeFile('./src/database/posts/index.json', JSON.stringify(data, null, 2))
}

indexPosts()
