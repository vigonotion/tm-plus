import { Corporation, Game } from "../conn"

export type Placement = {
    id: string
    player: string
    placement: number,
    score: number,
    tw: number,
    game: string,
    corp?: string,
    color?: string,
    politics_tw: number,

    expand?: {
        player?: Player,
        game?: Game,
        corp?: Corporation
    }
}

export type Player = {
    id: string,
    name: string
}