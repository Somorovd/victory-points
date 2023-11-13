"use client";

import { redirect } from "next/navigation";
import GameLobbySelector from "@/components/game/game-lobby-selector";
import useStore from "@/hooks/use-store";
import { useGames } from "@/hooks/use-games-store";

const GamePage = ({ params }: { params: { gameName: string } }) => {
  const gameStore = useStore(useGames, (state) => state);

  if (!gameStore) return null;
  const game = gameStore.allGames[params.gameName];
  if (!game) return redirect("/games");

  return (
    <div className="flex flex-col items-center">
      <GameLobbySelector game={game} />
    </div>
  );
};

export default GamePage;
