import React, { useMemo, useState } from "react";
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
import { Button } from "@/components/ui/button.tsx";
import { ArrowDownAZ } from "lucide-react";
import {
  SortButton,
  SortButtonDirection,
} from "@/components/ui/sortbutton.tsx";
import Enumerable from "linq";

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
  const [sort, setSort] = useState<number | null>(null);

  const [group, setGroup] = useState<Group | undefined>(undefined);

  const list =
    group === undefined
      ? ratings
      : ratings?.filter((x) => group.players.includes(x.playerId));

  function handleSort(direction: SortButtonDirection, column: number) {
    if (direction === "asc") {
      setSort(column);
    } else if (direction === "desc") {
      setSort(-column);
    } else {
      setSort(null);
    }
  }

  function getValue(column: number): SortButtonDirection {
    if (sort === column) {
      return "asc";
    }

    if (sort === -column) {
      return "desc";
    }

    return "none";
  }

  const sortedList = useMemo(() => {
    if (list === undefined) return [];

    const column = sort ? Math.abs(sort) : null;
    let enumerable = Enumerable.from(list);

    if (column === 1) {
      enumerable = enumerable.orderBy((x) => x.playerName);
    } else if (column === 2) {
      enumerable = enumerable.orderBy((x) => toElo(x.rating));
    } else if (column === 3) {
      enumerable = enumerable.orderBy((x) => x.wins);
    } else if (column === 4) {
      enumerable = enumerable.orderBy((x) => x.losses);
    } else if (column === 5) {
      enumerable = enumerable.orderBy((x) => x.wins / (x.wins + x.losses));
    } else if (column === 6) {
      enumerable = enumerable.orderBy((x) => x.wins + x.losses);
    } else {
      return enumerable.toArray();
    }

    if (sort && sort > 0) return enumerable.toArray();

    return enumerable.reverse().toArray();
  }, [list, sort]);

  if (isLoading || ratings === undefined) {
    return (
      <div>
        <FullLoading />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Headline>Players</Headline>
        <GroupSelector value={group} onChange={setGroup} />
      </div>

      <div className="text-muted-foreground mb-8">
        Check out your{" "}
        <span className="font-head uppercase text-sm text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
          Terraforming Mars WRAPPED
        </span>{" "}
        by clicking on your name.
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton
                value={getValue(1)}
                onChange={(nextDirection) => handleSort(nextDirection, 1)}
              >
                Player
              </SortButton>
            </TableHead>
            <TableHead>
              <SortButton
                value={getValue(2)}
                onChange={(nextDirection) => handleSort(nextDirection, 2)}
                variant={"numeric"}
              >
                Elo
              </SortButton>
            </TableHead>
            <TableHead>
              <SortButton
                value={getValue(3)}
                onChange={(nextDirection) => handleSort(nextDirection, 3)}
                variant={"numeric"}
              >
                Wins
              </SortButton>
            </TableHead>
            <TableHead>
              <SortButton
                value={getValue(4)}
                onChange={(nextDirection) => handleSort(nextDirection, 4)}
                variant={"numeric"}
              >
                Losses
              </SortButton>
            </TableHead>
            <TableHead>
              <SortButton
                value={getValue(5)}
                onChange={(nextDirection) => handleSort(nextDirection, 5)}
                variant={"numeric"}
              >
                Winrate
              </SortButton>
            </TableHead>
            <TableHead>
              <SortButton
                value={getValue(6)}
                onChange={(nextDirection) => handleSort(nextDirection, 6)}
                variant={"numeric"}
              >
                Total
              </SortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedList.map((r) => {
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
