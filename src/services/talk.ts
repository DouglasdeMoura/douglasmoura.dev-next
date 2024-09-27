import { TalkRepository } from '../repository/talk.js'

export class TalkService {
  repository: TalkRepository

  constructor() {
    this.repository = new TalkRepository()
  }

  async getAll() {
    const talks = await this.repository.getAll()
    return talks.map((talk) => ({
      ...talk,
      date: new Date(talk.date),
    }))
  }
}

export default new TalkService()
