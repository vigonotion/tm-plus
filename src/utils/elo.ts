import { rate, rating, ordinal, Rating } from "openskill";
import { useQuery } from "@tanstack/react-query";
import { collection } from "../client/conn";
import { Collections, PlacementsResponse } from "../client/types.gen";
import { useMemo } from "react";

/**
 * Player rating information
 */
export interface PlayerRating {
  playerId: string;
  playerName: string | undefined;
  rating: Rating;
  ratings: Rating[];
  wins: number;
  losses: number;
  gamesPlayed: number;
}

/**
 * Placement with expanded data
 */
interface ExpandedPlacement extends PlacementsResponse {
  expand?: {
    player?: {
      id: string;
      name?: string;
    };
    game?: {
      id: string;
      date?: string;
      expand?: {
        "placements(game)"?: PlacementsResponse[];
      };
    };
  };
}

/**
 * Convert an OpenSkill rating to a more familiar ELO-like number
 * @param rating The OpenSkill rating object
 * @returns ELO-like rating number (centered around 1500)
 */
export function toElo(rating: Rating): number {
  return Math.floor(1500 + ordinal(rating) * 10);
}

/**
 * Determine if a placement is considered a win
 * @param placement The player's placement (position)
 * @param totalPlayers Total number of players in the game
 * @returns True if the placement is considered a win
 */
export function isWin(placement: number, totalPlayers: number): boolean {
  return placement === 1 || (totalPlayers === 5 && placement === 2);
}

/**
 * Group an array by a key function
 * @param array The array to group
 * @param keyFn Function to extract the grouping key
 * @returns Object with groups
 */
export function groupBy<T>(
  array: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  return array.reduce<Record<string, T[]>>((result, item) => {
    const key = keyFn(item);
    // Initialize array if it doesn't exist
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {});
}

/**
 * Calculate ratings for all players based on game history
 * @param placements All placements data
 * @param options Configuration options
 * @returns Player ratings information
 */
export function calculateRatings(
  placements: ExpandedPlacement[],
  options: {
    startDate?: string;
    endDate?: string;
    untilGameId?: string;
  } = {},
): PlayerRating[] {
  const { startDate, endDate, untilGameId } = options;

  // Group placements by player
  const playerGroups = groupBy(placements, (d) => d.player);

  // Initialize player ratings
  const players: Record<string, PlayerRating> = Object.fromEntries(
    Object.entries(playerGroups).map(([playerId, playerPlacements]) => {
      const placement = playerPlacements[0];
      return [
        playerId,
        {
          playerId,
          playerName: placement.expand?.player?.name,
          rating: rating(),
          ratings: [rating()],
          wins: 0,
          losses: 0,
          gamesPlayed: 0,
        },
      ];
    }),
  );

  // Group placements by game and sort by date
  const games = Object.values(groupBy(placements, (d) => d.game)).sort(
    (x, y) => {
      const dateX = x[0].expand?.game?.date ?? "";
      const dateY = y[0].expand?.game?.date ?? "";
      return dateX.localeCompare(dateY);
    },
  );

  // Process each game
  for (const gamePlacements of games) {
    const gameDate = gamePlacements[0].expand?.game?.date;

    // Skip games outside the date range
    if (startDate && gameDate && gameDate < startDate) continue;
    if (endDate && gameDate && gameDate > endDate) continue;

    // Calculate new ratings
    const R = rate(
      gamePlacements.map((x) => {
        const player = players[x.player];
        return [player.rating];
      }),
      {
        rank: gamePlacements.map((x) => x.placement),
      },
    );

    // Update player stats
    gamePlacements.forEach((p, i) => {
      const player = players[p.player];
      
      player.gamesPlayed += 1;

      if (isWin(p.placement, gamePlacements.length)) {
        player.wins += 1;
      } else {
        player.losses += 1;
      }

      player.rating = R[i][0];
      player.ratings.push(R[i][0]);
    });

    // Stop if untilGameId is reached
    if (untilGameId && gamePlacements[0].game === untilGameId) {
      break;
    }
  }

  return Object.values(players).sort(
    (a, b) => ordinal(b.rating) - ordinal(a.rating),
  );
}

/**
 * Hook to get player ratings
 * @param options Configuration options
 * @returns Player ratings and loading state
 */
export function useRatings(
  options: {
    startDate?: string;
    endDate?: string;
    untilGameId?: string;
  } = {},
): { ratings: PlayerRating[] | undefined; isLoading: boolean } {
  const { data: placements, isLoading } = useQuery({
    queryKey: ["placements", "ratings", options],
    queryFn: async () => {
      const response = await collection(Collections.Placements, {
        sort: "placement",
        expand: "player,game,game.placements(game)",
      }).queryFn();
      return response as ExpandedPlacement[];
    },
  });

  const ratings = useMemo(() => {
    if (isLoading || !placements) {
      return undefined;
    }

    return calculateRatings(placements, options);
  }, [placements, isLoading, options]);

  return { ratings, isLoading };
}
