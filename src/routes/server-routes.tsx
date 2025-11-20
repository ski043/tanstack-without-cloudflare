import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/server-routes')({
  component: ServerRoutesComponent,
})

function ServerRoutesComponent() {
  const [getResponse, setGetResponse] = useState<string>('')
  const [postName, setPostName] = useState<string>('')
  const [postResponse, setPostResponse] = useState<string>('')

  const handleGet = async () => {
    try {
      const res = await fetch('/api/demo')
      const data = await res.json()
      setGetResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setGetResponse('Error fetching data')
    }
  }

  const handlePost = async () => {
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: postName }),
      })
      const data = await res.json()
      setPostResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setPostResponse('Error sending data')
    }
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-linear-to-b from-background via-background to-muted/40">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-amber-400/30 blur-[120px]" />
        <div className="absolute bottom-10 left-0 h-112 w-md rounded-full bg-blue-400/25 blur-[150px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16">
        {/* Header Section */}
        <header className="flex flex-col gap-6 rounded-[32px] border border-border/60 bg-card/80 px-8 py-10 shadow-2xl shadow-black/5 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="-ml-2">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
                API Playground
              </p>
            </div>
            <ThemeToggle />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Server Routes Demo
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground sm:max-w-3xl">
              Interact with your API endpoints directly from the client. Test GET and POST requests with real-time feedback and JSON response visualization.
            </p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* GET Request Card */}
          <Card className="group flex flex-col rounded-[28px] border bg-linear-to-br from-amber-400/20 via-amber-300/10 to-background border-amber-400/40 p-6 shadow-lg shadow-black/5 backdrop-blur">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-2xl font-semibold text-foreground">GET Request</CardTitle>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                Fetch data from a server route using a simple GET request.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 p-0">
              <Button onClick={handleGet} className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20">
                Send GET Request
              </Button>
              {getResponse && (
                <div className="rounded-xl border border-amber-200/50 bg-background/50 p-4 backdrop-blur-sm">
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap break-words">
                    {getResponse}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* POST Request Card */}
          <Card className="group flex flex-col rounded-[28px] border bg-linear-to-br from-blue-400/20 via-blue-400/5 to-background border-blue-400/40 p-6 shadow-lg shadow-black/5 backdrop-blur">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-2xl font-semibold text-foreground">POST Request</CardTitle>
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                Send data to a server route using a POST request with a JSON body.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 p-0">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={postName}
                  onChange={(e) => setPostName(e.target.value)}
                  className="bg-background/50 border-blue-200/50 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>
              <Button onClick={handlePost} className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                Send POST Request
              </Button>
              {postResponse && (
                <div className="rounded-xl border border-blue-200/50 bg-background/50 p-4 backdrop-blur-sm">
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap break-words">
                    {postResponse}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
