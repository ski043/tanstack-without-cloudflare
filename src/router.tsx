import { createRouter } from '@tanstack/react-router'
import type { DemoAuthContext } from '@/middleware/demo'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      demoAuth: {
        tokenProvided: false,
        isAuthorized: false,
      },
    } satisfies DemoAuthContext,
  })

  return router
}
