import React from "react";
import dynamic from "next/dynamic";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const GameContainer = dynamic(
  () => import("@/components/game/game-container"),
  {
    ssr: false,
  }
);

const GameLobby = async ({
  params,
}: {
  params: { gameName: string; lobbyId: string };
}) => {
  const socketUrl = process.env.SOCKET_URL || process.env.VERCEL_URL;

  const game = await db.game.findUnique({
    where: {
      filename: params.gameName,
    },
    include: {
      lobbies: {
        where: { id: params.lobbyId },
      },
    },
  });

  if (!game) redirect("/games");

  return (
    <>
      <div className="h-full flex flex-row justify-center items-center">
        <GameContainer
          lobbyId={params.lobbyId}
          filename={game.filename}
          socketUrl={socketUrl}
        />
      </div>
    </>
  );
};

export default GameLobby;
