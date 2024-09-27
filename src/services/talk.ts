import { TalkRepository } from '../repository/talk.js'

export class TalkService {
  repository: TalkRepository

  constructor() {
    this.repository = new TalkRepository()
  }

  async getAll() {
    const talks = await this.repository.getAll().then((talks) =>
      talks.map((talk) => ({
        ...talk,
        date: new Date(talk.date),
      })),
    )

    const data: Record<number, typeof talks[0][]> = {}

    for (const talk of talks) {
      const year = talk.date.getFullYear()

      if (!data[year]) {
        data[year] = []
      }

      data[year].push(talk)
    }

    return data
  }
}

export default new TalkService()
