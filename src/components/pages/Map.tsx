import React from "react";
import { Headline } from "../Headline";
import { Link } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RecentGamesTable } from "@/Games";
import { useGames } from "@/hooks/use-placements";
import { FullLoading } from "../Loading";
import { Measure } from "./Measure";

export function MapPage({ map }: { map: string }) {
  const { isLoading, data } = useGames({
    sort: "-date",
    expand: "placements(game),placements(game).player",
    filter: `map = '${map}'`,
  });

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
          <Link to="/">Maps</Link>
        </Headline>
        <Headline className="capitalize">{map}</Headline>

        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
          <Measure label="Games" value={data.length} />
          <Measure
            label="Ø Generations"
            value={
              Math.round(
                (data.map((x) => x.generations).reduce((p, c) => p + c) /
                  data.length) *
                  10
              ) / 10
            }
          />
        </div>

        <Headline className="text-xl mt-8">Recent games</Headline>

        <RecentGamesTable data={data} showMapColumn={false} />
      </div>
    </div>
  );
}
