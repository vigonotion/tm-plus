import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../components/title.tsx";
import { BlockText } from "../../components/block-text.tsx";

export const Route = createFileRoute("/_layout/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>About</Title>
      <BlockText>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
        blanditiis eum harum ipsam iste itaque nihil odit rem. Alias aliquid
        distinctio doloremque eum incidunt itaque molestias natus nesciunt odit
        tempora?
      </BlockText>
    </>
  );
}
