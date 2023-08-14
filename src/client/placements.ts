import { Game } from "../conn"

export type Placement = {
    player: string
    placement: number,
    score: number,
    game: string

    expand?: {
        player?: Player,
        game?: Game
    }
}

export type Player = {
    name: string
}