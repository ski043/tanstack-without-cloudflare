import { Link, createFileRoute } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import { getPost } from '@/data/post/get-post'

const fallbackPostImage =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const estimateReadingTime = (text: string) =>
  Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))

export const Route = createFileRoute('/posts/$postId/')({
  loader: async ({ params }) =>
    getPost({
      data: {
        id: params.postId,
      },
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const post = Route.useLoaderData()
  const readingTime = estimateReadingTime(post.content)
  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
      <Link
        to="/posts"
        className={buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: 'w-fit',
        })}
      >
        ← Back to posts
      </Link>

      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-background/60 shadow-xl">
        <div className="relative h-80 w-full overflow-hidden">
          <img
            alt={post.title}
            src={post.imageUrl || fallbackPostImage}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30" />
        </div>

        <div className="relative mx-auto -mt-16 max-w-3xl px-6 pb-10">
          <div className="rounded-2xl border border-border/70 bg-background/90 px-6 py-8 shadow-[0_20px_45px_-35px_rgba(0,0,0,0.8)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Feature
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>{formatDate(post.createdAt)}</span>
              <span className="h-4 w-px bg-border" aria-hidden />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto w-full max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? 'text-foreground/95 text-xl font-medium'
                  : undefined
              }
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-foreground/95">{post.content}</p>
        )}
      </article>
    </div>
  )
}
