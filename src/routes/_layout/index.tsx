import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/button";
import { css } from "../../../styled-system/css";
import { Title } from "../../components/title.tsx";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>Hello</Title>
      <div className={css({ fontSize: "2xl", fontWeight: "bold" })}>
        Hello 🐼!
      </div>
      <Button />
    </>
  );
}
