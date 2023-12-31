import { usePlacements } from "@/hooks/use-placements";
import React, { useMemo } from "react";
import { Loading } from "../Loading";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { isWin } from "@/utils";
import groupBy from "just-group-by";
import { CorpTable } from "@/CorpRates";

export function Corps({ player }: { player: string }) {
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
