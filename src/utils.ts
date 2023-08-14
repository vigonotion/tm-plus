export function isWin(placement: number, players: number) {
    if (players == 5) {
        return placement <= 2;
    }

    return placement == 1;
}