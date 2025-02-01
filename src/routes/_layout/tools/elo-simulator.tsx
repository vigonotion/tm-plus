import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/tools/elo-simulator")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Title>Elo</Title>
      Hello "/tools/elo-simulator"!
    </div>
  );
}
