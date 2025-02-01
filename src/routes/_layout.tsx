import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { css } from "../../styled-system/css";
import {
  BadgeInfoIcon,
  CircleIcon,
  ContactIcon,
  DicesIcon,
  FactoryIcon,
  WrenchIcon,
} from "lucide-react";
import { hstack } from "../../styled-system/patterns";
import { PropsWithChildren } from "react";

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

        "a.active > &": {
          fontWeight: "bold",
          color: "yellow.9",
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
          <CircleIcon className={css({ color: "orange.9" })} />
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
              <DicesIcon />
              <span>Games</span>
            </NavItem>
          </Link>

          <Link to={"/players"}>
            <NavItem>
              <ContactIcon />
              <span>Players</span>
            </NavItem>
          </Link>

          <Link to={"/corporations"}>
            <NavItem>
              <FactoryIcon />
              <span>Corporations</span>
            </NavItem>
          </Link>

          <Link to={"/tools/map"}>
            <NavItem>
              <WrenchIcon />
              <span>Tools</span>
            </NavItem>
          </Link>

          <Link to={"/about"}>
            <NavItem>
              <BadgeInfoIcon />
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
