"use client";

import { useEffect, useState } from "react";
import { useGames, GameStore } from "@/hooks/use-games-store";
import useStore from "@/hooks/use-store";

const GamesMainLayout = ({ children }: { children: React.ReactNode }) => {
  const gameStore = useStore(useGames, (state) => state) as GameStore;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!gameStore || isMounted) return;
    if (Object.keys(gameStore.allGames).length === 0) {
      gameStore.fetchGames();
    }
    setIsMounted(true);
  }, [gameStore]);

  if (!gameStore) return null;
  return (
    <div className="w-[1000px] mx-auto">
      {Object.keys(gameStore.allGames).length !== 0 && children}
    </div>
  );
};

export default GamesMainLayout;
