import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/server-demo/')({
  component: RouteComponent,
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
})

function RouteComponent() {
  // GET Request State
  const [getResult, setGetResult] = useState<string>('')
  const [getError, setGetError] = useState<string | null>(null)
  const [isGetFetching, setIsGetFetching] = useState(false)

  // POST Request State
  const [postInput, setPostInput] = useState('')
  const [postResult, setPostResult] = useState<string>('')
  const [postError, setPostError] = useState<string | null>(null)
  const [isPostFetching, setIsPostFetching] = useState(false)

  async function handleGet() {
    setIsGetFetching(true)
    setGetError(null)
    try {
      const res = await fetch('/server-demo')
      if (!res.ok) throw new Error(`Request failed with ${res.status}`)
      const data = await res.json()
      setGetResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setGetError(err instanceof Error ? err.message : 'Unknown error')
      setGetResult('')
    } finally {
      setIsGetFetching(false)
    }
  }

  async function handlePost() {
    setIsPostFetching(true)
    setPostError(null)
    try {
      const res = await fetch('/server-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: postInput }),
      })
      if (!res.ok) throw new Error(`Request failed with ${res.status}`)
      const data = await res.json()
      setPostResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setPostError(err instanceof Error ? err.message : 'Unknown error')
      setPostResult('')
    } finally {
      setIsPostFetching(false)
    }
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-linear-to-br from-background via-background to-muted/30">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-amber-400/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-120 w-120 rounded-full bg-orange-400/20 blur-[150px]" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16">
        <header className="space-y-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-600 dark:text-amber-400">
            API Playground
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Server Functions Demo
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground sm:max-w-2xl">
            Experience seamless client-server communication. These cards demonstrate how TanStack Start handles API-style requests directly within your route handlers.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* GET Request Card */}
          <Card className="flex flex-col border-amber-400/30 bg-card/80 shadow-xl shadow-amber-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">GET</span>
                <span>Fetch Data</span>
              </CardTitle>
              <CardDescription>
                Retrieve data from the server with a simple function call.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl border bg-muted/50 p-4 min-h-[140px] font-mono text-sm">
                  {isGetFetching ? (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span className="ml-2">Fetching...</span>
                    </div>
                  ) : getError ? (
                    <div className="text-destructive p-2 bg-destructive/10 rounded-md border border-destructive/20">
                      Error: {getError}
                    </div>
                  ) : getResult ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <pre className="text-xs leading-relaxed">{getResult}</pre>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground/50 italic">
                      Waiting for request...
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGet}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                disabled={isGetFetching}
              >
                Fetch Server Data
              </Button>
            </CardFooter>
          </Card>

          {/* POST Request Card */}
          <Card className="flex flex-col border-orange-400/30 bg-card/80 shadow-xl shadow-orange-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="rounded-md bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">POST</span>
                <span>Submit Data</span>
              </CardTitle>
              <CardDescription>
                Send a payload to the server and receive a processed response.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Message Payload</Label>
                  <Input
                    id="message"
                    placeholder="Enter a message to send..."
                    value={postInput}
                    onChange={(e) => setPostInput(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl border bg-muted/50 p-4 min-h-[140px] font-mono text-sm">
                  {isPostFetching ? (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span className="ml-2">Processing...</span>
                    </div>
                  ) : postError ? (
                    <div className="text-destructive p-2 bg-destructive/10 rounded-md border border-destructive/20">
                      Error: {postError}
                    </div>
                  ) : postResult ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="mb-2 text-xs font-semibold text-orange-600 dark:text-orange-400">Server Response:</div>
                      <pre className="text-xs leading-relaxed">{postResult}</pre>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground/50 italic">
                      Response will appear here...
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handlePost}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                disabled={isPostFetching || !postInput.trim()}
              >
                Send Payload
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
