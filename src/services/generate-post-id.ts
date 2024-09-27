import slugify from '@sindresorhus/slugify'
import { nanoid } from 'nanoid'

type GeneratePostIdArgs = {
  title: string
  id?: string
  created?: Date
}

export function generatePostId(args: GeneratePostIdArgs) {
  const id = args.id ?? nanoid()
  const date = (args.created ?? new Date()).toISOString().split('T')[0]
  return `${date}_${id}_${slugify(args.title)}`
}
