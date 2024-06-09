"use client"
import { create } from 'zustand';
// Define the state interface
interface WatchHistoryState {
    activeSeasonNumber: number;
    setActiveSeasonNumber: (seasonNumber: number) => void;
}


const useActiveSeason = create<WatchHistoryState>((set) => ({
    activeSeasonNumber: 0,
    setActiveSeasonNumber: (seasonNumber) => set({ activeSeasonNumber: seasonNumber }),
}));

export default useActiveSeason;
