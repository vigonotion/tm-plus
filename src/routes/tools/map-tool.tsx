import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tools/map-tool')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tools/map-tool"!</div>
}
