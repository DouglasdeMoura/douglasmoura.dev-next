import { Feed } from 'feed'

import type { PostEntity } from '../entities/post.js'
import postRepository, { type PostRepository } from '../repository/post.js'

export class PostService {
  repository: PostRepository

  constructor() {
    this.repository = postRepository
  }

  async create(_post: PostEntity) {
    // return this.repository.create(post)
    throw new Error('Not implemented')
  }

  async getById(id: string) {
    return this.repository.getById(id)
  }

  async getBySlug(slug: string) {
    return this.repository.getBySlug(slug)
  }

  async getFeed(args: Parameters<PostRepository['getAllPosts']>[0]) {
    const posts = await this.repository.getAllPosts(args)

    const config = {
      'en-US': {
        language: 'en',
        copyright: 'CC BY-NC 4.0 for blog posts and MIT for code',
        feedLinks: {
          rss: 'https://douglasmoura.dev/en-US/rss.xml',
          json: 'https://douglasmoura.dev/en-US/feed.json',
          atom: 'https://douglasmoura.dev/en-US/atom.xml',
        },
        description: 'Software Engineer',
        id: 'https://douglasmoura.dev/en-US',
        link: 'https://douglasmoura.dev/en-US',
      },
      'pt-BR': {
        language: 'pt',
        copyright: 'CC BY-NC 4.0 para os artigos e MIT para o código',
        feedLinks: {
          rss: 'https://douglasmoura.dev/rss.xml',
          json: 'https://douglasmoura.dev/feed.json',
          atom: 'https://douglasmoura.dev/atom.xml',
        },
        description: 'Engenheiro de software',
        id: 'https://douglasmoura.dev/',
        link: 'https://douglasmoura.dev/',
      },
    }

    const feedInfo = config[args.locale]

    const author = {
      name: 'Douglas Moura',
      email: 'hello@douglasmoura.dev',
      link: 'https://douglasmoura.dev',
    }

    const feed = new Feed({
      title: 'Douglas de Moura',
      author,
      ...feedInfo,
    })

    for (const post of posts) {
      const url = `https://douglasmoura.dev/${args.locale === 'en-US' ? 'en-US/' : ''}${post.slug}`

      feed.addItem({
        title: post.title,
        id: url,
        link: url,
        description: post?.description,
        content: post.content,
        date: post.created,
        author: [author],
      })
    }

    return feed
  }

  async update(_post: PostEntity) {
    // return this.repository.update(post)
    throw new Error('Not implemented')
  }

  async paginate(args: Parameters<PostRepository['paginate']>[0]) {
    return this.repository.paginate(args)
  }

  async search(args: Parameters<PostRepository['search']>[0]) {
    return this.repository.search(args)
  }
}

export default new PostService()
