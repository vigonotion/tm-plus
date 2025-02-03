import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { css } from "../../styled-system/css";
import { hstack, vstack } from "../../styled-system/patterns";
import { PropsWithChildren } from "react";
import {
  RiBuilding3Fill,
  RiBuilding3Line,
  RiChessFill,
  RiChessLine,
  RiHammerFill,
  RiHammerLine,
  RiInfoCardFill,
  RiInfoCardLine,
  RiSearchEyeLine,
  RiTerminalWindowFill,
  RiTerminalWindowLine,
  RiUser6Fill,
  RiUser6Line,
} from "@remixicon/react";
import { TmpLogo } from "../components/tmp-logo.tsx";

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
        gridTemplateRows:
          "80px minmax(calc(100vh - 80px - token(spacing.4)), max-content)",
        gap: "4",

        "& > *": {
          gridRowEnd: "span 2",
        },
      })}
    >
      <nav
        className={css({
          backgroundColor: "gray.1",
          borderRight: "1px solid token(colors.gray.3)",
          padding: "4",
          display: "grid",
          grid: "subgrid / subgrid",
        })}
      >
        <Link to={"/"} className={hstack({ padding: "2" })}>
          <TmpLogo />
        </Link>

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

          {process.env.NODE_ENV === "development" && (
            <>
              <Link to={"/ui"}>
                <NavItem>
                  <RiTerminalWindowLine className={"icon-when-inactive"} />
                  <RiTerminalWindowFill className={"icon-when-active"} />
                  <span>UI</span>
                </NavItem>
              </Link>

              <a href={"/404thispagedoesnotexist"}>
                <NavItem>
                  <RiSearchEyeLine className={"icon-when-inactive"} />
                  <span>404 page</span>
                </NavItem>
              </a>
            </>
          )}
        </div>
      </nav>
      <main
        className={css({
          px: "6",
          py: "4",

          display: "grid",
          grid: "subgrid / subgrid",
        })}
      >
        <Outlet />
      </main>
    </div>
  );
}
