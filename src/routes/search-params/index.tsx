import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


// 1. Define the schema for your search params
const searchSchema = z.object({
  query: z.string().optional(),
  page: z.number().min(1).catch(1),
  hasDiscount: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  sortBy: z.enum(['price', 'date', 'name']).catch('date'),
})

// 2. Define the route with validateSearch
export const Route = createFileRoute('/search-params/')({
  validateSearch: (search) => searchSchema.parse(search),
  component: SearchParamsDemo,
})

function SearchParamsDemo() {
  // 3. Access typed search params
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  // Helper to update search params
  const updateSearch = (newParams: Partial<typeof search>) => {
    navigate({
      search: (prev) => ({ ...prev, ...newParams }),
    })
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-linear-to-br from-background via-background to-cyan-500/5">
      {/* Background Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-40 right-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-400/20 blur-[150px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16">
        <header className="space-y-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-600 dark:text-cyan-400">
            State Management
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Type-Safe Search Params
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground sm:max-w-3xl">
            TanStack Router treats the URL search string as a first-class state
            manager. It parses, validates, and types your search params automatically.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-cyan-500/20 bg-card/80 shadow-xl shadow-cyan-500/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="rounded-md bg-cyan-100 px-2 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                    INPUTS
                  </span>
                  <span>Controls</span>
                </CardTitle>
                <CardDescription>
                  Interact with these inputs to update the URL state.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Query Input */}
                <div className="space-y-3">
                  <Label htmlFor="query" className="text-base font-medium">
                    Search Query <span className="text-muted-foreground text-xs font-normal ml-2">(string)</span>
                  </Label>
                  <Input
                    id="query"
                    value={search.query || ''}
                    onChange={(e) => updateSearch({ query: e.target.value })}
                    placeholder="Type something..."
                    className="h-12 bg-background/50 border-cyan-200/50 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Page Pagination */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      Page <span className="text-muted-foreground text-xs font-normal ml-2">(number)</span>
                    </Label>
                    <div className="flex items-center gap-3 rounded-lg border border-input bg-background/50 p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={search.page <= 1}
                        onClick={() => updateSearch({ page: search.page - 1 })}
                        className="h-9 px-3"
                      >
                        ←
                      </Button>
                      <div className="flex-1 text-center font-mono text-lg font-medium">
                        {search.page}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateSearch({ page: search.page + 1 })}
                        className="h-9 px-3"
                      >
                        →
                      </Button>
                    </div>
                  </div>

                  {/* Sort Select */}
                  <div className="space-y-3">
                    <Label htmlFor="sortBy" className="text-base font-medium">
                      Sort By <span className="text-muted-foreground text-xs font-normal ml-2">(enum)</span>
                    </Label>
                    <div className="relative">
                      <select
                        id="sortBy"
                        className="flex h-12 w-full appearance-none items-center justify-between rounded-md border border-cyan-200/50 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
                        value={search.sortBy}
                        onChange={(e) =>
                          updateSearch({
                            sortBy: e.target.value as 'price' | 'date' | 'name',
                          })
                        }
                      >
                        <option value="date">Date</option>
                        <option value="price">Price</option>
                        <option value="name">Name</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories Multi-select */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Categories <span className="text-muted-foreground text-xs font-normal ml-2">(array)</span>
                  </Label>
                  <div className="flex flex-wrap gap-2 rounded-xl border border-dashed border-cyan-200/50 bg-cyan-50/30 p-4 dark:bg-cyan-950/10">
                    {['Electronics', 'Clothing', 'Books', 'Home', 'Garden', 'Toys'].map((cat) => {
                      const isSelected = search.categories?.includes(cat)
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            const current = search.categories || []
                            const next = isSelected
                              ? current.filter((c) => c !== cat)
                              : [...current, cat]
                            updateSearch({ categories: next })
                          }}
                          className={`
                            group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all
                            ${isSelected
                              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-500 ring-offset-2 ring-offset-background'
                              : 'bg-background hover:bg-cyan-100/50 text-muted-foreground hover:text-cyan-700 border border-input hover:border-cyan-200 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-300'
                            }
                          `}
                        >
                          {isSelected && (
                            <span className="animate-in zoom-in duration-200">✓</span>
                          )}
                          {cat}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Discount Checkbox */}
                <div className="flex items-center justify-between rounded-lg border border-input bg-background/50 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="hasDiscount" className="text-base font-medium cursor-pointer">
                      Has Discount
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Filter for discounted items only <span className="text-xs font-mono ml-1">(boolean)</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasDiscount"
                      className="h-6 w-6 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500/20 transition-all cursor-pointer"
                      checked={search.hasDiscount || false}
                      onChange={(e) => updateSearch({ hasDiscount: e.target.checked })}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="destructive"
                    onClick={() => navigate({ search: { page: 1, sortBy: 'date' } })}
                    className="w-full sm:w-auto"
                  >
                    Reset All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visualization Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="sticky top-8 border-blue-500/20 bg-card/80 shadow-xl shadow-blue-500/5 backdrop-blur-sm h-fit">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    STATE
                  </span>
                  <span>URL Search Params</span>
                </CardTitle>
                <CardDescription>
                  Live JSON representation of the URL state.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute right-4 top-4 z-10">
                    <div className="flex items-center gap-1.5 rounded-full bg-background/80 px-2 py-1 text-[10px] font-medium text-muted-foreground shadow-sm backdrop-blur border">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Live Sync
                    </div>
                  </div>
                  <pre className="max-h-[600px] overflow-auto p-6 text-sm font-mono leading-relaxed text-blue-600 dark:text-blue-400">
                    {JSON.stringify(search, null, 2)}
                  </pre>
                </div>
                <div className="border-t bg-muted/30 p-6">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Try this:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
                    <li>Manually edit the URL in your browser bar</li>
                    <li>Use the back/forward buttons</li>
                    <li>Refresh the page (state persists)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
