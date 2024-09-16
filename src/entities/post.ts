import slugify from '@sindresorhus/slugify'
import type { Locale } from '../constants/index.js'

type ID = string

export class PostEntity {
  id: ID
  title: string
  slug: string
  locale: Locale
  created: Date
  updated: Date
  content: string
  tags: string[]
  translates?: ID

  constructor(
    data: Omit<PostEntity, 'created' | 'updated' | 'slug'> & {
      created?: Date
      updated?: Date
    },
  ) {
    this.id = data.id
    this.title = data.title
    this.slug = slugify(data.title.toLowerCase())
    this.locale = data.locale
    this.created = data?.created ?? new Date()
    this.updated = data?.updated ?? data?.created ?? new Date()
    this.content = data.content
    this.tags = data.tags
    this.translates = data?.translates
  }

  toString() {
    return `---
id: ${this.title}
locale: ${this.locale}
title: ${this.title}
created: ${this.created.toISOString()}
updated: ${this.updated.toISOString()}
tags: ${this.tags.join(', ')}
translates: ${this.translates}
---
${this.content}`
  }
}
