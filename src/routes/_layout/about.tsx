import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../components/title.tsx";

export const Route = createFileRoute("/_layout/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Title>About</Title>
    </div>
  );
}
