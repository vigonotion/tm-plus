import { useGames, usePlacements, usePlayer } from "@/hooks/use-placements";
import React from "react";
import { FullLoading } from "../Loading";
import { Headline } from "../Headline";
import { Link, useRouteContext } from "@tanstack/react-router";
import { useRatings } from "@/hooks/use-ratings";
import { XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowDownLeft, Trophy } from "lucide-react";
import { TooltipContent } from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Game } from "@/conn";
import { RecentGames } from "./RecentGames";
import { Measure } from "./Measure";
import { EloChart } from "./EloChart";
import { Corps } from "./Corps";
import { useQuery } from "@tanstack/react-query";

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
