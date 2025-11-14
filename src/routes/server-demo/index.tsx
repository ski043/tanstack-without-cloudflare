import { createFileRoute } from '@tanstack/react-router'
import { useState, useTransition } from 'react'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const demoSearchSchema = z.object({
  topic: z.string().optional(),
})

export const Route = createFileRoute('/server-demo/')({
  validateSearch: zodValidator(demoSearchSchema),
  server: {
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: {
          handler: async () => {
            return Response.json({
              message: 'Hello from the Server Route!',
              timestamp: new Date().toISOString(),
            })
          },
        },
        POST: {
          handler: async ({ request }) => {
            const body = await request.json().catch(() => ({}))
            const topic =
              typeof body?.topic === 'string' ? body.topic : 'something'

            await new Promise((resolve) => setTimeout(resolve, 600))

            return Response.json({
              acknowledged: true,
              topic,
              receivedAt: new Date().toISOString(),
            })
          },
        },
      }),
  },
  component: ServerRouteDemo,
})

function ServerRouteDemo() {
  const [getResult, setGetResult] = useState<string>('')
  const [getError, setGetError] = useState<string | null>(null)
  const [postTopic, setPostTopic] = useState('Middleware best practices')
  const [postResult, setPostResult] = useState<string>('')
  const [postError, setPostError] = useState<string | null>(null)
  const [isPosting, startPostTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  async function callStatusEndpoint() {
    setIsFetching(true)
    setGetError(null)
    try {
      const res = await fetch('/server-demo')
      if (!res.ok) {
        throw new Error(`Request failed with ${res.status}`)
      }
      const data = await res.json()
      setGetResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setGetError(err instanceof Error ? err.message : 'Unknown error')
      setGetResult('')
    } finally {
      setIsFetching(false)
    }
  }

  function sendAnnouncement(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPostError(null)
    startPostTransition(async () => {
      try {
        const res = await fetch('/server-demo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic: postTopic }),
        })
        if (!res.ok) {
          throw new Error(`Request failed with ${res.status}`)
        }
        const data = await res.json()
        setPostResult(JSON.stringify(data, null, 2))
      } catch (err) {
        setPostError(err instanceof Error ? err.message : 'Unknown error')
        setPostResult('')
      }
    })
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-linear-to-br from-background via-background to-muted/30">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-120 w-120 rounded-full bg-amber-400/25 blur-[150px]" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16">
        <header className="space-y-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Server routes
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            API-style handlers inside your routes directory
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            TanStack Start lets you colocate UI and API endpoints. The GET
            handler below returns status info while the POST handler echoes
            announcements after passing through server-side logic.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-primary/40 bg-card/90 shadow-xl shadow-primary/10">
            <CardHeader>
              <CardTitle>GET /server-demo</CardTitle>
              <CardDescription>
                Fetch live server data with a single click. This hits the GET
                handler defined in the same file.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={callStatusEndpoint} disabled={isFetching}>
                {isFetching ? 'Requesting…' : 'Call GET endpoint'}
              </Button>
              {getError && (
                <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {getError}
                </p>
              )}
              {getResult && (
                <pre className="rounded-2xl border border-primary/30 bg-primary/5 px-3 py-3 text-xs leading-relaxed">
                  {getResult}
                </pre>
              )}
            </CardContent>
          </Card>

          <Card className="border-emerald-300/50 bg-card/90 shadow-xl shadow-emerald-500/10">
            <CardHeader>
              <CardTitle>POST /server-demo</CardTitle>
              <CardDescription>
                Compose an announcement and let the server route acknowledge it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={sendAnnouncement}>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Topic
                  </label>
                  <Input
                    value={postTopic}
                    onChange={(event) => setPostTopic(event.target.value)}
                    className="mt-2 text-base"
                    placeholder="Something cool you just shipped"
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" disabled={isPosting}>
                    {isPosting ? 'Sending…' : 'Send POST request'}
                  </Button>
                </div>
              </form>

              {postError && (
                <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {postError}
                </p>
              )}

              {postResult && (
                <pre className="mt-4 rounded-2xl border border-emerald-300/50 bg-emerald-400/10 px-3 py-3 text-xs leading-relaxed">
                  {postResult}
                </pre>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
