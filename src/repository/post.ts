// import fs from 'node:fs/promises'
import MiniSearch from 'minisearch'

import { PostEntity } from '../entities/post.js'
// import { generatePostId } from '../services/generate-post-id.js'
import type { Locale } from '../constants/index.js'

export class PostRepository {
  // private async postsFileList() {
  //   return (await fs.readdir(this.postsPath)).map(
  //     (file) => `${this.postsPath}/${file}`,
  //   )
  // }

  // async create(post: PostEntity) {
  //   const id = generatePostId({ created: post.created, title: post.title })
  //   await fs.writeFile(`${this.postsPath}/${id}.md`, post.toString())

  //   return id
  // }

  async getById(id: string) {
    const postsById = await import('../database/posts/postsById.json').then(
      (res) => res.default,
    )
    const data = postsById?.[id as keyof typeof postsById]

    if (!data) {
      return null
    }

    return new PostEntity({
      id: data.id,
      title: data.title,
      locale: data.locale as Locale,
      created: new Date(data.created),
      updated: new Date(data.updated),
      content: data.content,
      tags: data.tags,
      translates: data.translates ?? undefined,
    })
  }

  async getBySlug(slug: string) {
    const postsBySlug = await import('../database/posts/postsBySlug.json').then(
      (res) => res.default,
    )
    const data = postsBySlug?.[slug as keyof typeof postsBySlug]

    if (!data) {
      return null
    }

    return new PostEntity({
      id: data.id,
      title: data.title,
      locale: data.locale as Locale,
      created: new Date(data.created),
      updated: new Date(data.updated),
      content: data.content,
      tags: data.tags,
      translates: data.translates ?? undefined,
    })
  }

  async getAllPosts({ locale, tag }: { locale: Locale; tag?: string }) {
    const enUS = await import('../database/posts/en-US.json').then(
      (res) => res.default,
    )
    const ptBR = await import('../database/posts/pt-BR.json').then(
      (res) => res.default,
    )
    const tags = await import('../database/posts/tags.json').then(
      (res) => res.default,
    )

    const posts = !tag
      ? (locale === 'en-US' ? enUS : ptBR).map(
          (post) =>
            new PostEntity({
              id: post.id,
              title: post.title,
              locale: post.locale as Locale,
              created: new Date(post.created),
              updated: new Date(post.updated),
              content: post.content,
              tags: post.tags,
              translates: post.translates ?? undefined,
            }),
        )
      : tags[tag as keyof typeof tags].reduce((acc: PostEntity[], post) => {
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
                translates: post.translates ?? undefined,
              }),
            )
          }

          return acc
        }, [])

    return posts
  }

  // async update(post: PostEntity) {
  //   const id = generatePostId({ created: post.created, title: post.title })
  //   await fs.writeFile(`${this.postsPath}/${id}.md`, post.toString())

  //   return id
  // }

  async paginate({
    page = 1,
    limit = 10,
    tag,
    locale,
  }: { page?: number; limit?: number; tag?: string; locale: Locale }) {
    const posts = await this.getAllPosts({ locale, tag })
    const start = page > 1 ? (page - 1) * limit : 0
    const totalPosts = posts.length
    const totalPages = Math.ceil(totalPosts / limit)

    return {
      currentPage: page,
      pages: totalPages,
      posts: totalPosts,
      items: posts.slice(start, start + limit),
    }
  }

  async search({
    query,
    locale,
    tag,
  }: { query: string; tag?: string; locale: Locale }) {
    const posts = await this.getAllPosts({ locale, tag })
    const minisearch = new MiniSearch({
      fields: ['title', 'content', 'tags'],
      storeFields: [
        'id',
        'title',
        'slug',
        'locale',
        'created',
        'updated',
        'content',
        'tags',
        'translates',
      ],
    })

    minisearch.addAll(posts)

    return minisearch.search(query) as unknown as PostEntity[]
  }
}

export default new PostRepository()
