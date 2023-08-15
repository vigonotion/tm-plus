import React, { useMemo } from "react";
import { usePlacements } from "./hooks/use-placements";
import groupBy from "just-group-by";
import { isWin } from "./utils";
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

  return (
    <div>
      <Headline>Corporations</Headline>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Corporation</TableHead>
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
              <TableRow key={r.corp}>
                <TableCell>
                  <span className="flex items-center gap-2">
                    {r.corpName}{" "}
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
    </div>
  );
}

export default CorpRates;
