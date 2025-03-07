import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";
import { useQuery } from "@tanstack/react-query";
import { collection } from "../../../client/conn.ts";
import {
  Collections,
  CorporationsResponse,
  PlacementsResponse,
} from "../../../client/types.gen.ts";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/datatable.tsx";
import { StyledLink } from "../../../components/styled-link.tsx";
import { Box, Text, HoverCard, Flex } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { dateRangeAtom, getDateRanges, getDateRangeDisplayName } from "../../../atoms/dateRange.ts";
import { groupFilterAtom, getGroupDisplayName, useGroups } from "../../../atoms/groupFilter.ts";

export const Route = createFileRoute("/_layout/corporations/")({
  component: RouteComponent,
});

type ExpandedCorporation = CorporationsResponse<{
  "placements(corp)": PlacementsResponse<{
    player: {
      id: string;
      name?: string;
      expand?: {
        groups?: {
          id: string;
          name?: string;
        }[];
      };
    };
  }>[];
}>;

interface CorporationRow {
  id: string;
  name: string;
  description: string;
  timesPlayed: number;
  timesWon: number;
  winRate: number;
}

// Function to convert string to title case
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function expandedCorporationToRow(
  corporation: ExpandedCorporation,
  dateLimit?: string
): CorporationRow {
  // Filter placements by date if a date limit is provided
  let placements = corporation.expand?.["placements(corp)"] ?? [];
  
  if (dateLimit) {
    placements = placements.filter(placement => {
      const gameDate = placement.created; // Using created as a fallback since game date isn't expanded
      return gameDate >= dateLimit;
    });
  }
  
  const timesPlayed = placements.length;

  // A game is considered won if on the first place, or in a game with five players, on the first or second place
  const timesWon = placements.filter((placement) => {
    return (
      placement.placement === 1 || (placement.game && placement.placement === 2)
    );
  }).length;

  return {
    id: corporation.id,
    name: corporation.name || "Unknown",
    description: corporation.description || "",
    timesPlayed,
    timesWon,
    winRate: timesPlayed > 0 ? Math.round((timesWon / timesPlayed) * 100) : 0,
  };
}

const columnHelper = createColumnHelper<CorporationRow>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      const name = toTitleCase(info.getValue());
      const description = info.row.original.description;

      return (
        <HoverCard.Root>
          <HoverCard.Trigger>
            <StyledLink
              to={"/corporations/$corporationId"}
              params={{ corporationId: info.row.original.id }}
            >
              {name}
            </StyledLink>
          </HoverCard.Trigger>
          <HoverCard.Content side={"top"}>
            <Flex direction="column" gap="2" style={{ maxWidth: "300px" }}>
              <Text weight="bold" size="3">
                {name}
              </Text>
              {description && (
                <Text
                  size="2"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </Flex>
          </HoverCard.Content>
        </HoverCard.Root>
      );
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("timesPlayed", {
    header: "Times Played",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("timesWon", {
    header: "Times Won",
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
  
  const { data } = useQuery({
    ...collection(Collections.Corporations, {
      sort: "name",
      expand: "placements(corp),placements(corp).player,placements(corp).player.groups",
    }),
    select: (x) => {
      let corporations = x;
      const dateLimit = dateRanges[dateRange];
      
      // Filter by group if a group filter is selected
      if (groupFilter) {
        corporations = corporations.filter(corp => {
          const placements = (corp as ExpandedCorporation).expand?.["placements(corp)"] || [];
          
          // Check if this corporation was ever used by a player in the selected group
          return placements.some(placement => {
            const player = placement.expand?.player;
            if (!player) return false;
            
            const playerGroups = player.expand?.groups || [];
            return playerGroups.some(group => group.id === groupFilter);
          });
        });
      }
      
      return corporations.map((c) => expandedCorporationToRow(c as ExpandedCorporation, dateLimit));
    },
  });

  return (
    <>
      <Title>Corporations</Title>
      <div>
        <Box mb={"4"}>
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
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}
