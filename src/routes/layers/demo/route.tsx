import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/layers/demo')({
  component: DemoLayout,
})

function DemoLayout() {
  return (
    <section className="rounded-[36px] border-2 border-blue-300/60 bg-blue-500/5 p-6 shadow-inner shadow-blue-500/10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-400">
          Demo layout
        </p>
        <h2 className="text-2xl font-semibold text-foreground">
          Section-owned loader + chrome
        </h2>
        <p className="text-sm text-blue-900/80 dark:text-blue-100/80">
          Everything rendered below is a child route. Notice how this layout
          adds its own background, spacing, and context before rendering the
          next layer.
        </p>
      </div>
      <div className="mt-6 rounded-[28px] border border-blue-300/60 bg-background/80 p-6 shadow-lg shadow-blue-500/10">
        <Outlet />
      </div>
    </section>
  )
}
