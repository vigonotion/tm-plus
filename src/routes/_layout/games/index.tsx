import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";
import { useQuery } from "@tanstack/react-query";
import { collection } from "../../../client/conn.ts";
import {
  Collections,
  GamesResponse,
  PlacementsResponse,
  PlayersResponse,
} from "../../../client/types.gen.ts";
import { useAtom } from "jotai";
import {
  dateRangeAtom,
  getDateRanges,
  getDateRangeDisplayName,
} from "../../../atoms/dateRange.ts";
import {
  groupFilterAtom,
  getGroupDisplayName,
  useGroups,
} from "../../../atoms/groupFilter.ts";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/datatable.tsx";
import { MapLabel } from "../../../components/maplabel.tsx";
import { StyledLink } from "../../../components/styled-link.tsx";
import { Box, Text, Flex } from "@radix-ui/themes";

export const Route = createFileRoute("/_layout/games/")({
  component: RouteComponent,
});

type ExpandedGame = GamesResponse<{
  "placements(game)": PlacementsResponse<{ player: PlayersResponse }>[];
}>;

interface GameRow {
  id: string;
  date: string;
  map: string;
  generations: number;
  winners: {
    id: string;
    name: string;
  }[];
  playerCount: number;
}

function expandedGameToRow(game: ExpandedGame): GameRow {
  const placements = game.expand?.["placements(game)"] || [];
  const totalPlayers = placements.length;

  // Find all winners according to the win condition
  const winners = placements
    .filter(
      (x) => x.placement === 1 || (totalPlayers === 5 && x.placement === 2),
    )
    .map((winner) => ({
      id: winner.id,
      name: winner.expand?.player.name ?? "Unknown",
    }));

  return {
    id: game.id,
    date: game.date,
    map: game.map,
    generations: game.generations,
    winners: winners,
    playerCount: totalPlayers,
  };
}

const columnHelper = createColumnHelper<GameRow>();

const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => (
      <StyledLink
        to={"/games/$gameId"}
        params={{ gameId: info.row.original.id }}
      >
        {info.getValue().substring(0, 10)}
      </StyledLink>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("map", {
    header: "Map",
    cell: (info) => (
      <StyledLink to={"/maps/$mapId"} params={{ mapId: info.getValue() }}>
        <MapLabel map={info.getValue()} />
      </StyledLink>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("generations", {
    header: "# Gens",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("playerCount", {
    header: "# Players",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("winners", {
    header: "Winners",
    cell: (info) => {
      const winners = info.getValue();

      if (winners.length === 0) {
        return <Text color="gray">No winners</Text>;
      }

      return (
        <div>
          {winners.map((winner, index) => (
            <React.Fragment key={winner.id}>
              {index > 0 && <Text>, </Text>}
              <StyledLink
                to={"/players/$playerId"}
                params={{ playerId: winner.id }}
              >
                {winner.name}
              </StyledLink>
            </React.Fragment>
          ))}
        </div>
      );
    },
    footer: (info) => info.column.id,
  }),
];

function RouteComponent() {
  const [dateRange] = useAtom(dateRangeAtom);
  const [groupFilter] = useAtom(groupFilterAtom);
  const { data: groups = [] } = useGroups();
  const dateRanges = getDateRanges();

  const { data, isLoading } = useQuery({
    ...collection(Collections.Games, {
      sort: "-date",
      expand: "placements(game),placements(game).player",
      filter: "planned = false",
    }),
    select: (x) => {
      // Filter games by date range
      const dateLimit = dateRanges[dateRange];
      let filteredGames = dateLimit
        ? x.filter((game) => game.date >= dateLimit)
        : x;

      // Filter games by group if a group is selected
      if (groupFilter) {
        filteredGames = filteredGames.filter(
          (game) => game.group === groupFilter,
        );
      }

      return filteredGames.map((g) => expandedGameToRow(g as ExpandedGame));
    },
  });

  return (
    <>
      <Title>Games</Title>
      <div>
        <Box mb={"4"}>
          <Flex direction="column" gap="1">
            <Text color={"gray"}>
              A game is considered won if on the first place, or in a game with
              five players, on the first or second place.
            </Text>
            <Text size="2" color="gray">
              Showing data for: {getDateRangeDisplayName(dateRange)}, Group:{" "}
              {getGroupDisplayName(groupFilter, groups)}
            </Text>
          </Flex>
        </Box>
        {isLoading ? (
          <Text>Loading game data...</Text>
        ) : (
          data && <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
}
