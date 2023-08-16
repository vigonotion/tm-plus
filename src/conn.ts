import PocketBase from "pocketbase";
import { Placement } from "./client/placements";

export const conn = new PocketBase("https://tm-plus-data.vigonotion.com");

export type Game = {
    id: string;
    name: string;
    date: string;
    generations: number;
    map: string;

    expand?: {
        "placements(game)"?: Placement[]
    }
};

export type Corporation = {
    id: string;
    name: string;
    description?: string;
    ability?: string;

    expand?: {
        "placements(corp)"?: Placement[]
    }
}

export type Group = {
    id: string;
    name: string;
    players: string[];
}