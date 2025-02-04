import { createFileRoute, Link } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";
import { useQuery } from "@tanstack/react-query";
import { collection } from "../../../client/conn.ts";
import {
  Collections,
  GamesResponse,
  PlacementsResponse,
  PlayersResponse,
} from "../../../client/types.gen.ts";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/datatable.tsx";

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
  winner: {
    id?: string;
    name?: string;
  };
  playerCount: number;
}

function expandedGameToRow(game: ExpandedGame): GameRow {
  const winner = game.expand?.["placements(game)"].find(
    (x) => x.placement === 1,
  );

  return {
    id: game.id,
    date: game.date,
    map: game.map,
    generations: game.generations,
    winner: {
      id: winner?.id,
      name: winner?.expand?.player.name,
    },
    playerCount: game.expand?.["placements(game)"].length ?? 0,
  };
}

const columnHelper = createColumnHelper<GameRow>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => (
      <Link to={"/games/$gameId"} params={{ gameId: info.row.original.id }}>
        {info.getValue()}
      </Link>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("map", {
    header: "Map",
    cell: (info) => info.getValue(),
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

  columnHelper.accessor("winner.name", {
    header: "Winner",
    cell: (info) => (
      <Link
        to={"/players/$playerId"}
        params={{ playerId: info.row.original.winner.id }}
      >
        {info.getValue()}
      </Link>
    ),
    footer: (info) => info.column.id,
  }),
];

function RouteComponent() {
  const { data, isLoading } = useQuery({
    ...collection(Collections.Games, {
      sort: "-date",
      expand: "placements(game),placements(game).player",
      filter: "planned = false",
    }),
    select: (x) => x.map((g) => expandedGameToRow(g as ExpandedGame)),
  });

  return (
    <>
      <Title>Games</Title>
      <div>{data && <DataTable columns={columns} data={data} />}</div>
    </>
  );
}
