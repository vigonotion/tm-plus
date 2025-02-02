import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";

export const Route = createFileRoute("/_layout/corporations/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>Corporations</Title>Hello "/corporations/"!
    </>
  );
}
