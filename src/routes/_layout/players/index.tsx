import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";
import { useQuery } from "@tanstack/react-query";
import { collection } from "../../../client/conn.ts";
import {
  Collections,
  PlayersResponse,
  PlacementsResponse,
  GamesResponse,
} from "../../../client/types.gen.ts";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/datatable.tsx";
import { StyledLink } from "../../../components/styled-link.tsx";
import { Box, Flex, Text, Select } from "@radix-ui/themes";
import { useRatings, toElo, PlayerRating } from "../../../utils/elo.ts";
import { useState } from "react";

export const Route = createFileRoute("/_layout/players/")({
  component: RouteComponent,
});

type ExpandedPlayer = PlayersResponse<{
  "placements(player)": PlacementsResponse<{ game: GamesResponse }>[];
}>;

type ExpandedGame = GamesResponse<{
  "placements(game)": PlacementsResponse<{ game: GamesResponse }>[];
}>;

interface PlayerRow {
  id: string;
  name: string;
  defaultColor: string;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  elo: number;
}

function expandedPlayerToRow(
  player: ExpandedPlayer,
  playerRatings?: PlayerRating[],
): PlayerRow {
  const placements = player.expand?.["placements(player)"] ?? [];
  const gamesPlayed = placements.length;

  // A game is considered won if on the first place, or in a game with five players, on the first or second place
  const gamesWon = placements.filter((placement) => {
    // Safely access the placements array length with type checking
    const totalPlayers =
      (placement.expand?.game as ExpandedGame).expand?.["placements(game)"]
        ?.length ?? 0;

    return (
      placement.placement === 1 ||
      (totalPlayers === 5 && placement.placement === 2)
    );
  }).length;

  // Find player's rating from the ratings calculation
  const playerRating = playerRatings?.find((p) => p.playerId === player.id);
  const elo = playerRating ? toElo(playerRating.rating) : 1500;

  return {
    id: player.id,
    name: player.name || "Unknown",
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    defaultColor: player.default_color || "none",
    gamesPlayed,
    gamesWon,
    winRate: gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0,
    elo,
  };
}

const columnHelper = createColumnHelper<PlayerRow>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <StyledLink
        to={"/players/$playerId"}
        params={{ playerId: info.row.original.id }}
      >
        {info.getValue()}
      </StyledLink>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("elo", {
    header: "ELO Rating",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("defaultColor", {
    header: "Default Color",
    cell: (info) => {
      const color = info.getValue();
      return (
        <Flex align="center" gap="2">
          <Box
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: color,
              borderRadius: "50%",
              border: "1px solid #ccc",
            }}
          />
          <Text>{color}</Text>
        </Flex>
      );
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("gamesPlayed", {
    header: "Games Played",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("gamesWon", {
    header: "Games Won",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("winRate", {
    header: "Win Rate",
    cell: (info) => `${info.getValue().toString()}%`,
    footer: (info) => info.column.id,
  }),
];

function RouteComponent() {
  const [dateRange, setDateRange] = useState<string>("all");

  // Calculate date ranges
  const now = new Date();
  const startOfYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString();
  const startOfThreeMonths = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).toISOString();

  // Get ratings based on selected date range
  const { ratings, isLoading: ratingsLoading } = useRatings({
    startDate:
      dateRange === "year"
        ? startOfYear
        : dateRange === "three_months"
          ? startOfThreeMonths
          : undefined,
  });

  const { data, isLoading: playersLoading } = useQuery({
    ...collection(Collections.Players, {
      sort: "name",
      expand:
        "placements(player),placements(player).game,placements(player).game.placements(game)",
    }),
    select: (x) =>
      x.map((p) => expandedPlayerToRow(p as ExpandedPlayer, ratings)),
  });

  const isLoading = ratingsLoading || playersLoading;

  return (
    <>
      <Title>Players</Title>
      <div>
        <Flex justify="between" align="center" mb="4">
          <Text color={"gray"}>
            A game is considered won if on the first place, or in a game with
            five players, on the first or second place.
          </Text>

          <Select.Root value={dateRange} onValueChange={setDateRange}>
            <Select.Trigger placeholder="Select date range" />
            <Select.Content>
              <Select.Item value="all">All time</Select.Item>
              <Select.Item value="three_months">Past 3 months</Select.Item>
              <Select.Item value="year">Past year</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        {isLoading ? (
          <Text>Loading player data...</Text>
        ) : (
          data && <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
}
