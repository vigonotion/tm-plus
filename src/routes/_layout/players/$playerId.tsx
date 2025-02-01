import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/players/$playerId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Title>Player</Title>Hello "/players/$playerId"!
    </div>
  );
}
