import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { css } from "../../styled-system/css";
import { hstack } from "../../styled-system/patterns";
import { PropsWithChildren } from "react";
import {
  RiBuilding3Fill,
  RiBuilding3Line,
  RiChessFill,
  RiChessLine,
  RiCircleLine,
  RiHammerFill,
  RiHammerLine,
  RiInfoCardFill,
  RiInfoCardLine,
  RiUser6Fill,
  RiUser6Line,
} from "@remixicon/react";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function NavItem({ children }: PropsWithChildren) {
  return (
    <div
      className={hstack({
        color: "gray.11",
        padding: "2",
        borderRadius: "lg",
        border: "1px solid transparent",

        "& > svg": {
          width: "16px",
        },

        "&:hover": {
          border: "1px solid token(colors.yellow.6)",
          backgroundColor: "yellow.3",
          color: "yellow.12",
        },

        "& > .icon-when-active": {
          display: "none",
        },

        "a.active > &": {
          fontWeight: "bold",
          color: "yellow.9",

          "& > .icon-when-active": { display: "block" },
          "& > .icon-when-inactive": { display: "none" },
        },
      })}
    >
      {children}
    </div>
  );
}

function RouteComponent() {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: "4",
        minHeight: "100vh",
      })}
    >
      <nav
        className={css({
          backgroundColor: "gray.1",
          borderRight: "1px solid token(colors.gray.3)",
          padding: "4",
        })}
      >
        <div className={hstack({ padding: "2", marginBottom: "8" })}>
          <RiCircleLine className={css({ color: "orange.9" })} />
          <span
            className={css({
              fontFamily: "display",
              textTransform: "uppercase",
            })}
          >
            Terraforming Marsᐩ
          </span>
        </div>

        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "2",
          })}
        >
          <Link to={"/games"}>
            <NavItem>
              <RiChessLine className={"icon-when-inactive"} />
              <RiChessFill className={"icon-when-active"} />
              <span>Games</span>
            </NavItem>
          </Link>

          <Link to={"/players"}>
            <NavItem>
              <RiUser6Line className={"icon-when-inactive"} />
              <RiUser6Fill className={"icon-when-active"} />
              <span>Players</span>
            </NavItem>
          </Link>

          <Link to={"/corporations"}>
            <NavItem>
              <RiBuilding3Line className={"icon-when-inactive"} />
              <RiBuilding3Fill className={"icon-when-active"} />
              <span>Corporations</span>
            </NavItem>
          </Link>

          <Link to={"/tools/map"}>
            <NavItem>
              <RiHammerLine className={"icon-when-inactive"} />
              <RiHammerFill className={"icon-when-active"} />
              <span>Tools</span>
            </NavItem>
          </Link>

          <Link to={"/about"}>
            <NavItem>
              <RiInfoCardLine className={"icon-when-inactive"} />
              <RiInfoCardFill className={"icon-when-active"} />
              <span>About</span>
            </NavItem>
          </Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
