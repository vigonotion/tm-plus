import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/button";
import { css } from "../../../styled-system/css";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <span>Hello "/"!</span>
      <div className={css({ fontSize: "2xl", fontWeight: "bold" })}>
        Hello 🐼!
      </div>
      <Button />
    </div>
  );
}
