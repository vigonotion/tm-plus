import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../../components/title.tsx";

export const Route = createFileRoute("/_layout/_authenticated/tools/submit")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>Submit</Title>Hello "/_authenticated/tools/submit"!
    </>
  );
}
