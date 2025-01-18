import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/tools/map")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/tools/map"!</div>;
}
