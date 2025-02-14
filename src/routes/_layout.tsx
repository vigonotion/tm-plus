import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
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
  return <div>{children}</div>;
}

function RouteComponent() {
  return (
    <div>
      <nav>
        <div>
          <TmpLogo />
        </div>

        <div>
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
      <main>
        <Outlet />
      </main>
    </div>
  );
}
