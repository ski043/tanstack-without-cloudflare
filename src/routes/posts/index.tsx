import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getPosts } from '@/data/post/get-posts'

const fallbackPostImage =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'

type Post = Awaited<ReturnType<typeof getPosts>>[number]

const formatDate = (value: Post['createdAt']) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const truncateContent = (content: string, length = 140) =>
  content.length > length ? `${content.slice(0, length).trim()}…` : content

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  loader: () => getPosts(),
})

function RouteComponent() {
  const posts = Route.useLoaderData()

  return (
    <div className="relative isolate min-h-[100dvh] overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[32rem] w-[32rem] rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12">
        <header className="rounded-[32px] border border-border/60 bg-card/80 px-8 py-10 shadow-2xl shadow-black/5 backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Community Stories
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Your builder feed
                </h1>
                <p className="text-lg text-muted-foreground">
                  Ship notes, changelog snacks, and behind-the-scenes progress.
                  Inspire the rest of the crew with what you&apos;re iterating
                  on.
                </p>
              </div>

              <dl className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div>
                  <dt className="text-xs uppercase tracking-widest">
                    Published
                  </dt>
                  <dd className="text-2xl font-semibold text-foreground">
                    {posts.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest">
                    This week
                  </dt>
                  <dd className="text-2xl font-semibold text-foreground">
                    {Math.min(posts.length, 6)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest">
                    Draft ideas
                  </dt>
                  <dd className="text-2xl font-semibold text-foreground">∞</dd>
                </div>
              </dl>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link to="/">Browse home</Link>
              </Button>
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link to="/posts/create">Share an update</Link>
              </Button>
            </div>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-muted-foreground/40 bg-card/70 px-8 py-16 text-center shadow-inner shadow-black/5 backdrop-blur">
            <p className="text-2xl font-semibold">No posts yet</p>
            <p className="mt-3 text-muted-foreground">
              Be the first to publish something meaningful.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg">
                <Link to="/posts/create">Create your first post</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border-border/70 bg-card/90 pt-0 shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 w-full overflow-hidden bg-muted">
                  <img
                    alt={post.title}
                    src={post.imageUrl || fallbackPostImage}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur">
                    {formatDate(post.createdAt)}
                  </div>
                </div>
                <CardHeader className="space-y-2 pb-2 pt-6">
                  <CardTitle className="text-2xl leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-5 pb-6 pt-0">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {truncateContent(post.content, 180)}
                  </CardDescription>
                  <div className="mt-auto flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {truncateContent(post.content, 80).split(' ').length}{' '}
                      words
                    </span>
                    <Link
                      to="/posts/$postId"
                      params={{ postId: post.id }}
                      className={buttonVariants({
                        variant: 'link',
                        size: 'sm',
                        className: 'px-0 font-semibold text-primary',
                      })}
                    >
                      Dive in →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
