import { hexagons } from "@/components/pages/Game";
import { Owner, Tile, TileType } from "@/mapdata";
import { zip } from "./zip";
import { HexUtils } from "react-hexgrid";

export type MapScore = Record<Owner, { greenery: number, cities: number }>

export function mapScore(map: Tile[]): MapScore {

    const scores: MapScore = {
        [Owner.None]: { greenery: -1, cities: -1 },
        [Owner.Red]: { greenery: 0, cities: 0 },
        [Owner.Green]: { greenery: 0, cities: 0 },
        [Owner.Blue]: { greenery: 0, cities: 0 },
        [Owner.Yellow]: { greenery: 0, cities: 0 },
        [Owner.Black]: { greenery: 0, cities: 0 }
    }

    const tiles = Array.from(zip(hexagons, map));

    // calculate greeneries
    tiles.filter(x => x[1].type === TileType.Greenery).forEach(x => scores[x[1].owner].greenery += 1)

    // calculate cities
    tiles.filter(x => x[1].type === TileType.City).forEach(x => {

        const n = HexUtils.neighbors(x[0]).map(g => tiles.find(tt => tt[0].q == g.q && tt[0].r == g.r && tt[0].s == g.s)).filter(j => j !== undefined);

        scores[x[1].owner].cities += n.filter(nn => nn?.[1].type === TileType.Greenery).length;
    })

    return scores;
}