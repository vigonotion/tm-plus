import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/corporations/$corporationId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>Corporation</Title>Hello "/corporations/$corporationId"!
    </>
  );
}
