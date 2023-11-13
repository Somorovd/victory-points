"use client";
import GameBrowser from "@/components/game/game-browser";
import { useGames } from "@/hooks/use-games-store";
import useStore from "@/hooks/use-store";

const Browse = () => {
  const gameStore = useStore(useGames, (state) => state);

  if (!gameStore) return null;
  return (
    <div className="w-full flex justify-center">
      <GameBrowser games={gameStore.allGames} />
    </div>
  );
};

export default Browse;
