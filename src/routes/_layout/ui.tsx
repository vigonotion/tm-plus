import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../components/title.tsx";
import { BlockText } from "../../components/block-text.tsx";

export const Route = createFileRoute("/_layout/ui")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>UI</Title>
      <BlockText>UI Components</BlockText>
    </>
  );
}
