import { createServerFn } from '@tanstack/react-start'

import { demoFunctionMiddleware } from '@/middleware/demo'

export const sendProtectedMessage = createServerFn({ method: 'POST' })
  .middleware([demoFunctionMiddleware])
  .handler(async ({ data }) => {
    return {
      echoedMessage: data.message,
      receivedAt: new Date().toISOString(),
    }
  })
