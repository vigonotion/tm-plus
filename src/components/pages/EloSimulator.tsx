import React, { useMemo } from "react";
import { Headline } from "../Headline";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "../ui/table";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useList } from "@uidotdev/usehooks";
import { rate, rating } from "openskill";
import { toElo } from "@/utils";
import { Button } from "../ui/button";
import { ArrowUpRightFromCircle, RotateCcw } from "lucide-react";

const initial = [1, 2, 3, 4, 5].map((x) => ({
  placement: x,
  rating: rating(),
}));

export function EloSimulator() {
  const [ratings, { updateAt, set }] = useList(initial);

  const newElos = useMemo(() => {
    const rated = rate(
      ratings.map((r) => [r.rating]),
      {
        rank: ratings.map((r) => r.placement),
      }
    );
    return rated.map((x) => x[0]);
  }, [ratings]);

  function handleReset(): void {
    set(initial);
  }

  function handleCommit(): void {
    set(ratings.map((r, i) => ({ ...r, rating: newElos[i] })));
  }

  return (
    <div>
      <Headline>Elo simulator</Headline>
      <div className="text-muted-foreground mb-8">
        Try out how the elo algorithm works and how your elo changes.
      </div>

      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Mu</TableHead>
            <TableHead>Sigma</TableHead>
            <TableHead>Initial elo</TableHead>
            <TableHead>Placement</TableHead>
            <TableHead>New elo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ratings.map((rr, i) => {
            const newElo = rating();
            return (
              <TableRow key={i}>
                <TableCell>
                  <Input
                    value={rr.rating.mu}
                    onChange={(x) =>
                      updateAt(i, {
                        ...rr,
                        rating: { ...rr.rating, mu: parseInt(x.target.value) },
                      })
                    }
                    className="w-32"
                    type="number"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={rr.rating.sigma}
                    onChange={(x) =>
                      updateAt(i, {
                        ...rr,
                        rating: {
                          ...rr.rating,
                          sigma: parseInt(x.target.value),
                        },
                      })
                    }
                    className="w-32"
                    type="number"
                  />
                </TableCell>
                <TableCell>{toElo(rr.rating)}</TableCell>
                <TableCell>
                  <Select
                    value={rr.placement.toString()}
                    onValueChange={(v) =>
                      updateAt(i, { ...rr, placement: parseInt(v) })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4", "5", "Disabled"].map((p) => (
                        <SelectItem value={p.toString()}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{toElo(newElos[i])}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="mt-8 flex gap-2">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw size={14} className="mr-2" /> <span>Reset</span>
        </Button>

        <Button variant="outline" onClick={handleCommit}>
          <ArrowUpRightFromCircle size={14} className="mr-2" />{" "}
          <span>Use new elos as initial</span>
        </Button>
      </div>
    </div>
  );
}
