import { usePlacements, usePlayer } from "@/hooks/use-placements";
import React, { useMemo } from "react";
import { FullLoading, Loading } from "../Loading";
import { Headline } from "../Headline";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { isWin } from "@/utils";
import groupBy from "just-group-by";
import { CorpTable } from "@/CorpRates";
import { Link } from "@tanstack/react-router";

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
      <Headline className="text-sm uppercase text-muted-foreground mb-1 inline-block">
        <Link to="/players">Players</Link>
      </Headline>
      <Headline>{data.name}</Headline>

      <div className="grid">
        <Corps player={player} />
      </div>
    </div>
  );
}
