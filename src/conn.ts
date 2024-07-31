import PocketBase from "pocketbase";
import { Placement, Player } from "./client/placements";

export const conn = new PocketBase("https://tm-minus-data.vigonotion.com");

export type Game = {
    id: string;
    name: string;
    date: string;
    generations: number;
    map: string;
    duration_in_minutes?: number;
    map_state?: string;

    expand?: {
        "placements(game)"?: Placement[]
        "milestones_unlocked(game)"?: MilestoneUnlocked[],
        "awards_unlocked(game)"?: AwardUnlocked[]
    }
};

export type Award = {
    id: string;
    name: string;
    note: string;
}

export type AwardUnlocked = {
    id: string;
    player: string;
    winner: string[];
    second: string[];

    expand?: {
        "award"?: Award,
        "player"?: Player,
        "winner"?: Player[],
        "second"?: Player[]
    }
}

export type Milestone = {
    id: string;
    name: string;
    note: string;
}

export type MilestoneUnlocked = {
    id: string;
    player: string;

    expand?: {
        "milestone"?: Milestone,
        "player"?: Player
    }
}

export type Corporation = {
    id: string;
    name: string;
    description?: string;
    ability?: string;
    logo?: string;

    expand?: {
        "placements(corp)"?: Placement[]
    }
}

export type Group = {
    id: string;
    name: string;
    players: string[];
}
