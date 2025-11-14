import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/layers/demo/')({
  component: DemoIndex,
})

function DemoIndex() {
  return (
    <div className="space-y-4 text-blue-950/80 dark:text-blue-50/80">
      <h3 className="text-2xl font-semibold text-foreground">
        Demo index route
      </h3>
      <p className="text-sm leading-relaxed">
        Use this route to preload data or render instructions before hitting the
        final leaf. The blue frame is provided by the parent layout, while this
        block focuses only on content.
      </p>
      <Button asChild size="sm" className="shadow-sm shadow-blue-500/30">
        <Link to="/layers/demo/canvas">Render the canvas child</Link>
      </Button>
    </div>
  )
}
