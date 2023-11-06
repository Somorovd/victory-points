import React from "react";
import dynamic from "next/dynamic";

const GameContainer = dynamic(() => import("@/app/components/GameContainer"), {
  ssr: false,
});

interface GamePageParams {
  gameName: string;
}

const GamePage = ({ params }: { params: GamePageParams }) => {
  const { gameName } = params;
  const socketUrl = process.env.SOCKET_URL;

  return (
    <>
      <div className="h-full flex flex-row justify-center items-center">
        <GameContainer name={gameName} socketUrl={socketUrl} />
      </div>
    </>
  );
};

export default GamePage;
