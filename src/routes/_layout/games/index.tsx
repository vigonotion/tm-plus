import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/games/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Title>Games</Title>Hello "/games/"!
    </div>
  );
}
