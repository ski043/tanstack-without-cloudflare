import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/demo')({
  server: {
    handlers: {
      GET: async () => {
        return json({ message: 'Hello from the GET API!' })
      },
      POST: async ({ request }) => {
        const body = await request.json()
        return json({ message: `Hello, ${body.name || 'Stranger'}! This is a POST response.` })
      },
    },
  },
})
