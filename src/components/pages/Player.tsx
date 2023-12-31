import { useGames, usePlacements, usePlayer } from "@/hooks/use-placements";
import React from "react";
import { FullLoading } from "../Loading";
import { Headline } from "../Headline";
import { Link, useRouteContext } from "@tanstack/react-router";
import { useRatings } from "@/hooks/use-ratings";
import { XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowDownLeft, ArrowRight, Trophy } from "lucide-react";
import { TooltipContent } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Game } from "@/conn";
import { RecentGames } from "./RecentGames";
import { Measure } from "./Measure";
import { EloChart } from "./EloChart";
import { Corps } from "./Corps";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function Player({ player }: { player: string }) {
  const { queryKey, queryFn, options } = useRouteContext({
    from: "/layout/players/$player",
  });
  const { data } = useQuery(queryKey, queryFn, options);

  const { ratings, isLoading } = useRatings();

  const { data: placements } = usePlacements({
    filter: `player = '${data?.id}'`,
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
        <div className="grid sm:grid-cols-2 grid-cols-2 gap-4">
          <Link to={"/wrapped/$player"} params={{ player: player }}>
            <Card className=" h-[200px] overflow-hidden bg-gradient-to-r from-orange-800 to-orange-700 border-none">
              <CardHeader>
                <CardTitle>WRAPPED</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex flex-col space-between grow gap-8">
                <div className="px-6 flex gap-2 items-center">
                  <div className="text-2xl md:text-3xl">
                    <span>Check out your year in rewind</span>
                    <ArrowRight className={"inline-block ml-2"} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

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
