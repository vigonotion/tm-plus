import { Corporation, Game } from "../conn"

export type Placement = {
    player: string
    placement: number,
    score: number,
    game: string,
    corp?: string,

    expand?: {
        player?: Player,
        game?: Game,
        corp?: Corporation
    }
}

export type Player = {
    name: string
}