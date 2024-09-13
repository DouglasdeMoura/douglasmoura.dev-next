import { describe, it, assert } from 'vitest'
import { PostEntity } from '../../src/entities/post.js'

const POST_PATH = './src/posts/2021-01-01_7ba8zyw9of4afcw_ola-mundo.md'

describe('Post Entity', () => {
  it('should create a new Post Entity', async () => {
    const post = new PostEntity({
      id: '7ba8zyw9of4afcw',
      title: 'Olá mundo',
      locale: 'pt-BR',
      created: new Date('2021-01-01 15:00:00.000Z'),
      content: 'Hello, World!',
      tags: ['offtopic'],
    })



    assert.deepEqual(post, {
      id: '7ba8zyw9of4afcw',
      title: 'Olá mundo',
      locale: 'pt-BR',
      created: new Date('2021-01-01 15:00:00.000Z'),
      updated: new Date('2021-01-01 15:00:00.000Z'),
      content: 'Hello, World!',
      tags: [
        'offtopic'
      ],
      translates: undefined
    })
  })
})