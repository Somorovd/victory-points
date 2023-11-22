import { db } from "@/lib/db";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const GameContainer = dynamic(
  () => import("@/components/game/game-container"),
  {
    ssr: false,
  }
);

interface GameLobbyParams {
  gameName: string;
  lobbyId: string;
}

const GameLobby = async ({ params }: { params: GameLobbyParams }) => {
  const socketUrl = process.env.SOCKET_URL;

  const game = await db.game.findUnique({
    where: {
      filename: params.gameName,
    },
    include: {
      lobbies: {
        where: {
          id: params.lobbyId,
        },
        include: { host: true, users: true },
      },
    },
  });

  if (!game) return redirect("/games");
  const lobby = game.lobbies[0];
  if (!lobby) return redirect(`/games/${params.gameName}`);

  return (
    <div className="h-full flex flex-row justify-center items-center">
      <GameContainer
        lobby={lobby}
        game={game}
        socketUrl={socketUrl}
      />
    </div>
  );
};

export default GameLobby;
