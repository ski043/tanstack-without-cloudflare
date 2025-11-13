import { createServerFn } from '@tanstack/react-start'
import prisma from '@/lib/db'

export const getPosts = createServerFn({
  method: 'GET',
}).handler(async () => {
  const posts = await prisma.post.findMany()
  return posts
})
