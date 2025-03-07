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

export const Route = createFileRoute("/_layout/corporations/")({
  component: RouteComponent,
});

type ExpandedCorporation = CorporationsResponse<{
  "placements(corp)": PlacementsResponse[];
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
): CorporationRow {
  const placements = corporation.expand?.["placements(corp)"] || [];
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
    cell: (info) => `${info.getValue()}%`,
    footer: (info) => info.column.id,
  }),
];

function RouteComponent() {
  const { data } = useQuery({
    ...collection(Collections.Corporations, {
      sort: "name",
      expand: "placements(corp)",
    }),
    select: (x) =>
      x.map((c) => expandedCorporationToRow(c as ExpandedCorporation)),
  });

  return (
    <>
      <Title>Corporations</Title>
      <div>
        <Box mb={"4"}>
          <Text color={"gray"}>
            A game is considered won if on the first place, or in a game with
            five players, on the first or second place.
          </Text>
        </Box>
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}
