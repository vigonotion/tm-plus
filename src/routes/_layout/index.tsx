import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/button";
import { Title } from "../../components/title.tsx";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>Hello</Title>
      <div>Hu</div>
      <Button />
    </>
  );
}
