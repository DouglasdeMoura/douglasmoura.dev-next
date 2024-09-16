import type { PostEntity } from '../entities/post.js'
import postRepository, { type PostRepository } from '../repository/post.js'

export class PostService {
  repository: PostRepository

  constructor() {
    this.repository = postRepository
  }

  async create(post: PostEntity) {
    return this.repository.create(post)
  }

  async getById(id: string) {
    return this.repository.getById(id)
  }

  async getBySlug(slug: string) {
    return this.repository.getBySlug(slug)
  }

  async update(post: PostEntity) {
    return this.repository.update(post)
  }

  async paginate(args: Parameters<PostRepository['paginate']>[0]) {
    return this.repository.paginate(args)
  }
}

export default new PostService()
