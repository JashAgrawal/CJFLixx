import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function objToQueryParams(obj: Record<string, any>): string {
  const queryParams = Object.entries(obj)
    .filter(([key, value]) => value)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return queryParams;
}

export const TMDB_API_KEY = "12eb05fc4d174f5a9eb084c97e81d0a6";
export const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmViMDVmYzRkMTc0ZjVhOWViMDg0Yzk3ZTgxZDBhNiIsInN1YiI6IjY2NDcxOWQ5ZjZlMTQyZTViYTM0NThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZ66_zacIIxo-_dDEkmhH26w_MPeqX1RXcz0utTAdlM"
