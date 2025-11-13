import { createFileRoute } from '@tanstack/react-router'
import { getPosts } from '@/data/post/get-posts'

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  loader: () => getPosts(),
})

function RouteComponent() {
  const posts = Route.useLoaderData()
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
