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
import { Calendar, Clock, Info, Trophy } from "lucide-react";
import { isWin } from "@/utils";
import { Link, useRouteContext } from "@tanstack/react-router";
import { FullLoading, Loading } from "../Loading";
import { GridGenerator, Hex, HexUtils, Text } from "react-hexgrid";
import { demoMap, parse } from "@/mapdata";
import { useMemo, useState } from "react";
import { PlayerMarker } from "./PlayerMarker";
import { MapView } from "./MapView";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Placement } from "@/client/placements";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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

function PlacementLink({ p }: { p: Placement }) {
  return (
    <Link
      to="/players/$player"
      params={{
        player: p.player,
      }}
      className="underline"
    >
      <div className="flex gap-2 items-center">
        <PlayerMarker color={p.color} />
        <span>{p.expand?.player?.name}</span>
      </div>
    </Link>
  );
}

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

  const placements = data.expand?.["placements(game)"]?.sort(
    (a, b) => a.placement - b.placement
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

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Final score</CardTitle>
          </CardHeader>
          <CardContent>
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
                {placements?.map((p) => (
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
                        ) && (
                          <Trophy className="text-yellow-500 ml-2" size={14} />
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <PlacementLink p={p}></PlacementLink>
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
          </CardContent>
        </Card>

        {data.expand?.["milestones_unlocked(game)"] && (
          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Milestone</TableHead>
                      <TableHead>Unlocked by (5VP)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.expand?.["milestones_unlocked(game)"]?.map((mu) => {
                      const p = placements?.find((x) => x.player == mu.player);
                      return (
                        <TableRow key={mu.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{mu.expand?.milestone?.name}</span>

                              {mu.expand?.milestone?.note && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info size={16} className="text-gray-300" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: mu.expand?.milestone?.note,
                                      }}
                                    ></div>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {p && <PlacementLink p={p}></PlacementLink>}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {data.expand?.["awards_unlocked(game)"] && (
          <Card>
            <CardHeader>
              <CardTitle>Awards</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Award</TableHead>
                      <TableHead>Unlocked by</TableHead>
                      <TableHead>First (5VP)</TableHead>
                      <TableHead>Second (2VP)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.expand?.["awards_unlocked(game)"]?.map((mu) => {
                      const p = placements?.find((x) => x.player == mu.player);

                      const winners = placements?.filter((x) =>
                        mu.winner.includes(x.player)
                      );
                      const seconds = placements?.filter((x) =>
                        mu.second.includes(x.player)
                      );
                      return (
                        <TableRow key={mu.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{mu.expand?.award?.name}</span>

                              {mu.expand?.award?.note && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info size={16} className="text-gray-300" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: mu.expand?.award?.note,
                                      }}
                                    ></div>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {p && <PlacementLink p={p}></PlacementLink>}
                          </TableCell>
                          <TableCell>
                            <span className="flex flex-col gap-2">
                              {winners &&
                                winners.map((p) => (
                                  <PlacementLink p={p}></PlacementLink>
                                ))}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="flex flex-col gap-2">
                              {seconds &&
                                seconds.map((p) => (
                                  <PlacementLink p={p}></PlacementLink>
                                ))}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
