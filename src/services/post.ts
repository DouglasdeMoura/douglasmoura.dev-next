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
