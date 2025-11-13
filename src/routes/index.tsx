import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <h1>Hello how are you</h1>
      <Button>Click me</Button>
      <ThemeToggle />
    </div>
  )
}
