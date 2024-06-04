import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Placement } from "@/client/placements";
import { MapCell } from "@/Games";

export function RecentGamesTables({ placements }: { placements: Placement[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Game</TableHead>
          <TableHead>Map</TableHead>
          <TableHead>Generations</TableHead>
          <TableHead>Placement</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {placements.map((x) => (
          <TableRow key={x.id}>
            <TableCell>
              <Link
                to="/games/$game"
                params={{ game: x.game }}
                className="underline"
              >
                {x.expand?.game?.date.split(" ")[0]}
              </Link>
            </TableCell>
            <TableCell>
              {x.expand?.game?.map && <MapCell map={x.expand?.game?.map} />}
            </TableCell>
            <TableCell>{x.expand?.game?.generations}</TableCell>
            <TableCell>
              <span key={x.player} className="flex items-center">
                <span>


                    <Link
                        to="/players/$player"
                        params={{ player: x.expand?.player?.id || "" }}
                        className="underline"
                    >
                    {x.placement}. {x.expand?.player?.name}
                  </Link>

                </span>
                {/* {isWin(x.placement, placements.length) && (
                          <Trophy className="text-yellow-500 ml-2" size={12} />
                        )} */}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
