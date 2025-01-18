import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_authenticated/tools/submit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/tools/submit"!</div>
}
