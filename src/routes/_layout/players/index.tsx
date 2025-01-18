import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/players/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/players/"!</div>
}
