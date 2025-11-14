import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import prisma from '@/lib/db'

const getPostInputSchema = z.object({
  id: z.string().uuid(),
})

export const getPost = createServerFn({
  method: 'GET',
})
  .inputValidator(getPostInputSchema)
  .handler(async ({ data }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: data.id,
      },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    return post
  })
