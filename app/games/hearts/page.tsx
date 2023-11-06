import React from "react";
import dynamic from "next/dynamic";

const GameContainer = dynamic(() => import("@/app/components/GameContainer"), {
  ssr: false,
});

const HeartsGame = () => {
  const socketUrl = process.env.SOCKET_URL;

  return (
    <>
      <div className="h-full flex flex-row justify-center items-center">
        <GameContainer name="abc" socketUrl={socketUrl} />
      </div>
    </>
  );
};

export default HeartsGame;
