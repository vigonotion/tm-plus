import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useGroups } from "./hooks/use-placements";
import { Group } from "./conn";
import { FullLoading } from "./components/Loading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import { toElo } from "./utils";

function GroupSelector({
  onChange,
  value,
}: {
  onChange: (value: Group | undefined) => void;
  value?: Group;
}) {
  const { data } = useGroups({});

  return (
    <Select
      onValueChange={(v) => onChange(data?.find((x) => x.id == v))}
      value={value?.id}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All</SelectItem>
        {data &&
          data.map((g) => (
            <SelectItem value={g.id} key={g.id}>
              {g.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

function Ratings() {
  const { ratings, isLoading } = useRatings();

  const [group, setGroup] = useState<Group | undefined>(undefined);

  if (isLoading || ratings === undefined) {
    return (
      <div>
        <FullLoading />
      </div>
    );
  }

  const list =
    group === undefined
      ? ratings
      : ratings.filter((x) => group.players.includes(x.playerId));

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Headline>Players</Headline>
        <GroupSelector value={group} onChange={setGroup} />
      </div>

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
          {list.map((r) => {
            const total = r.wins + r.losses;

            return (
              <TableRow key={r.playerId}>
                {/* {r.playerName}: {r.rating} ({r.wins} wins / {r.losses} losses,
                winrate {Math.round((r.wins / total) * 100)} %, {total} total) */}
                <TableCell>
                  {" "}
                  <Link
                    to="/players/$player"
                    params={{ player: r.playerId }}
                    className="underline"
                  >
                    {r.playerName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      <span>{toElo(r.rating)}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex flex-col gap-2">
                        <span>mu: {r.rating.mu}</span>
                        <span>sigma: {r.rating.sigma}</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
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
