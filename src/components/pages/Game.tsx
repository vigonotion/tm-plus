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
import {
  ArrowUpRightFromCircle,
  Award,
  Calendar,
  Clock,
  Hexagon,
  Info,
  RectangleVertical,
  Rocket,
  Trophy,
} from "lucide-react";
import { isWin } from "@/utils";
import { Link, useRouteContext } from "@tanstack/react-router";
import { FullLoading, Loading } from "../Loading";
import { GridGenerator, Hex, HexUtils, Text } from "react-hexgrid";
import { Owner, demoMap, parse } from "@/mapdata";
import { useMemo, useState } from "react";
import { PlayerMarker } from "./PlayerMarker";
import { MapView } from "./MapView";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Placement } from "@/client/placements";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { mapScore } from "@/utils/mapscore";
import { ResponsiveContainer, Sankey } from "recharts";
import { SankeyNode } from "recharts/types/util/types";

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

function colorToOwner(color: string) {
  return {
    red: Owner.Red,
    green: Owner.Green,
    blue: Owner.Blue,
    yellow: Owner.Yellow,
    black: Owner.Black,
  }[color];
}

const nameToColor: Record<string, string> = {
  TW: "rgb(249, 115, 22)",
  Awards: "rgb(202, 138, 4)",
  Milestones: "rgb(202, 138, 4)",
  "A+M": "rgb(249, 115, 22)",
  Greeneries: "rgb(21, 128, 61)",
  Cities: "rgb(250, 250, 249)",
  "G+C": "rgb(249, 115, 22)",
  Cards: "rgb(59, 130, 246)",
  ALL: "rgb(249, 115, 22)",
};

function SankeyNodeC(
  props: SankeyNode & {
    width: number;
    height: number;
    payload: { name: string; value: number };
  }
) {
  return props.payload.value > 0 ? (
    <rect
      x={props.x + 2}
      y={props.y - 2}
      width={props.width - 4}
      height={props.height + 4}
      fill={nameToColor[props.payload.name]} // colors[props.payload.depth % colors.length]
      rx={2.5}
    />
  ) : null;
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

  const map_score = useMemo(
    () => data?.map_state && mapScore(parse(data.map_state)),
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
        <Card className="xl:col-span-2">
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
                {placements?.map((p) => {
                  const owner = p.color && colorToOwner(p.color);

                  const scoreTw = p.tw >= 20 ? p.tw : 0;
                  const scoreCities =
                    map_score && owner ? map_score[owner].cities : -1;
                  const scoreGreenery =
                    map_score && owner ? map_score[owner].greenery : -1;
                  const scoreMile = data.expand?.["milestones_unlocked(game)"]
                    ? data.expand?.["milestones_unlocked(game)"].filter(
                        (x) => x.player == p.player
                      ).length * 5
                    : -1;
                  const scoreAwards = data.expand?.["awards_unlocked(game)"]
                    ? data.expand?.["awards_unlocked(game)"].filter((x) =>
                        x.winner.includes(p.player)
                      ).length *
                        5 +
                      data.expand?.["awards_unlocked(game)"].filter((x) =>
                        x.second.includes(p.player)
                      ).length *
                        2
                    : -1;

                  const scoreCards =
                    p.score -
                    scoreTw -
                    scoreCities -
                    scoreGreenery -
                    scoreMile -
                    scoreAwards;

                  const scoreReady =
                    (data.expand?.["milestones_unlocked(game)"] &&
                      data.expand?.["awards_unlocked(game)"] &&
                      scoreTw +
                        scoreCities +
                        scoreGreenery +
                        scoreMile +
                        scoreAwards +
                        scoreCards ===
                        p.score) ??
                    false;

                  const scorings = (
                    <div className="flex gap-4">
                      <span>{p.score}</span>
                      {scoreTw > 0 && (
                        <span className="flex gap-2 items-center">
                          <ArrowUpRightFromCircle
                            size={16}
                            className="text-orange-500"
                          />
                          <span>{scoreTw}</span>
                        </span>
                      )}
                      {data.expand?.["awards_unlocked(game)"] && (
                        <span className="flex gap-2 items-center">
                          <Award size={16} className="text-yellow-600" />{" "}
                          <span>{scoreAwards}</span>
                        </span>
                      )}
                      {data.expand?.["milestones_unlocked(game)"] && (
                        <span className="flex gap-2 items-center">
                          <Rocket size={16} className="text-yellow-700" />{" "}
                          <span>{scoreMile}</span>
                        </span>
                      )}
                      {scoreCities >= 0 && scoreGreenery >= 0 && (
                        <>
                          <span className="flex gap-2 items-center">
                            <Hexagon size={16} /> <span>{scoreCities}</span>
                          </span>
                          <span className="flex gap-2 items-center">
                            <Hexagon size={16} className="text-green-700" />{" "}
                            <span>{scoreGreenery}</span>
                          </span>
                        </>
                      )}
                      {scoreCards >= 0 && scoreTw > 0 && (
                        <span className="flex gap-2 items-center">
                          <RectangleVertical
                            size={16}
                            className="text-blue-500"
                          />
                          <span>{scoreCards}</span>
                        </span>
                      )}
                    </div>
                  );
                  return (
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
                            <Trophy
                              className="text-yellow-500 ml-2"
                              size={14}
                            />
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <PlacementLink p={p}></PlacementLink>
                      </TableCell>
                      <TableCell>
                        {scoreReady ? (
                          <Tooltip>
                            <TooltipTrigger>{scorings}</TooltipTrigger>
                            <TooltipContent>
                              <Sankey
                                nodeWidth={10}
                                nodePadding={60}
                                height={400}
                                width={600}
                                sort={false}
                                node={SankeyNodeC as unknown as SankeyNode}
                                data={{
                                  nodes: [
                                    { name: "TW" }, //0
                                    { name: "Awards" }, //1
                                    { name: "Milestones" }, //2
                                    { name: "A+M" }, //3
                                    { name: "Greeneries" }, //4
                                    { name: "Cities" }, //5
                                    { name: "G+C" }, //6
                                    { name: "Cards" }, //7
                                    { name: "ALL" }, //8
                                  ],
                                  links: [
                                    { source: 0, target: 8, value: scoreTw },
                                    {
                                      source: 1,
                                      target: 3,
                                      value: scoreAwards,
                                    },
                                    { source: 2, target: 3, value: scoreMile },
                                    {
                                      source: 3,
                                      target: 8,
                                      value: scoreAwards + scoreMile,
                                    },
                                    {
                                      source: 4,
                                      target: 6,
                                      value: scoreGreenery,
                                    },
                                    {
                                      source: 5,
                                      target: 6,
                                      value: scoreCities,
                                    },
                                    {
                                      source: 6,
                                      target: 8,
                                      value: scoreCities + scoreGreenery,
                                    },
                                    { source: 7, target: 8, value: scoreCards },
                                  ].filter((l) => l.value !== 0),
                                }}
                              />
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <>{scorings}</>
                        )}
                      </TableCell>
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
                  );
                })}
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
