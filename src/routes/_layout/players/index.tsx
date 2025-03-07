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
import { PlayerMarker } from "../../../components/player-marker.tsx";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/datatable.tsx";
import { StyledLink } from "../../../components/styled-link.tsx";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useRatings, toElo, PlayerRating } from "../../../utils/elo.ts";
import { useMemo } from "react";
import { useAtom } from "jotai";
import { dateRangeAtom, getDateRanges, getDateRangeDisplayName } from "../../../atoms/dateRange.ts";
import { groupFilterAtom, getGroupDisplayName, useGroups } from "../../../atoms/groupFilter.ts";

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
    cell: (info) => <PlayerMarker color={info.getValue()} />,
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
  const [dateRange] = useAtom(dateRangeAtom);
  const [groupFilter] = useAtom(groupFilterAtom);
  const { data: groups = [] } = useGroups();
  const dateRanges = getDateRanges();

  // Get ratings based on selected date range and group filter
  const { ratings, isLoading: ratingsLoading } = useRatings({
    startDate: dateRanges[dateRange],
    groupId: groupFilter,
  });

  const { data: playersData, isLoading: playersLoading } = useQuery({
    ...collection(Collections.Players, {
      sort: "name",
      expand:
        "placements(player),placements(player).game,placements(player).game.placements(game)",
    }),
  });

  const isLoading = ratingsLoading || playersLoading;

  // Process player data with date and group filtering
  const data = useMemo(() => {
    if (!playersData) return undefined;

    // Get date limit based on selected range
    const dateLimit = dateRanges[dateRange];

    return playersData
      .map((p) => {
        const player = p as ExpandedPlayer;
        
        // Filter placements by date and group
        let filteredPlacements = player.expand?.["placements(player)"]?.filter(placement => {
          const gameDate = placement.expand?.game?.date;
          const gameGroup = placement.expand?.game?.group;
          
          // Apply date filter
          const passesDateFilter = !dateLimit || (gameDate && gameDate >= dateLimit);
          
          // Apply group filter if active
          const passesGroupFilter = !groupFilter || gameGroup === groupFilter;
          
          return passesDateFilter && passesGroupFilter;
        }) || [];
        
        // Create a modified player object with filtered placements
        const filteredPlayer: ExpandedPlayer = {
          ...player,
          expand: {
            ...player.expand,
            "placements(player)": filteredPlacements
          }
        };
        
        return expandedPlayerToRow(filteredPlayer, ratings);
      })
      // Filter out players with 0 games played in the selected time frame
      .filter(player => player.gamesPlayed > 0);
  }, [playersData, dateRange, dateRanges, ratings, groupFilter]);

  return (
    <>
      <Title>Players</Title>
      <div>
        <Box mb="4">
          <Flex direction="column" gap="1">
            <Text color={"gray"}>
              A game is considered won if on the first place, or in a game with
              five players, on the first or second place.
            </Text>
            <Text size="2" color="gray">
              Showing data for: {getDateRangeDisplayName(dateRange)}, 
              Group: {getGroupDisplayName(groupFilter, groups)}
            </Text>
          </Flex>
        </Box>

        {isLoading ? (
          <Text>Loading player data...</Text>
        ) : (
          data && <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
}
