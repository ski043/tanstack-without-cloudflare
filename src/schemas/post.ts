import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().min(1),
})
