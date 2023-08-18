import assert from "assert";

const map = "o0gbgkgk0000cbgkck000000gbgkxycycgxggyckgbcygyoooo00gkgk00gygyoooooo00ck00cy00cgoooo00oo0000gk00000000cgxk0000xg00ggcg0000";

export enum TileType {
    Empty,
    Ocean,
    Greenery,
    City,

    Other = 31
}

export enum Owner {
    None,
    Red,
    Green,
    Blue,
    Yellow,
    Black
}

export type Tile = {
    type: TileType,
    owner: Owner
}

const LENGTH = 122;

const charToTileType: Record<string, TileType> = {
    "o": TileType.Ocean,
    "g": TileType.Greenery,
    "c": TileType.City,
    "x": TileType.Other,
    "0": TileType.Empty,
}

const charToOwner: Record<string, Owner> = {
    "r": Owner.Red,
    "g": Owner.Green,
    "b": Owner.Blue,
    "y": Owner.Yellow,
    "k": Owner.Black,
}

export function parse(input: string): Tile[] {

    const tiles: Tile[] = [];

    for (let i = 0; i < LENGTH; i += 2) {
        const cType = input[i];
        const cOwner = input[i + 1];

        tiles.push({ type: charToTileType[cType], owner: charToOwner[cOwner] })
    }

    return tiles;
}

export const demoMap = parse(map);