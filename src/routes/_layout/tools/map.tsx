import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/tools/map")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>Map</Title>Hello "/tools/map"!
    </>
  );
}
