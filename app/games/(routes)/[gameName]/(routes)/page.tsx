import { redirect } from "next/navigation";
import GameLobbySelector from "@/components/game/game-lobby-selector";
import { db } from "@/lib/db";

const GamePage = async ({ params }: { params: { gameName: string } }) => {
  const game = await db.game.findFirst({
    where: { name: params.gameName },
  });

  if (!game) return redirect("/games");

  return (
    <div className="flex flex-col items-center">
      <GameLobbySelector game={game} />
    </div>
  );
};

export default GamePage;
