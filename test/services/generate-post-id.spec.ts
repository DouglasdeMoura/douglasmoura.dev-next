import { expect, it, describe } from 'vitest'

import { generatePostId } from '../../src/services/generate-post-id.js'

describe('Generate Post ID', () => {
  it('should generate a random id', () => {
    expect(generatePostId({ created: new Date(), title: 'Hello, World!' }))
      .toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2}_[a-zA-Z0-9\-_]{21}_hello-world$/)
  })
})