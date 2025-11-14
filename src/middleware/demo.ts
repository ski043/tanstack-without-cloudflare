import { createMiddleware } from '@tanstack/react-start'
import { z } from 'zod'

export type DemoAuthContext = {
  demoAuth: {
    tokenProvided: boolean
    isAuthorized: boolean
  }
}

const REQUIRED_TOKEN = 'letmein'

const protectedMessageSchema = z.object({
  token: z.string().catch(''),
  message: z.string().trim().min(1, 'Message is required'),
})

export const demoFunctionMiddleware = createMiddleware({
  type: 'function',
})
  .inputValidator((data: Record<string, unknown>) =>
    protectedMessageSchema.parse(data),
  )
  .server(async ({ next, data }) => {
    if (data.token !== REQUIRED_TOKEN) {
      throw new Error('Server middleware blocked your request (invalid token).')
    }

    return next({
      context: {
        demoAuth: {
          tokenProvided: true,
          isAuthorized: true,
        },
      } satisfies DemoAuthContext,
    })
  })

export const demoMiddlewareToken = REQUIRED_TOKEN
