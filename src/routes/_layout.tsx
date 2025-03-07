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
  RiFilterLine,
} from "@remixicon/react";
import { TmpLogo } from "../components/tmp-logo.tsx";

import css from "./_layout.module.css";
import { Flex, Slot, Select, Text, Separator } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { dateRangeAtom, getDateRangeDisplayName } from "../atoms/dateRange.ts";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function NavItem({ children }: PropsWithChildren) {
  return <Slot className={css.navitem}>{children}</Slot>;
}

function RouteComponent() {
  const [dateRange, setDateRange] = useAtom(dateRangeAtom);

  return (
    <div className={css.root}>
      <nav className={css.nav}>
        <Flex align={"center"} p={"2"}>
          <TmpLogo />
        </Flex>

        <div className={css.dateFilter}>
          <Flex align="center" gap="2" mb="2">
            <RiFilterLine size={16} />
            <Text size="2" weight="medium">Date Range</Text>
          </Flex>
          <Select.Root value={dateRange} onValueChange={setDateRange}>
            <Select.Trigger placeholder="Select date range" />
            <Select.Content position="popper">
              <Select.Item value="all">All time</Select.Item>
              <Select.Item value="three_months">Past 3 months</Select.Item>
              <Select.Item value="year">Past year</Select.Item>
            </Select.Content>
          </Select.Root>
          <Text size="1" color="gray" mt="1">
            Showing: {getDateRangeDisplayName(dateRange)}
          </Text>
        </div>

        <Separator my="3" size="4" />

        <Flex direction={"column"} gap={"2"}>
          <NavItem>
            <Link to={"/games"}>
              <RiChessLine className={"icon_when_inactive"} />
              <RiChessFill className={"icon_when_active"} />
              <span>Games</span>
            </Link>
          </NavItem>

          <NavItem>
            <Link to={"/players"}>
              <RiUser6Line className={"icon_when_inactive"} />
              <RiUser6Fill className={"icon_when_active"} />
              <span>Players</span>
            </Link>
          </NavItem>

          <NavItem>
            <Link to={"/corporations"}>
              <RiBuilding3Line className={"icon_when_inactive"} />
              <RiBuilding3Fill className={"icon_when_active"} />
              <span>Corporations</span>
            </Link>
          </NavItem>

          <NavItem>
            <Link to={"/tools/map"}>
              <RiHammerLine className={"icon_when_inactive"} />
              <RiHammerFill className={"icon_when_active"} />
              <span>Tools</span>
            </Link>
          </NavItem>

          <NavItem>
            <Link to={"/about"}>
              <RiInfoCardLine className={"icon_when_inactive"} />
              <RiInfoCardFill className={"icon_when_active"} />
              <span>About</span>
            </Link>
          </NavItem>

          {process.env.NODE_ENV === "development" && (
            <>
              <NavItem>
                <Link to={"/ui"}>
                  <RiTerminalWindowLine className={"icon_when_inactive"} />
                  <RiTerminalWindowFill className={"icon_when_active"} />
                  <span>UI</span>
                </Link>
              </NavItem>

              <NavItem>
                <a href={"/404thispagedoesnotexist"}>
                  <RiSearchEyeLine className={"icon_when_inactive"} />
                  <span>404 page</span>
                </a>
              </NavItem>
            </>
          )}
        </Flex>
      </nav>
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
}
