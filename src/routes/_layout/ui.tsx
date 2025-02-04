import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../components/title.tsx";
import { BlockText } from "../../components/block-text.tsx";
import { VStack } from "../../../styled-system/jsx";
import { DataTable } from "../../components/datatable.tsx";
import { createColumnHelper } from "@tanstack/react-table";

export const Route = createFileRoute("/_layout/ui")({
  component: RouteComponent,
});

interface Game {
  id: string;
  date: string;
  map: string;
  generations: number;
}

const data: Game[] = Array.from(Array(50))
  .map((_, i) => i)
  .map((x) => ({
    id: `G-${x.toString()}`,
    date: "2025-04-01",
    map: x % 2 === 0 ? "hellas" : "elysium",
    generations: (x % 4) + 5,
  }));

const columnHelper = createColumnHelper<Game>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
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
];

function RouteComponent() {
  return (
    <>
      <Title>UI</Title>
      <div>
        <BlockText>UI Components</BlockText>
        <br />
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
