import { Link, createFileRoute } from '@tanstack/react-router'
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
import { Textarea } from '@/components/ui/textarea'
import { sendProtectedMessage } from '@/data/demo/send-protected-message'
import { demoMiddlewareToken } from '@/middleware/demo'

const demoSearchSchema = z.object({
  token: z.string().default(''),
})

export const Route = createFileRoute('/middleware-demo/')({
  validateSearch: zodValidator(demoSearchSchema),
  component: MiddlewareDemoRoute,
})

function MiddlewareDemoRoute() {
  const search = Route.useSearch()
  const [message, setMessage] = useState('Hello from middleware land 👋')
  const [result, setResult] = useState<{
    echoedMessage: string
    receivedAt: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    startTransition(async () => {
      try {
        const response = await sendProtectedMessage({
          data: {
            token: search.token,
            message,
          },
        })
        setResult(response)
      } catch (err) {
        setResult(null)
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      }
    })
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-linear-to-br from-background via-background to-muted/30">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-120 w-120 rounded-full bg-emerald-400/25 blur-[150px]" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16">
        <header className="space-y-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Middleware playground
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Server function middleware in action
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Toggle the token and submit a message to see how the function
            middleware validates input before the server echoes it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
            >
              <Link
                to="/middleware-demo"
                search={{ token: demoMiddlewareToken }}
              >
                Use valid token (?token={demoMiddlewareToken})
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/middleware-demo" search={{ token: '' }}>
                Clear token (?token=)
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <Card className="border-primary/40 bg-card/90 shadow-xl shadow-primary/10">
            <CardHeader>
              <CardTitle>Token state</CardTitle>
              <CardDescription>
                The token lives in the URL, so you can share demo links with a
                valid or invalid state instantly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 px-4 py-4">
                <p className="text-muted-foreground">Current token</p>
                <code className="mt-2 block rounded-lg bg-background/80 px-3 py-2 text-base font-semibold">
                  {search.token || '(none)'}
                </code>
              </div>
              <p className="text-muted-foreground">
                When you hit submit, this exact token is forwarded to the server
                function middleware.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-300/50 bg-card/90 shadow-xl shadow-emerald-500/10">
            <CardHeader>
              <CardTitle>Call the protected function</CardTitle>
              <CardDescription>
                The middleware validates both the payload and the token before
                it lets the server respond.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="mt-2 min-h-[120px] text-base"
                    placeholder="Tell the middleware something nice..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Token
                  </label>
                  <Input
                    readOnly
                    value={search.token || '(none)'}
                    className="mt-2 font-mono text-sm"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Update the token via the buttons above or by editing the
                    URL.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? 'Sending…' : 'Send protected message'}
                  </Button>
                </div>
              </form>

              {error && (
                <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              {result && (
                <div className="mt-4 rounded-lg border border-emerald-300/50 bg-emerald-400/10 px-3 py-3 text-sm">
                  <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                    Server reply
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Echoed:{' '}
                    <span className="font-medium text-foreground">
                      {result.echoedMessage}
                    </span>
                  </p>
                  <p className="text-muted-foreground">
                    Received at:{' '}
                    <code>
                      {new Date(result.receivedAt).toLocaleTimeString()}
                    </code>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
