import React from "react";
import dynamic from "next/dynamic";

const GameContainer = dynamic(
  () => import("@/components/game/game-container"),
  {
    ssr: false,
  }
);

interface GamePageParams {
  gameName: string;
}

const GameLobby = ({ params }: { params: GamePageParams }) => {
  const { gameName } = params;
  const socketUrl = process.env.SOCKET_URL || process.env.VERCEL_URL;

  return (
    <>
      <div className="h-full flex flex-row justify-center items-center">
        <GameContainer
          name={gameName}
          socketUrl={socketUrl}
        />
      </div>
    </>
  );
};

export default GameLobby;
