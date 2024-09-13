import { describe, expect, it, vi } from 'vitest'
import fs from 'node:fs/promises'

import PostRepository from '../../src/repository/post.js'
import { PostEntity } from '../../src/entities/post.js'

import * as services from '../../src/services/generate-post-id.js'

const writeFile = vi.fn()
vi.spyOn(fs, 'writeFile').mockImplementation(writeFile)
vi.spyOn(services, 'generatePostId').mockReturnValue('mocked_value')


const post = new PostEntity({
  id: '7ba8zyw9of4afcw',
  title: 'Olá mundo',
  locale: 'pt-BR',
  created: new Date('2021-01-01 15:00:00.000Z'),
  content: 'Hello, World!',
  tags: ['offtopic'],
})

describe('Post Repository', () => {
  it('should create a new post', async () => {
    const id = await PostRepository.create(post)

    expect(writeFile).toHaveBeenCalledWith('./src/posts/mocked_value.md', post.toString())
    expect(id).toBe('mocked_value')
  })

  it('should pick a post by id', async () => {
    const id = '7ba8zyw9of4afcw'
    const post = await PostRepository.getById(id) as PostEntity

    expect(post).toBeInstanceOf(PostEntity)
    expect(post.id).toBe(id)
    expect(post.title).toBe('Olá mundo')
    expect(post.locale).toBe('pt-BR')
    expect(post.created.toISOString()).toBe('2021-01-01T15:00:00.000Z')
    expect(post.content.length).toBeGreaterThan(0)
    expect(post.tags).toEqual(['offtopic'])
  })

  it('should update a post', async () => {
    const id = await PostRepository.update(post)

    expect(writeFile).toHaveBeenCalledWith('./src/posts/mocked_value.md', post.toString())
    expect(id).toBe('mocked_value')
  })
})
