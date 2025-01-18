import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/corporations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/corporations/"!</div>
}
