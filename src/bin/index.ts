import fs from 'node:fs/promises'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import sup from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import katex from 'markdown-it-katex'
import alerts from 'markdown-it-github-alerts'
import Shiki from '@shikijs/markdown-it'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers'
import { Feed } from 'feed'

import { PostEntity } from '../entities/post.js'
import { type Locale, POSTS_PATH } from '../constants/index.js'

async function fileList() {
  return (await fs.readdir(POSTS_PATH)).map((file) => `${POSTS_PATH}/${file}`)
}

const md = MarkdownIt({ html: true, linkify: true, typographer: true })

md.use(sup)
md.use(footnote)
md.use(katex)
md.use(alerts)

md.use(
  await Shiki({
    themes: {
      light: 'dracula',
      dark: 'dracula',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationFocus(),
      transformerNotationErrorLevel(),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
    ],
  }),
)

const defaultRender = md.renderer.rules.html_block
md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
  if (tokens[idx].content.startsWith('<SVG64')) {
    const content = tokens[idx].content
      .replace('<SVG64 content="', '')
      .replace('" />', '')
    const buffer = Buffer.from(content, 'base64')
    tokens[idx].content =
      `<div class="flex align-center justify-center">${buffer.toString('ascii')}</div>`

    return defaultRender?.(tokens, idx, options, env, self) || ''
  }

  if (tokens[idx].content.startsWith('<CodePen')) {
    const content = tokens[idx].content
      .replace(
        '<CodePen id="',
        `<iframe loading="lazy" allowtransparency allowfullscreen height="380px" width="100%" title="Styled Dialog" src="https://codepen.io/douglasdemoura/embed/`,
      )
      .replace('" />', '')

    tokens[idx].content =
      `${content}?default-tab=result&embed-version=2"></iframe>`

    return defaultRender?.(tokens, idx, options, env, self) || ''
  }

  return defaultRender?.(tokens, idx, options, env, self) || ''
}

async function feed(posts: PostEntity[], locale: Locale) {
  const config = {
    'en-US': {
      language: 'en',
      copyright: 'CC BY-NC 4.0 for blog posts and MIT for code',
      feedLinks: {
        rss: 'https://douglasmoura.dev/en-US/rss.xml',
        json: 'https://douglasmoura.dev/en-US/feed.json',
        atom: 'https://douglasmoura.dev/en-US/atom.xml',
      },
      description: 'Software Engineer',
      id: 'https://douglasmoura.dev/en-US',
      link: 'https://douglasmoura.dev/en-US',
    },
    'pt-BR': {
      language: 'pt',
      copyright: 'CC BY-NC 4.0 para os artigos e MIT para o código',
      feedLinks: {
        rss: 'https://douglasmoura.dev/rss.xml',
        json: 'https://douglasmoura.dev/feed.json',
        atom: 'https://douglasmoura.dev/atom.xml',
      },
      description: 'Engenheiro de software',
      id: 'https://douglasmoura.dev/',
      link: 'https://douglasmoura.dev/',
    },
  }

  const feedInfo = locale === 'en-US' ? config['en-US'] : config['pt-BR']

  const author = {
    name: 'Douglas Moura',
    email: 'hello@douglasmoura.dev',
    link: 'https://douglasmoura.dev',
  }

  const feed = new Feed({
    title: 'Douglas de Moura',
    author,
    ...feedInfo,
  })

  for (const post of posts) {
    const url = `https://douglasmoura.dev/en-US/${post.slug}`

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post?.description,
      content: post.content,
      date: post.created,
      author: [author],
    })
  }

  return feed
}

async function indexPosts() {
  const list = (await fileList()).reverse()
  const index: {
    tags?: Record<string, PostEntity[]>
    postsById?: Record<string, PostEntity>
    postsBySlug?: Record<string, PostEntity>
    feed?: Record<string, Feed>
  } & Record<string, PostEntity[]> = {}

  for (const file of list) {
    const { data, content } = matter.read(file)

    if (!index[data.locale]) {
      index[data.locale] = []
    }

    const post = new PostEntity({
      id: data.id,
      title: data.title,
      locale: data.locale,
      created: new Date(data.created),
      updated: new Date(data.updated),
      content: await md.render(content),
      tags: data.tags.split(', '),
      translates: data.translates,
    })

    for (const tag of post.tags) {
      if (!index.tags) {
        index.tags = {}
      }

      if (!index.tags[tag]) {
        index.tags[tag] = []
      }

      index.tags[tag].push(post)
    }

    if (!index?.postsById) {
      index.postsById = {}
    }

    if (!index?.postsBySlug) {
      index.postsBySlug = {}
    }

    index[data.locale].push(post)
    index.postsById[data.id] = post
    index.postsBySlug[post.slug] = post
  }

  index['pt-BR'] = index['pt-BR'].sort(
    (a, b) => b.created.getTime() - a.created.getTime(),
  )

  index['en-US'] = index['en-US'].sort(
    (a, b) => b.created.getTime() - a.created.getTime(),
  )

  for (const tag in index.tags) {
    index.tags[tag] = index.tags[tag].sort(
      (a, b) => b.created.getTime() - a.created.getTime(),
    )
  }

  index.feed = {
    'en-US': await feed(index['en-US'], 'en-US'),
    'pt-BR': await feed(index['pt-BR'], 'pt-BR'),
  }

  return index
}

async function main() {
  const data = await indexPosts()

  fs.writeFile(
    './src/generated/posts/postsById.json',
    JSON.stringify(data.postsById, null, 2),
  )

  fs.writeFile(
    './src/generated/posts/postsBySlug.json',
    JSON.stringify(data.postsBySlug, null, 2),
  )

  fs.writeFile(
    './src/generated/posts/tags.json',
    JSON.stringify(data.tags, null, 2),
  )

  fs.writeFile(
    './src/generated/posts/en-US.json',
    JSON.stringify(data['en-US'], null, 2),
  )

  fs.writeFile(
    './src/generated/posts/pt-BR.json',
    JSON.stringify(data['pt-BR'], null, 2),
  )

  fs.writeFile(
    './src/generated/feed/en-US.json',
    data.feed?.['en-US'].json1() as string,
  )

  fs.writeFile(
    './src/generated/feed/pt-BR.json',
    data.feed?.['pt-BR'].json1() as string,
  )

  fs.writeFile(
    './src/generated/feed/rss_en-US.xml',
    data.feed?.['en-US'].rss2() as string,
  )

  fs.writeFile(
    './src/generated/feed/rss_pt-BR.xml',
    data.feed?.['pt-BR'].rss2() as string,
  )

  fs.writeFile(
    './src/generated/feed/atom_en-US.xml',
    data.feed?.['en-US'].atom1() as string,
  )

  fs.writeFile(
    './src/generated/feed/atom_pt-BR.xml',
    data.feed?.['pt-BR'].atom1() as string,
  )
}

main()

/**/
