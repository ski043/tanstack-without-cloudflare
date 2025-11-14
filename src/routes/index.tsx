import { Link, createFileRoute } from '@tanstack/react-router'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const routes = [
  {
    title: 'Posts Feed',
    description:
      'Server-rendered posts list powered by Prisma + server functions.',
    to: '/posts',
    accent: 'from-primary/20 via-primary/5 to-background border-primary/40',
  },
  {
    title: 'Create Post',
    description: 'React Hook Form + Zod validation with server mutations.',
    to: '/posts/create',
    accent:
      'from-emerald-300/20 via-emerald-200/10 to-background border-emerald-300/40',
  },
  {
    title: 'Nested Layers',
    description: 'Visual demo of layout routes and nested rendering.',
    to: '/layers',
    accent: 'from-blue-400/20 via-blue-400/5 to-background border-blue-400/40',
  },
  {
    title: 'Middleware Demo',
    description: 'Request + server function middleware with tokenized access.',
    to: '/middleware-demo',
    accent:
      'from-purple-400/20 via-purple-300/10 to-background border-purple-400/40',
  },
]

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="relative isolate min-h-[100dvh] overflow-hidden bg-gradient-to-b from-background via-background to-muted/40">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-10 left-0 h-[28rem] w-[28rem] rounded-full bg-pink-400/25 blur-[150px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16">
        <header className="flex flex-col gap-6 rounded-[32px] border border-border/60 bg-card/80 px-8 py-10 shadow-2xl shadow-black/5 backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              TanStack Start Demo
            </p>
            <ThemeToggle />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Explore the starter playground
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground sm:max-w-3xl">
              A curated set of routes showcasing data fetching, server
              functions, nested layouts, and rich UI built with Shadcn +
              Tailwind on top of TanStack Start.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="shadow-lg shadow-primary/30">
              <Link to="/posts">Jump to posts</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/posts/create">Create a post</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {routes.map((route) => (
            <Card
              key={route.to}
              className={`group flex flex-col justify-between rounded-[28px] border bg-gradient-to-br p-6 shadow-lg shadow-black/5 backdrop-blur ${route.accent}`}
            >
              <CardHeader className="space-y-3 p-0">
                <CardTitle className="text-2xl font-semibold text-foreground">
                  {route.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {route.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <Link
                  to={route.to}
                  className={buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'px-0 text-base font-semibold text-primary',
                  })}
                >
                  Visit →
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}
