import fs from 'node:fs/promises'
import matter from 'gray-matter'

import { PostEntity } from '../entities/post.js'
import { generatePostId } from '../services/generate-post-id.js'

class PostRepository {
  get postsPath() {
    return './src/database/posts'
  }

  private async postsFileList() {
    return fs.readdir(this.postsPath)
  }

  async create(post: PostEntity) {
    const id = generatePostId({ created: post.created, title: post.title })
    await fs.writeFile(`${this.postsPath}/${id}.md`, post.toString())

    return id
  }

  async getById(id: string) {
    const files = (await this.postsFileList()).filter(file => file.includes(id))
    const path = files?.[0]

    if (!path) {
      return null
    }

    const { data, content } = matter.read(`${this.postsPath}/${path}`)

    return new PostEntity({
      id: data.id,
      title: data.title,
      locale: data.locale,
      created: new Date(data.created),
      updated: new Date(data.updated),
      content: content,
      tags: data.tags.split(', '),
      translates: data.translates
    })
  }

  async update(post: PostEntity) {
    const id = generatePostId({ created: post.created, title: post.title })
    await fs.writeFile(`${this.postsPath}/${id}.md`, post.toString())

    return id
  }
}

export default new PostRepository()