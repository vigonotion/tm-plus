import { useMemo } from "react";
import { rate, rating, ordinal } from "openskill";
import groupBy from "just-group-by";
import { usePlacements } from "./use-placements";
import { isWin, toElo } from "../utils";
import { log } from "console";

export function useRatings() {
  const { isLoading, data, ...other } = usePlacements({
    sort: "placement",
    expand: "player,game",
  });

  const ratings = useMemo(() => {
    if (isLoading || data === undefined) {
      return;
    }

    const players = Object.fromEntries(
      Object.entries(groupBy(data, (d) => d.player)).map((p) => [
        p[0],
        {
          playerId: p[1][0].player,
          playerName: p[1][0].expand?.player?.name,
          rating: rating(),
          ratings: [rating()],
          wins: 0,
          losses: 0,
        },
      ])
    );

    const games = Object.values(groupBy(data, (d) => d.game)).sort(
      (x, y) =>
        x[0].expand?.game?.date.localeCompare(y[0].expand?.game?.date ?? "") ??
        0
    );

    games.forEach((placements) => {
      const R = rate(
        placements.map((x) => [players[x.player].rating]),
        {
          rank: placements.map((x) => x.placement),
        }
      );

      placements.forEach((p, i) => {
        if (isWin(p.placement, placements.length)) {
          players[p.player].wins += 1;
        } else {
          players[p.player].losses += 1;
        }

        players[p.player].rating = R[i][0];
        players[p.player].ratings.push(R[i][0]);
      });
    });

    return Object.values(players).sort(
      (a, b) => ordinal(b.rating) - ordinal(a.rating)
    );
  }, [data, isLoading]);

  return { ratings, isLoading, ...other };
}
