"use client";

import React, { useEffect } from "react";

interface GameContainerProps {
  name: string;
  socketUrl: string | undefined;
}

const GameContainer = ({ name, socketUrl }: GameContainerProps) => {
  useEffect(() => {
    sessionStorage.setItem("roomId", name);
    sessionStorage.setItem("socketUrl", socketUrl || "undefined");
  }, [name, socketUrl]);

  return (
    <>
      {sessionStorage.getItem("socketUrl") !== "undefined" && (
        <>
          <div id="game-container"></div>
          <script src={`/${name}/main.js`} async></script>
        </>
      )}
    </>
  );
};

export default GameContainer;
