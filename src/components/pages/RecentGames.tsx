import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Placement } from "@/client/placements";
import { RecentGamesTables } from "./RecentGamesTables";

export function RecentGames({ placements }: { placements: Placement[] }) {
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
