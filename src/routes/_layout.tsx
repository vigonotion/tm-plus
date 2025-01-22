import { createFileRoute, Outlet } from "@tanstack/react-router";
import { css } from "../../styled-system/css";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      data-part={"wrapper"}
      className={css({
        display: "grid",
        gridTemplateColumns: "400px 1fr",
        height: "calc(100vh - 2 * token(sizes.4))",
        margin: "4",
        borderRadius: "xl",
        backgroundColor: "gray.1",
      })}
    >
      <nav
        className={css({
          margin: "2",
          backgroundColor: "gray.2",
          borderRadius: "md",
        })}
      >
        nav
      </nav>
      <aside
        className={css({
          //border: "1px solid token(colors.yellow.9)",
          margin: "2",
        })}
      >
        <Outlet />
      </aside>
    </div>
  );
}
