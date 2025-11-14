import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'

import type { z } from 'zod'
import { createPostSchema } from '@/schemas/post'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createPost } from '@/data/post/create-post'

export const Route = createFileRoute('/posts/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const form = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      imageUrl: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createPostSchema>) {
    startTransition(async () => {
      await createPost({ data: values })

      router.navigate({ to: '/posts' })
    })
  }
  return (
    <div className="relative isolate min-h-[100dvh] overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-8 text-left">
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

          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Publish update
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Craft your next highlight
            </h1>
            <p className="text-lg text-muted-foreground">
              Keep the community in the loop with a concise post. Share what
              you&apos;re building, the story behind it, and the visuals to
              bring it to life.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Lead with clarity',
                body: 'Give your post a strong headline so people instantly know what changed.',
              },
              {
                title: 'Add the story',
                body: 'Explain the why. Include context, lessons, or takeaways others can learn from.',
              },
              {
                title: 'Show, don’t tell',
                body: 'Link to a screenshot, Loom, or mock so readers can visualize the update.',
              },
              {
                title: 'Keep it shippable',
                body: 'Aim for 2–4 paragraphs. Enough detail to be useful without overwhelming.',
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur"
              >
                <p className="text-sm font-semibold text-foreground">
                  {tip.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="rounded-[32px] border border-border/60 bg-card/80 p-1 shadow-2xl backdrop-blur">
            <div className="rounded-[28px] border border-border/50 bg-card px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Step 1 of 1</p>
                  <h2 className="text-2xl font-semibold">Share the update</h2>
                </div>
                <span className="rounded-full border border-border/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Draft
                </span>
              </div>

              <form
                id="form-create-post"
                className="mt-8 space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FieldGroup className="space-y-6">
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-post-title">
                          Title
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-post-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="New onboarding flow shipped 🌱"
                          autoComplete="off"
                          className="h-12 text-base"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-post-content">
                          Content
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="form-create-post-content"
                          aria-invalid={fieldState.invalid}
                          placeholder="Explain what’s new, why it matters, and any next steps…"
                          className="min-h-[180px] resize-none text-base leading-relaxed"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="imageUrl"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-create-post-image-url">
                          Image URL
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-create-post-image-url"
                          aria-invalid={fieldState.invalid}
                          placeholder="https://yourdomain.com/preview.png"
                          className="text-base"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                        <p className="mt-2 text-xs text-muted-foreground">
                          Use a publicly accessible image so it appears across
                          the feed.
                        </p>
                      </Field>
                    )}
                  />
                </FieldGroup>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isPending}
                  >
                    Clear draft
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? 'Publishing…' : 'Publish update'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
