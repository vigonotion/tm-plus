import { type ClassValue, clsx } from "clsx"
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