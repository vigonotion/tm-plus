import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/players/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>Players</Title>Hello "/players/"!
    </>
  );
}
