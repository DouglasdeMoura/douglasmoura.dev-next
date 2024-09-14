import type { PostEntity } from '../entities/post.js'
import postRepository, { type PostRepository } from '../repository/post.js'

class PostService {
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

  async paginate(page: number, limit: number) {
    return this.repository.paginate(page, limit)
  }
}

export default new PostService()
