import { useGames, usePlacements, usePlayer } from "@/hooks/use-placements";
import React, { useMemo } from "react";
import { FullLoading, Loading } from "../Loading";
import { Headline } from "../Headline";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { isWin, toElo } from "@/utils";
import groupBy from "just-group-by";
import { CorpTable } from "@/CorpRates";
import { Link } from "@tanstack/react-router";
import { useRatings } from "@/hooks/use-ratings";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpRight,
  Trophy,
} from "lucide-react";
import { TooltipContent } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Game } from "@/conn";
import { Placement } from "@/client/placements";
import { MapCell } from "@/Games";

function Corps({ player }: { player: string }) {
  const { data } = usePlacements({
    expand: "corp",
    filter: "player = '" + player + "'",
  });

  const ratings = useMemo(() => {
    if (data === undefined) return [];

    const games = Object.values(groupBy(data, (d) => d.game))
      .map((p) =>
        p.map((x) => ({
          corp: x.expand?.corp?.id ?? "",
          corpName: x.expand?.corp?.name,
          corpDesc: x.expand?.corp?.description,
          wins: isWin(x.placement, p.length) ? 1 : 0,
          losses: !isWin(x.placement, p.length) ? 1 : 0,
        }))
      )
      .flat();

    const stats = Object.values(groupBy(games, (x) => x.corp))
      .map((gr) => ({
        corp: gr[0].corp,
        corpName: gr[0].corpName,
        corpDesc: gr[0].corpDesc,
        wins: gr.map((o) => o.wins).reduce((a, b) => a + b),
        losses: gr.map((o) => o.losses).reduce((a, b) => a + b),
      }))
      .sort((a, b) => -a.wins + b.wins);

    return stats;
  }, [data]);

  if (data === undefined)
    return (
      <Card className="flex justify-center items-center">
        <Loading />
      </Card>
    );

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Corporations</CardTitle>
      </CardHeader>
      <CardContent>
        <CorpTable ratings={ratings} />
      </CardContent>
    </Card>
  );
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (active && payload && payload.length) {
    console.log(payload);

    return (
      <div className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
        <div className="custom-tooltip">
          <p className="label">{`Elo: ${payload[0].value + 1000}`}</p>
        </div>
      </div>
    );
  }

  return null;
};

function EloChart({ player }: { player: string }) {
  const { ratings, isLoading } = useRatings();

  if (ratings === undefined || isLoading)
    return (
      <div>
        <FullLoading />
      </div>
    );

  const playerRatings = ratings.find((x) => x.playerId == player)!.ratings;
  const chartData = playerRatings.map((x) => ({ elo: toElo(x) - 1000 }));

  return (
    <Card className=" h-[200px] overflow-hidden">
      <CardHeader>
        <CardTitle>Elo</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col space-between grow gap-8">
        <div className="px-6 flex gap-2 items-center">
          <div className="text-4xl">
            {toElo(playerRatings[playerRatings.length - 1])}
          </div>
          {playerRatings.length > 1 && (
            <div>
              {toElo(playerRatings[playerRatings.length - 2]) <
              toElo(playerRatings[playerRatings.length - 1]) ? (
                <ArrowUpRight size={36} className="text-green-700" />
              ) : (
                <ArrowDownRight size={36} className="text-red-700" />
              )}
            </div>
          )}
        </div>
        <ResponsiveContainer className={"grow"} height={60}>
          <AreaChart
            data={chartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="elo"
              stroke="#f97316"
              strokeWidth={2}
              fillOpacity={0.5}
              fill="url(#colorUv)"
              dot={undefined}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function Measure({ label, value }: { label: string; value: number }) {
  return (
    <Card className=" h-[200px] overflow-hidden">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col space-between grow gap-8">
        <div className="px-6 flex gap-2 items-center">
          <div className="text-4xl">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentGamesTables({ placements }: { placements: Placement[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Game</TableHead>
          <TableHead>Map</TableHead>
          <TableHead>Generations</TableHead>
          <TableHead>Placement</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {placements.map((x) => (
          <TableRow key={x.id}>
            <TableCell>
              <Link
                to="/games/$game"
                params={{ game: x.game }}
                className="underline"
              >
                {x.expand?.game?.date.split(" ")[0]}
              </Link>
            </TableCell>
            <TableCell>
              {x.expand?.game?.map && <MapCell map={x.expand?.game?.map} />}
            </TableCell>
            <TableCell>{x.expand?.game?.generations}</TableCell>
            <TableCell>
              <span key={x.player} className="flex items-center">
                <span>
                  {x.placement}. {x.expand?.player?.name}
                </span>
                {/* {isWin(x.placement, placements.length) && (
                      <Trophy className="text-yellow-500 ml-2" size={12} />
                    )} */}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RecentGames({ placements }: { placements: Placement[] }) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Recent games</CardTitle>
      </CardHeader>
      <CardContent className="">
        <RecentGamesTables placements={placements} />
      </CardContent>
    </Card>
  );
}

export function Player({ player }: { player: string }) {
  const { data } = usePlayer(player, {});
  const { ratings, isLoading } = useRatings();
  const { data: placements } = usePlacements({
    filter: `player = '${player}'`,
    expand: "game",
    sort: "-game.date",
  });

  if (
    data === undefined ||
    ratings === undefined ||
    isLoading ||
    placements === undefined
  )
    return (
      <div>
        <FullLoading />
      </div>
    );

  const playerRatings = ratings.find((x) => x.playerId == player)!;

  return (
    <div>
      <div className="mb-8">
        <Headline className="text-sm uppercase text-muted-foreground mb-1 inline-block">
          <Link to="/players">Players</Link>
        </Headline>
        <Headline>{data.name}</Headline>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
          <EloChart player={player} />
          <Measure label="Wins" value={playerRatings.wins} />
          <Measure label="Losses" value={playerRatings.losses} />
        </div>
        <div className="grid xl:grid-cols-2 gap-4">
          <Corps player={player} />
          <RecentGames placements={placements} />
        </div>
      </div>
    </div>
  );
}
