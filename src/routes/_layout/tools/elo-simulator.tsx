import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/tools/elo-simulator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tools/elo-simulator"!</div>
}
