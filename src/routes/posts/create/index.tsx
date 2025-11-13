import { createFileRoute, redirect } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'

import type { z } from 'zod'
import { createPostSchema } from '@/schemas/post'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createPost } from '@/data/post/create-post'

export const Route = createFileRoute('/posts/create/')({
  component: RouteComponent,
})

function RouteComponent() {
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

      redirect({ to: '/posts' })
    })
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post with a title, content, and image URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
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
                    <FieldLabel htmlFor="form-rhf-demo-content">
                      Content
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-rhf-demo-content"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your content here..."
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
                    <FieldLabel htmlFor="form-rhf-demo-content">
                      Image URL
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-image-url"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your image URL here..."
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo" disabled={isPending}>
              {isPending ? 'Creating...' : 'Submit'}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
