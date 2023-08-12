export type Placement = {
    player: string
    placement: number,
    score: number,

    expand?: {
        player?: Player
    }
}

export type Player = {
    name: string
}