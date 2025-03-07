import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";
import { useQuery } from "@tanstack/react-query";
import { collection } from "../../../client/conn.ts";
import { Collections } from "../../../client/types.gen.ts";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/datatable.tsx";
import { MapLabel } from "../../../components/maplabel.tsx";
import { Box, Flex, Text } from "@radix-ui/themes";
import { StyledLink } from "../../../components/styled-link.tsx";
import { useAtom } from "jotai";
import { dateRangeAtom, getDateRangeDisplayName } from "../../../atoms/dateRange.ts";
import { groupFilterAtom, getGroupDisplayName, useGroups } from "../../../atoms/groupFilter.ts";
import { useMemo } from "react";

export const Route = createFileRoute("/_layout/maps/")({
  component: RouteComponent,
});

interface MapStats {
  name: string;
  gamesPlayed: number;
  lastPlayed: string;
  lastPlayedGameId: string;
}

const columnHelper = createColumnHelper<MapStats>();

const columns = [
  columnHelper.accessor("name", {
    header: "Map",
    cell: (info) => (
      <StyledLink to={"/maps/$mapId"} params={{ mapId: info.getValue() }}>
        <MapLabel map={info.getValue()} />
      </StyledLink>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("gamesPlayed", {
    header: "Games Played",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("lastPlayed", {
    header: "Last Played",
    cell: (info) => {
      const date = info.getValue();
      const gameId = info.row.original.lastPlayedGameId;
      
      if (!date) return "Never";
      
      return gameId ? (
        <StyledLink to={"/games/$gameId"} params={{ gameId }}>
          {date.substring(0, 10)}
        </StyledLink>
      ) : (
        date.substring(0, 10)
      );
    },
    footer: (info) => info.column.id,
  }),
];

function RouteComponent() {
  const [dateRange] = useAtom(dateRangeAtom);
  const [groupFilter] = useAtom(groupFilterAtom);
  const { data: groups = [] } = useGroups();

  const { data: games, isLoading } = useQuery({
    ...collection(Collections.Games, {
      sort: "-date",
      filter: "planned = false",
    }),
  });

  const mapStats = useMemo(() => {
    if (!games) return [];

    // Get date ranges for filtering
    const now = new Date();
    const dateRanges = {
      all: undefined,
      year: new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      ).toISOString(),
      three_months: new Date(
        now.getFullYear(),
        now.getMonth() - 3,
        now.getDate()
      ).toISOString(),
    };

    // Filter games by date range and group
    const dateLimit = dateRanges[dateRange as keyof typeof dateRanges];
    const filteredGames = games.filter((game) => {
      const passesDateFilter = !dateLimit || game.date >= dateLimit;
      const passesGroupFilter = !groupFilter || game.group === groupFilter;
      return passesDateFilter && passesGroupFilter;
    });

    // Get unique map names from the games
    const mapNames = Array.from(new Set(filteredGames.map((game) => game.map)));

    // Calculate stats for each map
    return mapNames.map((mapName) => {
      const mapGames = filteredGames.filter((game) => game.map === mapName);
      const sortedGames = [...mapGames].sort((a, b) => 
        b.date.localeCompare(a.date)
      );
      
      return {
        name: mapName,
        gamesPlayed: mapGames.length,
        lastPlayed: sortedGames.length > 0 ? sortedGames[0].date : "",
        lastPlayedGameId: sortedGames.length > 0 ? sortedGames[0].id : "",
      };
    }).sort((a, b) => b.gamesPlayed - a.gamesPlayed); // Sort by most played
  }, [games, dateRange, groupFilter]);

  return (
    <>
      <Title>Maps</Title>
      <div>
        <Box mb={"4"}>
          <Flex direction="column" gap="1">
            <Text color={"gray"}>
              Statistics for all maps played in Terraforming Mars games.
            </Text>
            <Text size="2" color="gray">
              Showing data for: {getDateRangeDisplayName(dateRange)}, 
              Group: {getGroupDisplayName(groupFilter, groups)}
            </Text>
          </Flex>
        </Box>
        {isLoading ? (
          <Text>Loading map data...</Text>
        ) : (
          mapStats && <DataTable columns={columns} data={mapStats} />
        )}
      </div>
    </>
  );
}
