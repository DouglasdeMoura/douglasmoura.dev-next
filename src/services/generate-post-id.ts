import { nanoid } from 'nanoid'
import slugify from '@sindresorhus/slugify'

type GeneratePostIdArgs = {
  title: string
  id?: string
  created: Date
}

export function generatePostId(args: GeneratePostIdArgs) {
  const id = args.id ?? nanoid()
  const date = args.created.toISOString().split('T')[0]
  return `${date}_${id}_${slugify(args.title)}`
}
