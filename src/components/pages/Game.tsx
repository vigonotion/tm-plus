import { Headline } from "../Headline";
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
import { Calendar, Clock, Trophy } from "lucide-react";
import { isWin } from "@/utils";
import { Link, useRouteContext } from "@tanstack/react-router";
import { FullLoading, Loading } from "../Loading";
import { GridGenerator, Hex, HexUtils, Text } from "react-hexgrid";
import { demoMap, parse } from "@/mapdata";
import { useMemo, useState } from "react";
import { PlayerMarker } from "./PlayerMarker";
import { MapView } from "./MapView";
import { useQuery } from "@tanstack/react-query";

export const hexagons: Hex[] = GridGenerator.hexagon(4).sort((a, b) => {
  if (a.r == b.r) {
    if (a.q == b.q) {
      return a.s - b.s;
    }

    return a.q - b.q;
  }

  return a.r - b.r;
});
export const scale = 1.1;

export function Game() {
  const { queryKey, queryFn, options } = useRouteContext({
    from: "/games/$game",
  });
  const { data } = useQuery(queryKey, queryFn, options);

  const map_state = useMemo(
    () => data?.map_state && parse(data.map_state),
    [data?.map_state]
  );

  const [hovered, setHovered] = useState<string | undefined>(undefined);

  if (data === undefined)
    return (
      <div>
        <FullLoading />
      </div>
    );

  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row">
        <div>
          <div className="mb-8">
            <Headline className="text-sm uppercase text-muted-foreground mb-1 inline-block">
              <Link to="/">Games</Link>
            </Headline>
            <Headline>{data.date.split(" ")[0]}</Headline>
          </div>
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{data.date.split(" ")[0]}</span>
            </div>
            {!!(data.duration_in_minutes && data.duration_in_minutes > 0) && (
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{data.duration_in_minutes} min</span>
              </div>
            )}
            <MapCell map={data.map} />
          </div>
        </div>
        {map_state && (
          <div className="mb-8">
            <MapView hovered={hovered} map={map_state} />
          </div>
        )}
      </div>

      <Table onPointerLeave={() => setHovered(undefined)}>
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
              <TableRow
                key={p.player}
                onPointerEnter={() => setHovered(p.color)}
              >
                <TableCell>
                  <span className="flex items-center">
                    <span>{p.placement}.</span>
                    {isWin(
                      p.placement,
                      data.expand?.["placements(game)"]?.length ?? 1
                    ) && <Trophy className="text-yellow-500 ml-2" size={14} />}
                  </span>
                </TableCell>
                <TableCell>
                  {" "}
                  <Link
                    to="/players/$player"
                    params={{ player: p.player }}
                    className="underline"
                  >
                    <div className="flex gap-2 items-center">
                      <PlayerMarker color={p.color} />
                      <span>{p.expand?.player?.name}</span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{p.score}</TableCell>
                <TableCell className="capitalize">
                  {p.corp && (
                    <Link
                      className="underline"
                      to="/corporations/$corp"
                      params={{ corp: p.corp }}
                    >
                      {p.expand?.corp?.name}
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
