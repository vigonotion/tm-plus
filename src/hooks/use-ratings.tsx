import { useQuery } from "react-query";
import { Placement } from "../client/placements";
import { conn } from "../conn";
import { useId, useMemo } from "react";
import { rate, rating, ordinal } from "openskill";
import groupBy from "just-group-by";

function isWin(placement: number, players: number) {
    if(players == 5)
    {
        return placement <= 2;
    }

    return placement == 1;
}

export function useRatings() {
    const cancelKey = useId();

    const { isLoading, data, ...other } = useQuery(["placements+game"], () =>
        conn.collection("placements").getFullList<Placement>({
            sort: "placement",
            expand: "player,game",
            $cancelKey: cancelKey
        })
    );

    const ratings = useMemo(() => {

        if(isLoading || data === undefined) {
            return;
        }

        const players = Object.fromEntries(Object.entries(groupBy(data, (d) => d.player)).map((p) => ([p[0], {
            playerId: p[1][0].player,
            playerName: p[1][0].expand?.player?.name,
            rating: rating(),
            wins: 0,
            losses: 0
        }])));

        const games = Object.values(groupBy(data, (d => d.game))).sort((x, y) => x[0].expand?.game?.date.localeCompare(y[0].expand?.game?.date ?? "") ?? 0);

        games.forEach(placements => {
            const R = rate(placements.map(x => [players[x.player].rating]), {
                rank: placements.map(x => x.placement)
            })


            placements.forEach((p, i) => {
                if(isWin(p.placement, placements.length)) {
                    players[p.player].wins += 1;
                } else {
                    players[p.player].losses += 1;
                }

                players[p.player].rating = R[i][0];
            });
        });

        return Object.values(players).map(p => ({...p, rating: Math.floor(1500 + (ordinal(p.rating) * 10))})).sort((a, b) => b.rating - a.rating);

    }, [data, isLoading]);

    return { ratings, isLoading, ...other };
}