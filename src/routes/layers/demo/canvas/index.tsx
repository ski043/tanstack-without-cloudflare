import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

const items = [
  {
    title: 'Loader inheritance',
    description:
      'Parent loaders run before children. Share user/session data once, reuse everywhere.',
  },
  {
    title: 'Scoped styling',
    description:
      'Each layer controls its own surface. Children render inside existing chrome without reloading the page.',
  },
  {
    title: 'Route context',
    description:
      'Expose helpers, mutations, or config through route context instead of prop drilling.',
  },
]

export const Route = createFileRoute('/layers/demo/canvas/')({
  component: CanvasRoute,
})

function CanvasRoute() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-emerald-300/60 bg-gradient-to-br from-emerald-300/25 via-emerald-300/10 to-background px-6 py-10 shadow-xl shadow-emerald-500/20">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-500">
          Leaf route
        </p>
        <h3 className="text-3xl font-semibold text-foreground">
          Canvas: the child fills the frame
        </h3>
        <p className="text-base text-emerald-900/80 dark:text-emerald-50/80">
          This component is rendered inside the previous two layers. Toggle
          routes and watch the outer shells stay mounted while only this inner
          content swaps.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-emerald-200/70 bg-background/70 p-4 text-sm text-muted-foreground shadow-sm"
          >
            <p className="text-base font-semibold text-foreground">
              {item.title}
            </p>
            <p className="mt-2 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link to="/layers">Back to layer overview</Link>
        </Button>
        <Button asChild>
          <Link to="/posts/create">Create a post next</Link>
        </Button>
      </div>
    </div>
  )
}
