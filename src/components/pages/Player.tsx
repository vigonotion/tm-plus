import { usePlacements, usePlayer } from "@/hooks/use-placements";
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

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
    <Card>
      <CardHeader>
        <CardTitle>Corporations</CardTitle>
      </CardHeader>
      <CardContent>
        <CorpTable ratings={ratings} />
      </CardContent>
    </Card>
  );
}

function EloChart({ player }: { player: string }) {
  const { ratings, isLoading } = useRatings();

  if (ratings === undefined || isLoading)
    return (
      <div>
        <FullLoading />
      </div>
    );

  const playerRatings = ratings.find((x) => x.playerId == player)!.ratings;
  const chartData = playerRatings.map((x) => ({ elo: toElo(x) }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Elo</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="elo"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return <div>{toElo(ratings.find((x) => x.playerId == player)!.rating)}</div>;
}

export function Player({ player }: { player: string }) {
  const { data } = usePlayer(player, {});

  if (data === undefined)
    return (
      <div>
        <FullLoading />
      </div>
    );

  return (
    <div>
      <div className="mb-8">
        <Headline className="text-sm uppercase text-muted-foreground mb-1 inline-block">
          <Link to="/players">Players</Link>
        </Headline>
        <Headline>{data.name}</Headline>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EloChart player={player} />
        <Corps player={player} />
      </div>
    </div>
  );
}
