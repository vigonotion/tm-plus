import { type ClassValue, clsx } from "clsx"
import { ordinal } from "openskill";
import { Options, Rating } from "openskill/dist/types";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWin(placement: number, players: number) {
  if (players == 5) {
    return placement <= 2;
  }

  return placement == 1;
}

export function toElo(rating: Rating) {
  return Math.floor(1500 + ordinal(rating) * 10);
}