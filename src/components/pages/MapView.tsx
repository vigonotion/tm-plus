import { HexGrid, Hexagon, Layout, Pattern } from "react-hexgrid";
import { Owner, Tile, TileType } from "@/mapdata";
import { PlayerMarkerG } from "./PlayerMarkerG";
import { scale, hexagons } from "./Game";

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
