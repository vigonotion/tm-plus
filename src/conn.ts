import PocketBase from "pocketbase";

export const conn = new PocketBase("http://pms:7717");

export type Game = {
    id: string;
    name: string;
    date: string;
    generations: number;
    map: string;
};

export type Corporation = {
    id: string;
    name: string;
}