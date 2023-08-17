import { Headline } from "../Headline";
import { useGame } from "@/hooks/use-placements";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCaption,
  Table,
  TableCell,
} from "../ui/table";
import { MapCell } from "@/Games";
import { Calendar, Trophy } from "lucide-react";
import { isWin } from "@/utils";
import { Link } from "@tanstack/react-router";
import {
  GridGenerator,
  Hex,
  HexGrid,
  HexUtils,
  Hexagon,
  Layout,
} from "react-hexgrid";

function stylesForColor(color: string) {
  return "bg-" + color + "-600";
}

function PlayerMarker({ color }: { color?: string }) {
  if (color === "red")
    return <div className="bg-red-700 w-4 h-4 rounded"></div>;
  if (color === "green")
    return <div className="bg-green-700 w-4 h-4 rounded"></div>;
  if (color === "blue")
    return <div className="bg-blue-700 w-4 h-4 rounded"></div>;
  if (color === "yellow")
    return <div className="bg-yellow-700 w-4 h-4 rounded"></div>;
  if (color === "black")
    return <div className="bg-gray-400 w-4 h-4 rounded"></div>;

  return <div className="border border-white w-4 h-4 rounded"></div>;
}

const hexagons = GridGenerator.hexagon(4);

export function Game({ game }: { game: string }) {
  const { data } = useGame(game, {
    expand: "placements(game),placements(game).player,placements(game).corp",
  });

  if (data === undefined) return <div>Loading...</div>;

  return (
    <div>
      <Headline>Game insights</Headline>

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{data.date.split(" ")[0]}</span>
        </div>
        <MapCell map={data.map} />
      </div>

      <div className="mb-8">
        <HexGrid width={500} height={500}>
          <Layout
            size={{ x: 6, y: 6 }}
            flat={false}
            spacing={1.05}
            origin={{ x: 0, y: 0 }}
          >
            {
              // note: key must be unique between re-renders.
              // using config.mapProps+i makes a new key when the goal template chnages.
              hexagons.map((hex, i) => (
                <Hexagon
                  key={i}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  className="text-stone-900 fill-current"
                >
                  <span>{HexUtils.getID(hex)}</span>
                </Hexagon>
              ))
            }
          </Layout>
        </HexGrid>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Place</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Corporation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.expand?.["placements(game)"]
            ?.sort((a, b) => a.placement - b.placement)
            .map((p) => (
              <TableRow key={p.player}>
                <TableCell>
                  <span className="flex items-center">
                    <span>{p.placement}.</span>
                    {isWin(
                      p.placement,
                      data.expand?.["placements(game)"]?.length ?? 1
                    ) && <Trophy className="text-yellow-500 ml-2" size={14} />}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <PlayerMarker color={p.color} />
                    <span>{p.expand?.player?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{p.score}</TableCell>
                <TableCell className="capitalize">
                  {p.corp && (
                    <Link
                      className="underline"
                      to="/corporations/$corp"
                      params={{ corp: p.corp }}
                    >
                      {p.expand?.corp?.name}
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
