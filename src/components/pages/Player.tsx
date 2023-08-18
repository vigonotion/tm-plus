import { usePlayer } from "@/hooks/use-placements";
import React from "react";
import { FullLoading } from "../Loading";
import { Headline } from "../Headline";

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
      <Headline className="text-sm uppercase text-muted-foreground mb-1">
        Player
      </Headline>
      <Headline>{data.name}</Headline>
    </div>
  );
}
