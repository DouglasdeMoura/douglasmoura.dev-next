export class TalkRepository {
  async getAll() {
    return import('../content/talks.json').then((res) => res.default)
  }
}
