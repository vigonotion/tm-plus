import React, {useMemo, useState} from "react";
import { usePlacements } from "./hooks/use-placements";
import groupBy from "just-group-by";
import {isWin, toElo} from "./utils";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { FullLoading } from "./components/Loading";
import {SortButton, SortButtonDirection} from "@/components/ui/sortbutton.tsx";
import Enumerable from "linq";

function CorpRates() {
  const { isLoading, data } = usePlacements({
    expand: "corp",
  });


  const ratings = useMemo(() => {
    if (data === undefined) return [];

    // only includes games that have corp information for all placements
    const games = Object.values(groupBy(data, (d) => d.game))
      .filter((x) => x.every((p) => p.corp !== ""))
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

  if (isLoading) {
    return <FullLoading />;
  }

  return (
    <div>
      <Headline>Corporations</Headline>

      <CorpTable ratings={ratings} />
    </div>
  );
}

export default CorpRates;

export type CorpRating = {
  corp: string;
  corpName: string | undefined;
  corpDesc: string | undefined;
  wins: number;
  losses: number;
};

export function CorpTable({ ratings }: { ratings: CorpRating[] }) {

    const [sort, setSort] = useState<number | null>(null);

    function handleSort(direction: SortButtonDirection, column: number) {
        if(direction === "asc")
        {
            setSort(column);
        }
        else if(direction === "desc")
        {
            setSort(-column);
        }
        else {
            setSort(null);
        }
    }

    function getValue(column: number): SortButtonDirection
    {
        if(sort === column)
        {
            return "asc";
        }

        if(sort === -column)
        {
            return "desc"
        }

        return "none"
    }

    const sortedRatings = useMemo(() => {
        if(ratings === undefined) return [];

        const column = sort ? Math.abs(sort) : null;
        let enumerable = Enumerable.from(ratings);

        if(column === 1) {
            enumerable = enumerable.orderBy(x => x.corp);
        }
        else if(column === 2) {
            enumerable = enumerable.orderBy(x => x.wins);
        }
        else if(column === 3) {
            enumerable = enumerable.orderBy(x => x.losses);
        }
        else if(column === 4) {
            enumerable = enumerable.orderBy(x => (x.wins / (x.wins + x.losses)));
        }
        else if(column === 5) {
            enumerable = enumerable.orderBy(x => x.wins + x.losses);
        }
        else {
            return enumerable.toArray();
        }

        if(sort && sort > 0) return enumerable.toArray();

        return enumerable.reverse().toArray();
    }, [ratings, sort]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
              <SortButton value={getValue(1)} onChange={(nextDirection) => handleSort(nextDirection, 1)}>Corporation</SortButton>
          </TableHead>
          <TableHead>
              <SortButton value={getValue(2)} onChange={(nextDirection) => handleSort(nextDirection, 2)} variant={"numeric"}>Wins</SortButton>
          </TableHead>
          <TableHead>
              <SortButton value={getValue(3)} onChange={(nextDirection) => handleSort(nextDirection, 3)} variant={"numeric"}>Losses</SortButton>
          </TableHead>
          <TableHead>
              <SortButton value={getValue(4)} onChange={(nextDirection) => handleSort(nextDirection, 4)} variant={"numeric"}>Winrate</SortButton>
          </TableHead>
          <TableHead>
              <SortButton value={getValue(5)} onChange={(nextDirection) => handleSort(nextDirection, 5)} variant={"numeric"}>Total</SortButton>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedRatings.map((r) => {
          const total = r.wins + r.losses;
          return (
            <TableRow key={r.corp}>
              <TableCell>
                <span className="flex items-center gap-2">
                  <Link
                    className="underline"
                    to="/corporations/$corp"
                    params={{ corp: r.corp }}
                  >
                    <span className="capitalize">{r.corpName}</span>
                  </Link>
                  {r.corpDesc && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={16} className="text-gray-300" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div
                          dangerouslySetInnerHTML={{ __html: r.corpDesc }}
                        ></div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </span>
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
  );
}
