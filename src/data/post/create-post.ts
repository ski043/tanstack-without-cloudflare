import { createServerFn } from '@tanstack/react-start'
import { createPostSchema } from '@/schemas/post'
import prisma from '@/lib/db'

export const createPost = createServerFn({
  method: 'POST',
})
  .inputValidator(createPostSchema)
  .handler(async ({ data }) => {
    const result = createPostSchema.safeParse(data)

    if (!result.success) {
      throw new Error('Invalid input')
    }

    const post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        imageUrl: result.data.imageUrl,
      },
    })

    return post
  })
