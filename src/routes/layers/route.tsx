import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

const layerCards = [
  {
    label: 'Layer 1',
    title: 'Layout Route',
    description:
      'Global wrappers, providers, nav, and theme live here. Every descendant inherits this context.',
    accent:
      'from-primary/20 via-primary/5 to-background border-primary/40 text-primary-foreground',
  },
  {
    label: 'Layer 2',
    title: 'Section Route',
    description:
      'Wrap a slice of the tree with its own loader, error boundary, or chrome. Perfect for dashboards.',
    accent: 'from-blue-400/20 via-blue-400/5 to-background border-blue-400/40',
  },
  {
    label: 'Layer 3',
    title: 'Leaf Route',
    description:
      'Actual screen content. Still free to load data, mutate, and render suspense boundaries.',
    accent:
      'from-emerald-400/20 via-emerald-200/10 to-background border-emerald-400/40',
  },
]

export const Route = createFileRoute('/layers')({
  component: LayersLayout,
})

function LayersLayout() {
  return (
    <div className="relative isolate min-h-[100dvh] overflow-hidden bg-gradient-to-b from-background via-background to-muted/40">
      <GradientOrnaments />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16">
        <header className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Nested routes
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Visualize every routing layer
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground sm:max-w-3xl">
              TanStack Start keeps layouts, loaders, and UI neatly scoped.
              Follow the cascade to see how each nested route renders inside its
              parent with unique styling and responsibilities.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="shadow-lg shadow-primary/30">
              <Link to="/layers/demo/canvas">Open the layered demo</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/posts">Back to posts</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {layerCards.map((layer) => (
            <article
              key={layer.title}
              className={`rounded-3xl border bg-gradient-to-br p-6 text-left shadow-lg shadow-black/5 backdrop-blur ${layer.accent}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                {layer.label}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">
                {layer.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {layer.description}
              </p>
            </article>
          ))}
        </section>

        <div className="rounded-[32px] border border-dashed border-muted-foreground/40 bg-card/90 px-8 py-12 text-center shadow-inner shadow-black/5 backdrop-blur">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function GradientOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
      <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-400/25 blur-[150px]" />
    </div>
  )
}
