import React from "react";
import { FullLoading } from "../Loading";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toElo } from "@/utils";
import { useRatings } from "@/hooks/use-ratings";
import { Tooltip, Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CustomTooltip } from "./CustomTooltip";

export function EloChart({ player }: { player: string }) {
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
