import React from "react";
import { Headline } from "../Headline";
import { useGame } from "@/hooks/use-placements";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCaption,
  Table,
  TableCell,
} from "../ui/table";
import { MapCell } from "@/Games";
import { Calendar } from "lucide-react";

export function Game({ game }: { game: string }) {
  const { data } = useGame(game, {
    expand: "placements(game),placements(game).player,placements(game).corp",
  });

  if (data === undefined) return <div>Loading...</div>;

  return (
    <div>
      <Headline>Game insights</Headline>

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{data.date.split(" ")[0]}</span>
        </div>
        <MapCell map={data.map} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Place</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Corporation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.expand?.["placements(game)"]
            ?.sort((a, b) => a.placement - b.placement)
            .map((p) => (
              <TableRow key={p.player}>
                <TableCell>{p.placement}.</TableCell>
                <TableCell>{p.expand?.player?.name}</TableCell>
                <TableCell>{p.score}</TableCell>
                <TableCell className="capitalize">
                  {p.expand?.corp?.name}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
