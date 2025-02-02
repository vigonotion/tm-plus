import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/tools/elo-simulator")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>Elo</Title>
      Hello "/tools/elo-simulator"!
    </>
  );
}
