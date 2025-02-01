import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/games/$gameId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Title>Game</Title>Hello "/games/$gameId"!
    </div>
  );
}
