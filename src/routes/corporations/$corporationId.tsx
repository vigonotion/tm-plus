import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/corporations/$corporationId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/corporations/$corporationId"!</div>
}
