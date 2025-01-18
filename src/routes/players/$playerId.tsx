import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/$playerId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/players/$playerId"!</div>
}
