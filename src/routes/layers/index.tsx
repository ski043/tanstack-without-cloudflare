import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

const checklist = [
  'Layout route (this page) wraps everything beneath /layers',
  'Demo section adds its own loaders + styling',
  'Leaf canvas renders last while staying inside both shells',
]

export const Route = createFileRoute('/layers/')({
  component: LayersIndex,
})

function LayersIndex() {
  return (
    <section className="space-y-5 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        walkthrough
      </p>
      <h2 className="text-3xl font-semibold text-foreground">
        Start by loading the child route
      </h2>
      <p className="text-base text-muted-foreground sm:mx-auto sm:max-w-2xl">
        This view lives inside the tinted layout above. Click through to mount
        the nested routes and watch styles stack without a full-page refresh.
      </p>

      <ol className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 text-left text-sm text-muted-foreground">
        {checklist.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-center gap-3">
        <Button asChild size="lg">
          <Link to="/layers/demo">Mount demo layout</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </section>
  )
}
