import React from "react";
import { useRatings } from "./hooks/use-ratings";
import { ordinal } from "openskill";
import { Headline } from "./components/Headline";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./components/ui/table";

function Ratings() {
  const { ratings, isLoading } = useRatings();

  if (isLoading || ratings === undefined) {
    return <div>loading ratings...</div>;
  }

  return (
    <div>
      <Headline>Ratings</Headline>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Elo</TableHead>
            <TableHead>Wins</TableHead>
            <TableHead>Losses</TableHead>
            <TableHead>Winrate</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ratings.map((r) => {
            const total = r.wins + r.losses;

            return (
              <TableRow key={r.playerId}>
                {/* {r.playerName}: {r.rating} ({r.wins} wins / {r.losses} losses,
                winrate {Math.round((r.wins / total) * 100)} %, {total} total) */}
                <TableCell>{r.playerName}</TableCell>
                <TableCell>{r.rating}</TableCell>
                <TableCell>{r.wins}</TableCell>
                <TableCell>{r.losses}</TableCell>
                <TableCell>{Math.round((r.wins / total) * 100)} %</TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Ratings;
