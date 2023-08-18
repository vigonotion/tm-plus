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
  Pattern,
  Text,
} from "react-hexgrid";
import { Owner, Tile, TileType, demoMap, parse } from "@/mapdata";
import { useMemo, useState } from "react";

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
        className="fill-current text-gray-700"
      >
        <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
      </g>
    );

  return null;
}

const hexagons: Hex[] = GridGenerator.hexagon(4).sort((a, b) => {
  if (a.r == b.r) {
    if (a.q == b.q) {
      return a.s - b.s;
    }

    return a.q - b.q;
  }

  return a.r - b.r;
});
const scale = 1.1;

export function MapView({ hovered, map }: { hovered?: string; map: Tile[] }) {
  return (
    <HexGrid width={500} height={500}>
      <Layout
        size={{
          x: 5 * scale,
          y: 5 * scale,
        }}
        flat={false}
        spacing={1.1}
        origin={{
          x: 0,
          y: 0,
        }}
      >
        {
          // note: key must be unique between re-renders.
          // using config.mapProps+i makes a new key when the goal template chnages.
          hexagons.map((hex, i) => {
            const fillHighlight = {
              [TileType.Empty]: "",
              [TileType.Ocean]: "ocean",
              [TileType.Greenery]: "greenery",
              [TileType.City]: "city",
              [TileType.Other]: "other",
            }[map[i].type];

            const color = {
              [Owner.Red]: "red",
              [Owner.Green]: "green",
              [Owner.Blue]: "blue",
              [Owner.Yellow]: "yellow",
              [Owner.Black]: "black",
              [Owner.None]: undefined,
            }[map[i].owner];

            const showFill = hovered && hovered === color;

            return (
              <>
                <Hexagon
                  key={i + "p"}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  fill={fillHighlight}
                  strokeWidth={0.4}
                  className={
                    "stroke-stone-800 " +
                    (showFill ? "" : hovered ? "opacity-30" : "")
                  }
                >
                  <PlayerMarkerG color={color} />
                </Hexagon>
              </>
            );
          })
        }
      </Layout>
      <Pattern
        id="city"
        link="/city2.svg"
        size={{
          x: 4.4 * scale,
          y: 5 * scale,
        }}
      />

      <Pattern
        id="greenery"
        link="/greenery2.svg"
        size={{
          x: 4.4 * scale,
          y: 5 * scale,
        }}
      />
      <Pattern
        id="ocean"
        link="/ocean2.svg"
        size={{
          x: 4.4 * scale,
          y: 5 * scale,
        }}
      />
      <Pattern
        id="other"
        link="/other.svg"
        size={{
          x: 4.4 * scale,
          y: 5 * scale,
        }}
      />
    </HexGrid>
  );
}

export function Game({ game }: { game: string }) {
  const { data } = useGame(game, {
    expand: "placements(game),placements(game).player,placements(game).corp",
  });

  const map_state = useMemo(
    () => data?.map_state && parse(data.map_state),
    [data?.map_state]
  );

  const [hovered, setHovered] = useState<string | undefined>(undefined);

  if (data === undefined)
    return (
      <div>
        <FullLoading />
      </div>
    );

  return (
    <div>
      <div className="mb-8">
        <Headline className="text-sm uppercase text-muted-foreground mb-1 inline-block">
          <Link to="/">Games</Link>
        </Headline>
        <Headline>{data.date.split(" ")[0]}</Headline>
      </div>

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

      {map_state && (
        <div className="mb-8">
          <MapView hovered={hovered} map={map_state} />
        </div>
      )}

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
                  {" "}
                  <Link
                    to="/players/$player"
                    params={{ player: p.player }}
                    className="underline"
                  >
                    <div className="flex gap-2 items-center">
                      <PlayerMarker color={p.color} />
                      <span>{p.expand?.player?.name}</span>
                    </div>
                  </Link>
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
