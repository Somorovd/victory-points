import { redirect } from "next/navigation";
import GameAboutSection from "@/components/game/game-about-section";
import GameLobbySelector from "@/components/game/game-lobby-selector";
import { db } from "@/lib/db";
import { LobbyWithHost } from "@/types";

const GamePage = async ({ params }: { params: { gameName: string } }) => {
  const game = await db.game.findUnique({
    where: { name: params.gameName },
    include: {
      lobbies: {
        include: {
          host: true,
        },
      },
    },
  });

  if (!game) {
    redirect("/games");
  }

  return (
    <div className="flex flex-col items-center">
      <GameLobbySelector
        gameName={game.name}
        lobbies={game.lobbies as LobbyWithHost[]}
      />
      <GameAboutSection game={game} />
    </div>
  );
};

export default GamePage;
