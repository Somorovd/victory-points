"use client";

import GameAboutSection from "@/components/game/game-about-section";
import { useGames } from "@/hooks/use-games-store";
import useStore from "@/hooks/use-store";
import { redirect } from "next/navigation";

const GamePageLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { gameName: string };
}) => {
  const gameStore = useStore(useGames, (state) => state);

  if (!gameStore) return null;
  const game = gameStore.allGames[params.gameName];
  if (!game) return redirect("/games");

  return (
    <div className="h-full w-full m-auto">
      <div>{children}</div>
      <div>
        <GameAboutSection game={game} />
      </div>
    </div>
  );
};

export default GamePageLayout;
