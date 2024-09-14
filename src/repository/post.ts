import fs from 'node:fs/promises'
import matter from 'gray-matter'

import { PostEntity } from '../entities/post.js'
import { generatePostId } from '../services/generate-post-id.js'

export class PostRepository {
  get postsPath() {
    return './src/database/posts'
  }

  private async postsFileList() {
    return (await fs.readdir(this.postsPath)).map(file => `${this.postsPath}/${file}`)
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

    const { data, content } = matter.read(path)

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

  async getBySlug(slug: string) {
    const files = (await this.postsFileList()).filter(file => file.includes(slug))
    const path = files?.[0]

    if (!path) {
      return null
    }

    const { data, content } = matter.read(path)

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

  async paginate(page = 1, limit = 10) {
    const list = await this.postsFileList()
    const totalPosts = list.length
    const totalPages = Math.ceil(totalPosts / limit)
    const start = page > 1 ? (page - 1) * limit : 0
    const files = list.slice(start, start + limit)
    
    const posts = await Promise.all(files.map(async file => {
      const { data, content } = matter.read(file)

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
    }))

    return {
      currentPage: page,
      pages: totalPages,
      posts: totalPosts,
      items: posts,
    }
  }
}

export default new PostRepository()