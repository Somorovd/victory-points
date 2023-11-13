import { db } from "@/lib/db";
import { Game } from "@prisma/client";
import { normalizeDatabaseData } from "@/lib/utils";
import { LobbyWithHost } from "@/types";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

export interface GameStore {
  allGames: Record<string, Game>;
  currentLobbies: Record<string, LobbyWithHost>;
  fetchGames: () => void;
  fetchLobbies: (gameId: string) => void;
  fetchStatus: "PENDING" | "COMPLETE";
}

export const useGames = create<GameStore>()(
  persist(
    (set) => ({
      allGames: {},
      currentLobbies: {},
      fetchGames: async () => {
        set({ fetchStatus: "PENDING" });
        const games = (await axios
          .get("/api/games")
          .then((res) => res.data)) as Game[];
        set({ allGames: normalizeDatabaseData(games, "filename") });
        set({ fetchStatus: "COMPLETE" });
      },
      fetchLobbies: async (gameName) => {
        set({ fetchStatus: "PENDING" });
        const lobbies = (await axios
          .get(`/api/games/${gameName}/lobbies`)
          .then((res) => res.data)) as LobbyWithHost[];
        set({ currentLobbies: normalizeDatabaseData(lobbies, "id") });
        set({ fetchStatus: "COMPLETE" });
      },
      fetchStatus: "COMPLETE",
    }),
    {
      name: "game-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
