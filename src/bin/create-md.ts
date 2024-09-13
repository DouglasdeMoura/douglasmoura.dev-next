import posts from '../database/posts.json'
import fs from 'fs'

type Post = {
  collectionId: string
  collectionName: string
  content: string
  created: string
  expand: {
    featuredImage: {
      collectionId: string
      collectionName: string
      created: string
      file: string
      id: string
      mediaType: string
      title: string
      updated: string
    }
    tags: Array<{
      collectionId: string
      collectionName: string
      created: string
      id: string
      name: string
      updated: string
    }>
  }
  featuredImage: string
  id: string
  locale: string
  slug: string
  tags: Array<string>
  title: string
  translates: string
  type: string
  updated: string
  userId: string
}

type Res = {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Post[]
}

const createMarkdown = (post: Post) => {
  const { id, locale, title, content, created, updated, expand: { featuredImage, tags } } = post
  const tagString = tags.map(({ name }) => name).join(', ')
  const markdown = `---
id: ${id}
locale: ${locale}
title: ${title}
created: ${created}
updated: ${updated}
tags: ${tagString}
translates: ${post.translates}
---
${content}
`
  return markdown
}

const main = async () => {
  const response: Res = posts
  response.items.forEach((post) => {
    const markdown= createMarkdown(post)
    const date = new Date(post.created).toISOString().split('T')[0]
    fs.writeFileSync(`./src/posts/${date}_${post.id}_${post.slug}.md`, markdown)
  })
}

main()
