import fs from 'node:fs/promises'
import matter from 'gray-matter'

import { PostEntity } from '../entities/post.js'
import { generatePostId } from '../services/generate-post-id.js'
import type { Locale } from '../constants/index.js'

export class PostRepository {
  get postsPath() {
    return './src/database/posts'
  }

  private async postsFileList() {
    return (await fs.readdir(this.postsPath)).map(
      (file) => `${this.postsPath}/${file}`,
    )
  }

  async create(post: PostEntity) {
    const id = generatePostId({ created: post.created, title: post.title })
    await fs.writeFile(`${this.postsPath}/${id}.md`, post.toString())

    return id
  }

  async getById(id: string) {
    const files = (await this.postsFileList()).filter((file) =>
      file.includes(id),
    )
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
      translates: data.translates,
    })
  }

  async getBySlug(slug: string) {
    const files = (await this.postsFileList()).filter((file) =>
      file.includes(slug),
    )
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
      translates: data.translates,
    })
  }

  async update(post: PostEntity) {
    const id = generatePostId({ created: post.created, title: post.title })
    await fs.writeFile(`${this.postsPath}/${id}.md`, post.toString())

    return id
  }

  async index() {
    const list = (await this.postsFileList()).reverse()
    const index: { tags?: Record<string, PostEntity[]> } & Record<
      string,
      PostEntity[]
    > = {}

    for (const file of list) {
      const { data, content } = matter.read(file)

      if (!index[data.locale]) {
        index[data.locale] = []
      }

      const post = new PostEntity({
        id: data.id,
        title: data.title,
        locale: data.locale,
        created: new Date(data.created),
        updated: new Date(data.updated),
        content,
        tags: data.tags.split(', '),
        translates: data.translates,
      })

      for (const tag of post.tags) {
        if (!index.tags) {
          index.tags = {}
        }

        if (!index.tags[tag]) {
          index.tags[tag] = []
        }

        index.tags[tag].push(post)
      }

      index[data.locale].push(post)
    }

    index['pt-BR'] = index['pt-BR'].sort(
      (a, b) => b.created.getTime() - a.created.getTime(),
    )

    index['en-US'] = index['en-US'].sort(
      (a, b) => b.created.getTime() - a.created.getTime(),
    )

    for (const tag in index.tags) {
      index.tags[tag] = index.tags[tag].sort(
        (a, b) => b.created.getTime() - a.created.getTime(),
      )
    }

    return index
  }

  async paginate({
    page = 1,
    limit = 10,
    tag,
    locale,
  }: { page?: number; limit?: number; tag?: string; locale: Locale }) {
    const index = await fs
      .readFile(`${this.postsPath}/index.json`, 'utf-8')
      .then(JSON.parse)
    const start = page > 1 ? (page - 1) * limit : 0
    const posts = !tag
      ? index[locale].map(
          (post: PostEntity) =>
            new PostEntity({
              id: post.id,
              title: post.title,
              locale: post.locale,
              created: new Date(post.created),
              updated: new Date(post.updated),
              content: post.content,
              tags: post.tags,
              translates: post.translates,
            }),
        )
      : index.tags[tag].reduce((acc: PostEntity[], post: PostEntity) => {
          if (post.locale === locale) {
            acc.push(
              new PostEntity({
                id: post.id,
                title: post.title,
                locale: post.locale,
                created: new Date(post.created),
                updated: new Date(post.updated),
                content: post.content,
                tags: post.tags,
                translates: post.translates,
              }),
            )
          }

          return acc
        }, [])

    const totalPosts = posts.length
    const totalPages = Math.ceil(totalPosts / limit)

    return {
      currentPage: page,
      pages: totalPages,
      posts: totalPosts,
      items: posts.slice(start, start + limit),
    }
  }
}

export default new PostRepository()
