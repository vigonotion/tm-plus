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
import { Calendar, Clock, Trophy } from "lucide-react";
import { isWin } from "@/utils";
import { Link } from "@tanstack/react-router";
import { FullLoading, Loading } from "../Loading";
import {
  GridGenerator,
  Hex,
  HexGrid,
  HexUtils,
  Hexagon,
  Layout,
  Text,
} from "react-hexgrid";
import { Owner, TileType, demoMap } from "@/mapdata";
import { useState } from "react";

function PlayerMarker({ color }: { color?: string }) {
  if (color === "red")
    return <div className="bg-red-700 w-4 h-4 rounded"></div>;
  if (color === "green")
    return <div className="bg-green-700 w-4 h-4 rounded"></div>;
  if (color === "blue")
    return <div className="bg-blue-700 w-4 h-4 rounded"></div>;
  if (color === "yellow")
    return <div className="bg-yellow-600 w-4 h-4 rounded"></div>;
  if (color === "black")
    return <div className="bg-gray-400 w-4 h-4 rounded"></div>;

  return <div className="border border-white w-4 h-4 rounded"></div>;
}

function PlayerMarkerG({ color }: { color?: string }) {
  if (color === "red")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-red-700"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );
  if (color === "green")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-green-700"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );
  if (color === "blue")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-blue-700"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );
  if (color === "yellow")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-yellow-600"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );
  if (color === "black")
    return (
      <g
        transform="scale(.005) translate(-230,-230)"
        className="fill-current text-gray-400"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );

  return null;
}

const hexagons = GridGenerator.hexagon(4).sort((a, b) => {
  if (a.r == b.r) {
    if (a.q == b.q) {
      return a.s - b.s;
    }

    return a.q - b.q;
  }

  return a.r - b.r;
});

export function Game({ game }: { game: string }) {
  const { data } = useGame(game, {
    expand: "placements(game),placements(game).player,placements(game).corp",
  });

  const [hovered, setHovered] = useState<string | undefined>("blue");

  if (data === undefined)
    return (
      <div>
        <FullLoading />
      </div>
    );

  return (
    <div>
      <Headline>Game insights</Headline>

      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{data.date.split(" ")[0]}</span>
        </div>
        {!!(data.duration_in_minutes && data.duration_in_minutes > 0) && (
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{data.duration_in_minutes} min</span>
          </div>
        )}

        <MapCell map={data.map} />
      </div>

      <div className="mb-8">
        <HexGrid width={500} height={500}>
          <Layout
            size={{ x: 5, y: 5 }}
            flat={false}
            spacing={1.2}
            origin={{ x: 0, y: 0 }}
          >
            {
              // note: key must be unique between re-renders.
              // using config.mapProps+i makes a new key when the goal template chnages.
              hexagons.map((hex, i) => {
                // const border =
                //   i % 6 == 0
                //     ? "stroke-gray-500"
                //     : i % 4 == 0
                //     ? "stroke-green-500"
                //     : i % 2 == 0
                //     ? "stroke-blue-500"
                //     : "stroke-stone-900";

                const border = {
                  [TileType.Empty]: "stroke-stone-900",
                  [TileType.Ocean]: "stroke-blue-500",
                  [TileType.Greenery]: "stroke-green-500",
                  [TileType.City]: "stroke-gray-500",
                  [TileType.Other]: "stroke-yellow-500",
                }[demoMap[i].type];

                const fillHighlight = {
                  [TileType.Empty]: "fill-stone-900",
                  [TileType.Ocean]: "fill-blue-500",
                  [TileType.Greenery]: "fill-green-500",
                  [TileType.City]: "fill-gray-500",
                  [TileType.Other]: "fill-yellow-500",
                }[demoMap[i].type];

                const color = {
                  [Owner.Red]: "red",
                  [Owner.Green]: "green",
                  [Owner.Blue]: "blue",
                  [Owner.Yellow]: "yellow",
                  [Owner.Black]: "black",
                  [Owner.None]: undefined,
                }[demoMap[i].owner];

                const showFill = hovered && hovered === color;

                return (
                  <>
                    <Hexagon
                      key={i}
                      q={hex.q}
                      r={hex.r}
                      s={hex.s}
                      className={
                        "text-stone-900 fill-current stroke-1 " +
                        border +
                        " " +
                        (showFill ? fillHighlight : "")
                      }
                    ></Hexagon>
                    <Hexagon
                      key={i + "p"}
                      q={hex.q}
                      r={hex.r}
                      s={hex.s}
                      className="fill-none"
                    >
                      <PlayerMarkerG color={color} />
                    </Hexagon>
                  </>
                );
              })
            }
          </Layout>
        </HexGrid>
      </div>

      <Table onPointerLeave={() => setHovered(undefined)}>
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
              <TableRow
                key={p.player}
                onPointerEnter={() => setHovered(p.color)}
              >
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
